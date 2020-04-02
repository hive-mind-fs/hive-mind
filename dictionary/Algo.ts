import fs from 'fs';
import { promisify } from 'util';
import { performance } from 'perf_hooks';
import { inflate } from 'zlib';
const readFileAsync = promisify(fs.readFile);
const writeFileAsync = promisify(fs.writeFile);

const benchmark = (t0: number, t1: number, name: string) => {
  console.log('⏱ ', name, 'took', (t1 - t0).toFixed(3), 'milliseconds.');
};
const toVchar = (cs: string) => {
  let cv = 0;
  for (let i = 0; i < cs.length; i++) {
    let c = cs[i];
    {
      let ordinal =
        (function(c: any) {
          return c.charCodeAt == null ? c : c.charCodeAt(0);
        })(c) - 'a'.charCodeAt(0);
      cv |= 1 << ordinal;
    }
  }
  return cv;
};

const bitCount = (u: number) => {
  const uCount = u - ((u >> 1) & 0o33333333333) - ((u >> 2) & 0o11111111111);
  return ((uCount + (uCount >> 3)) & 0o30707070707) % 63;
};

const firstSetBit = (int: number) => int & -int;

const puzzlesForBoardSet = (Vchar: number) => {
  let puzzles = [];
  let decayingBoardSet = Vchar;
  while (decayingBoardSet !== 0) {
    let required = firstSetBit(decayingBoardSet);
    decayingBoardSet ^= required;
    puzzles.push([Vchar, required]);
  }
  return puzzles;
};

//Create hash map of dict with Vchar as key and word as value & generate array of charectors and reqVectors for all possible puzzles
const puzzleMaster = (dict: any, minLen: number, maxLets: number) => {
  let wordSet = new Set();
  let wordsByVector = new Map();
  let boardSet = new Set();
  let puzzles = [];
  loop1: for (let i = 0; i < dict.length; i++) {
    let word = dict[i][0];
    let idx = dict[i][1];
    if (word.length < minLen) {
      continue;
    }
    let charArr = word.split('');
    for (let j = 0; j < charArr.length; j++) {
      let c = charArr[j];
      if (
        c.charCodeAt(0) < 'a'.charCodeAt(0) ||
        c.charCodeAt(0) > 'z'.charCodeAt(0)
      ) {
        continue loop1;
      }
    }
    const vector = toVchar(charArr);
    const distinctLetterCount = bitCount(vector);
    if (distinctLetterCount > maxLets) {
      continue;
    }
    wordSet.add(word);
    wordsByVector.set(
      vector,
      wordsByVector.has(vector)
        ? [...wordsByVector.get(vector), word, idx]
        : new Array(word, idx)
    );
    if (distinctLetterCount === maxLets) {
      if (!boardSet.has(vector) ? boardSet.add(vector) : false) {
        puzzles.push(puzzlesForBoardSet(vector));
      }
    }
  }
  return { wordsByVector, puzzles };
};

//Find all words that contain the Required Vector and use no additional characters but those specified in the Optional Vector then add those words to the given result set.
const addSolutions = (
  result: any[],
  Vreq: number,
  Vopt: number,
  hashmap: Map<number, any[]>
) => {
  if (Vopt === 0) {
    result.push(
      hashmap.has(Vreq) ? [hashmap.get(Vreq)[0], hashmap.get(Vreq)[1]] : null
    );
  } else {
    let nextOneHot = firstSetBit(Vopt);
    let expandedVreq = Vreq | nextOneHot;
    let nextVopt = Vopt ^ nextOneHot;
    addSolutions(result, Vreq, nextVopt, hashmap);
    addSolutions(result, expandedVreq, nextVopt, hashmap);
  }
};

// Find all words that can be formed in the given puzzle.
const solutionsTo = (
  Vlets: number,
  Vreq: number,
  hashmap: Map<number, any[]>
) => {
  const solutions = []; //new Set();
  const Vopt = Vlets & ~Vreq;
  addSolutions(solutions, Vreq, Vopt, hashmap);
  return solutions;
};

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
    reqMap.set(toVchar(alphabet[i]), alphabet[i]);
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
      let Vchar = puzzles[i][j][0];
      let Vreq = puzzles[i][j][1];
      solutions.push([
        reqMap.get(Vreq),
        letterSetMap.get(Vchar),
        hashmap.get(Vchar),
        solutionsTo(Vchar, Vreq, hashmap)
          .flat(Infinity)
          .filter(x => x)
      ]);
    }
  }
  return solutions;
};

const SolvePuzzles = async (dictPath: string) => {
  const t0 = performance.now();

  console.log('Reading dictionary...');
  const dict = await readFileAsync(__dirname + dictPath, 'utf8');
  // const words = await dict.split('\n'); //read into array of words
  const words = dict.split('\n').map((word, idx) => [word, idx + 1]);

  console.log('Generating puzzles...');
  const { wordsByVector } = puzzleMaster(words, 4, 7); //Create the hash map for dictionary
  const { puzzles } = puzzleMaster(words, 4, 7); //Create all puzzles

  console.log('Solutions:');
  console.log(solver(puzzles, wordsByVector)); //If you dont do the write file: ⏱  SolvePuzzles took 1421.117 milliseconds
  //console.log(wordsByVector);
  const gameData = JSON.stringify(solver(puzzles, wordsByVector)); //Else: ⏱  SolvePuzzles took 2939.944 milliseconds.
  await writeFileAsync(__dirname + '/Solutions.json', gameData);

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
