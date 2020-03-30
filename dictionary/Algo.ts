import fs from 'fs';
import { promisify } from 'util';
import { performance } from 'perf_hooks';
import { inflate } from 'zlib';
const readFileAsync = promisify(fs.readFile);
const writeFileAsync = promisify(fs.writeFile);

const benchmark = (t0: number, t1: number, name: string) => {
  console.log('⏱ ', name, 'took', (t1 - t0).toFixed(3), 'milliseconds.');
};
const toCharVector = (cs: string) => {
  var result = 0;
  for (let i = 0; i < cs.length; i++) {
    var c = cs[i];
    {
      var ordinal =
        (function(c: any) {
          return c.charCodeAt == null ? c : c.charCodeAt(0);
        })(c) - 'a'.charCodeAt(0);
      result |= 1 << ordinal;
    }
  }
  return result;
};

const bitCount = (u: number) => {
  const uCount = u - ((u >> 1) & 0o33333333333) - ((u >> 2) & 0o11111111111);
  return ((uCount + (uCount >> 3)) & 0o30707070707) % 63;
};

const firstSetBit = (int: number) => int & -int;

const puzzlesForBoardSet = (charVector: number) => {
  let puzzles = [];
  let decayingBoardSet = charVector;
  while (decayingBoardSet !== 0) {
    let required = firstSetBit(decayingBoardSet);
    decayingBoardSet ^= required;
    puzzles.push([charVector, required]);
  }
  return puzzles;
};

//Create hash map of dict with charvector as key and word as value & generate array of charectors and reqVectors for all possible puzzles
const puzzleMaster = (dict: any, minLen: number, maxLets: number) => {
  let wordSet = new Set();
  let wordsByVector = new Map();
  let boardSet = new Set();
  let puzzles = [];
  loop1: for (let i = 0; i < dict.length; i++) {
    let word = dict[i];
    if (word.length < minLen) {
      continue;
    }
    var charArr = word.split('');
    for (var j = 0; j < charArr.length; j++) {
      var c = charArr[j];
      if (
        c.charCodeAt(0) < 'a'.charCodeAt(0) ||
        c.charCodeAt(0) > 'z'.charCodeAt(0)
      ) {
        continue loop1;
      }
    }
    const vector = toCharVector(charArr);
    const distinctLetterCount = bitCount(vector);
    if (distinctLetterCount > maxLets) {
      continue;
    }
    wordSet.add(word);
    wordsByVector.set(
      vector,
      wordsByVector.has(vector)
        ? [...wordsByVector.get(vector), word]
        : new Array(word)
    );
    if (distinctLetterCount === maxLets) {
      if (!boardSet.has(vector) ? boardSet.add(vector) : false) {
        puzzles.push(puzzlesForBoardSet(vector));
      }
    }
  }
  return [wordsByVector, puzzles];
};

//Find all words that contain the requiredVector and use no additional characters but those specified in the optionalVector then add those words to the given result set.
const addSolutions = (
  result: any[],
  requiredVector: number,
  optionalVector: number,
  hashmap: Map<number, any[]>
) => {
  if (optionalVector === 0) {
    result.push(
      hashmap.has(requiredVector) ? hashmap.get(requiredVector) : null
    );
  } else {
    var nextOneHot = firstSetBit(optionalVector);
    var expandedRequiredVector = requiredVector | nextOneHot;
    var nextOptionalVector = optionalVector ^ nextOneHot;
    addSolutions(result, requiredVector, nextOptionalVector, hashmap);
    addSolutions(result, expandedRequiredVector, nextOptionalVector, hashmap);
  }
};

// Find all words that can be formed in the given puzzle.
const solutionsTo = (
  potVector: number,
  requiredVector: number,
  hashmap: Map<number, any[]>
) => {
  const solutions = []; //new Set();
  const optionalVector = potVector & ~requiredVector;
  addSolutions(solutions, requiredVector, optionalVector, hashmap);
  return solutions;
};

const SolvePuzzles = async (dictPath: string) => {
  const t0 = performance.now();

  console.log('Reading dictionary...');
  const dict = await readFileAsync(__dirname + dictPath, 'utf8');
  const words = await dict.split('\n'); //read into array of words

  console.log('Generating puzzles...');
  const hashmap = puzzleMaster(words, 4, 7)[0]; //Create the hash map for dictionary
  const puzzles = puzzleMaster(words, 4, 7)[1]; //Create all puzzles

  console.log('Solutions:');
  //Create a has map of charachter vectors for the required letter:
  const createReqMap = () => {
    let reqMap = new Map();
    const alphabet = [
      'A',
      'B',
      'C',
      'D',
      'E',
      'F',
      'G',
      'H',
      'I',
      'J',
      'K',
      'L',
      'M',
      'N',
      'O',
      'P',
      'Q',
      'R',
      'S',
      'T',
      'U',
      'V',
      'W',
      'X',
      'Y',
      'Z'
    ];
    for (let i = 0; i < alphabet.length; i++) {
      reqMap.set(toCharVector(alphabet[i]), alphabet[i]);
    }
    return reqMap;
  };

  //Create a has map of charachter vectors for the letter set
  const createLetterSetMap = (puzzles: any[], hashmap: Map<number, any[]>) => {
    let letters = [];
    let lettersMap = new Map();
    for (let i = 0; i < puzzles.length; i++) {
      letters.push(puzzles[i][0][0]);
      lettersMap.set(
        letters[i],
        hashmap
          .get(letters[i])[0]
          .replace(/(.)(?=.*\1)/g, '')
          .toUpperCase()
      );
    }
    return lettersMap;
  };

  const solver = (puzzles: any, hashmap: any) => {
    let solutions = [];
    const reqMap = createReqMap();
    const letterSetMap = createLetterSetMap(puzzles, hashmap);
    for (let i = 0; i < puzzles.length; i++) {
      for (let j = 0; j < 7; j++) {
        let charVector = puzzles[i][j][0];
        let requiredVector = puzzles[i][j][1];
        solutions.push([
          reqMap.get(requiredVector),
          letterSetMap.get(charVector),
          hashmap.get(charVector),
          solutionsTo(charVector, requiredVector, hashmap)
            .flat(Infinity)
            .filter(x => x)
        ]);
      }
    }
    return solutions;
  };

  //If you dont do the write file: ⏱  SolvePuzzles took 1421.117 milliseconds
  console.log(solver(puzzles, hashmap));
  //Else: ⏱  SolvePuzzles took 2939.944 milliseconds.
  // const gameData = JSON.stringify(solver(puzzles, hashmap));
  // await writeFileAsync(__dirname + '/Solutions.json', gameData);
  const t1 = performance.now();
  benchmark(t0, t1, 'SolvePuzzles');
};

(async () => {
  await SolvePuzzles('/ubuntu-wamerican.txt'); //"/dictionary.txt"); //if you switch to this dict you have to change the characthervector function to use lower case letters
})();

/*
To run:
> npm i -g typescript
> npm i -g ts-node
> npm i
> ts-node dictionary/Algo.ts
*/
