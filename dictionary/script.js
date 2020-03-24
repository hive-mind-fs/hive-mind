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

const getPangrams = async letterCount => {
  const t0 = performance.now();
  const dict = await readFileAsync(__dirname + '/dictionary.txt', 'utf8');
  const words = dict.split('\n');
  const pangrams = words.filter(word => {
    const letters = word.split('');
    const letterSet = new Set(letters);
    return letterSet.size === letterCount;
  });
  const pangramData = pangrams.join('\n');
  await writeFileAsync(__dirname + '/pangrams.txt', pangramData, 'utf8');
  const t1 = performance.now();
  benchmark(t0, t1, 'getPangrams');
};

const getWords = async () => {
  const t0 = performance.now();
  const dict = await readFileAsync(__dirname + '/dictionary.txt', 'utf8');
  const words = dict.split('\n');
  // Change the text file to '/mockPangrams.txt' to run this script on a smaller sample size.
  const p = await readFileAsync(__dirname + '/mockPangrams.txt', 'utf8');
  const pangrams = p.split('\n');
  // Pangram => Valid words
  let result = {};
  pangrams.forEach((pangram, index) => {
    console.log(index);
    result[pangram] = [];
    const pangramLetters = pangram.split('');
    const pangramSet = new Set(pangramLetters);
    words.forEach(word => {
      const letters = [...word.split(''), ...pangramLetters];
      const letterSet = new Set(letters);
      // A word is valid if it has at least 4 letters and contains only letters in the pangram
      if (word.length >= 4 && letterSet.size === pangramSet.size) {
        result[pangram].push(word);
      }
    });
  });
  const gameData = JSON.stringify(result);
  await writeFileAsync(__dirname + '/games.json', gameData);
  const t1 = performance.now();
  benchmark(t0, t1, 'getGames');
};

(async () => {
  await getPangrams(7);
  await getWords();
})();
