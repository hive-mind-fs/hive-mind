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

class TrieNode {
  constructor() {
    this.children = {};
    this.end = false;
  }

  insert(word) {
    if (word.length) {
      const char = word[0];
      if (!this.children[char]) {
        this.children[char] = new TrieNode();
      }
      this.children[char].insert(word.slice(1));
    } else {
      this.end = true;
    }
  }
}

const getPuzzles = (words, size) => {
  let cache = {};
  let results = [];
  words.forEach(word => {
    if (word.length >= size) {
      const letters = word.split('');
      const unique = new Set(letters);
      if (unique.size === size) {
        const alphabetical = Array.from(unique)
          .sort()
          .join('');
        if (!cache[alphabetical]) {
          cache[alphabetical] = true;
          results.push(alphabetical);
        }
      }
    }
  });
  return results;
};

// DFS
const getWords = (
  puzzleLetters,
  centerLetter,
  trie,
  word = '',
  usesCenterLetter = false
) => {
  let results = [];

  if (usesCenterLetter && trie.end) {
    results.push(word);
  }

  puzzleLetters.forEach(letter => {
    if (trie.children[letter]) {
      results = [
        ...results,
        ...getWords(
          puzzleLetters,
          centerLetter,
          trie.children[letter],
          word + letter,
          usesCenterLetter ? usesCenterLetter : letter === centerLetter
        )
      ];
    }
  });

  return results;
};

const solve = async () => {
  const t0 = performance.now();

  console.log('Reading dictionary...');
  const dict = await readFileAsync(__dirname + '/dictionary.txt', 'utf8');
  const words = dict.split('\n').filter(word => word.length >= 4);

  console.log('Creating trie...');
  const trie = new TrieNode();
  words.forEach(word => trie.insert(word));

  console.log('Generating puzzles...');
  const puzzles = getPuzzles(words, 7);

  let results = {};

  console.log('Solving puzzles...');
  puzzles.forEach(puzzle => {
    const puzzleLetters = puzzle.split('');
    results[puzzle] = {};
    puzzleLetters.forEach(centerLetter => {
      const solutions = getWords(puzzleLetters, centerLetter, trie);
      results[puzzle][centerLetter] = solutions;
    });
  });

  const t1 = performance.now();

  benchmark(t0, t1, 'Solve puzzles');
};

(async () => {
  await solve();
})();
