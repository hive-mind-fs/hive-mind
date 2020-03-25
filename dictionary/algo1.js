const fs = require('fs');
const { promisify } = require('util');
const { performance } = require('perf_hooks');
const colors = require('colors');

const readFileAsync = promisify(fs.readFile);
const writeFileAsync = promisify(fs.writeFile);

const benchmark = (t0, t1, name) => {
    console.log(
      '⏱ ',
      name.cyan,
      'took',
      (t1 - t0).toFixed(3).green,
      'milliseconds.'
    );
  };

const Puzzle = (potVector, requiredVector) => {
  if (this.potVector === undefined) this.potVector = 0;
  if (this.requiredVector === undefined) this.requiredVector = 0;
  if (!((requiredVector & potVector) === requiredVector))
    throw new Error('requiredVector must be a subvector of potVector');
  this.potVector = potVector;
  this.requiredVector = requiredVector;
};

const solutionsTo = (puzzle, potVector, requiredVector, wbv) => {
    let solutions = new Set();
    let optionalVector = potVector & ~requiredVector;
    addSolutions(
      solutions,
      requiredVector,
      optionalVector,
      wbv
    );
    return solutions;
  };

const addSolutions = (result, requiredVector, optionalVector, wordsByVector) => {
    if (optionalVector === 0) {
      result.add(wordsByVector.get(requiredVector));
    } else {
      var nextOneHot = firstSetBit(optionalVector);
      var expandedRequiredVector = requiredVector | nextOneHot;
      var nextOptionalVector = optionalVector ^ nextOneHot;
      addSolutions(result, requiredVector, nextOptionalVector);
      addSolutions(result, expandedRequiredVector, nextOptionalVector);
    }
  };

const numberOfTrailingZeros = n => {
  var result = 0;
  while ((n = Math.floor(n / 5))) result += n;
  return result;
};

const toCharVector = cs => {
  var result = 0;
  for (let i = 0; i < cs.length; i++) {
    var c = cs[i];
    {
      var ordinal =
        (function(c) {
          return c.charCodeAt == null ? c : c.charCodeAt(0);
        })(c) - 'a'.charCodeAt(0);
      result |= 1 << ordinal;
    }
  }
  return result;
};

const characterUnvector = vector => {
  let cs = [bitCount(vector)];
  for (let i = 0; i < cs.length; i++) {
    let mask = firstSetBit(vector);
    cs[i] = String.fromCharCode(
      'A'.charCodeAt(0) + numberOfTrailingZeros(mask)
    );
    vector ^= mask;
  }
  return cs.join('');
};

const bitCount = u => {
  const uCount = u - ((u >> 1) & 0o33333333333) - ((u >> 2) & 0o11111111111);
  return ((uCount + (uCount >> 3)) & 0o30707070707) % 63;
};

const firstSetBit = int => int & -int;

const puzzlesForBoardSet = charVector => {
  let puzzles = [];
  let decayingBoardSet = charVector;
  while (decayingBoardSet !== 0) {
    let required = firstSetBit(decayingBoardSet);
    decayingBoardSet ^= required;
    puzzles.push([charVector, required]);
  }
  return puzzles;
};

const puzzleMaster = (dict, minLen, maxLets) => {
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
        c.charCodeAt(0) < 'A'.charCodeAt(0) ||
        c.charCodeAt(0) > 'Z'.charCodeAt(0)
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
    wordsByVector.set(vector, wordsByVector.has(vector) ? wordsByVector.get(vector) : word);
    if (distinctLetterCount === maxLets) {
      if (!boardSet.has(vector) ? boardSet.add(vector) : false) {
        puzzles.push(puzzlesForBoardSet(vector));
      }
    }
  }
  return puzzles;
};

//Solve a specific puzzle
const parseVector = s => {
  let charArr = s.split('');
  for (let i = 0; i < charArr.length; i++) {
    var c = charArr[i];
    var lower = c
      .toString()
      .toLowerCase()
      .charAt(0);
    if (
      lower.charCodeAt(0) < 'a'.charCodeAt(0) ||
      lower.charCodeAt(0) > 'z'.charCodeAt(0)
    ) {
      return 'Invalid character input';
    }
  }
  return toCharVector(s.toLowerCase().split(''));


};

//'/dictionary.txt'
const PuzzleSolver = async (
  dictionaryPath,
  requiredLetter,
  otherLetters,
  minLen,
  maxLets
) => {
const t0 = performance.now();
  parseVector(otherLetters);
  let requiredVector = requiredLetter;
  let optionalVector = otherLetters;
  let potVector = requiredVector | optionalVector;
  let puzzle = await Puzzle(requiredVector, potVector);
  console.log('Reading dictionary...');
  const dict = await readFileAsync(__dirname + dictionaryPath, 'utf8');
  const words = await dict.split('\n'); //read into array of words

  console.log('Compiling puzzle data...');
  const pm = await puzzleMaster(words, minLen, maxLets);
  console.log("Puzzle count: " + pm.length);
  console.log( pm);
  console.log('Solving puzzle...');
  const solutions = await solutionsTo(puzzle, potVector, requiredVector, pm);
  console.log('Solutions:');
//   const uniqueLetters = word => bitCount(toCharVector(word.split('')));
  solutions.forEach(word => {
    // let letters = uniqueLetters(word);
    // let value = letters >= minLen ? word.length : 1;
    console.log(word);
  });
  const t1 = performance.now();
  benchmark(t0, t1, 'getPangrams');
};

(async () => {
  await PuzzleSolver('/dictionary.txt', 'I', 'CINEPHILE', 4, 7);
})();
