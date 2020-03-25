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

// Save the unique letter set instead of the words
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
  await writeFileAsync(__dirname + '/mockPangrams.txt', pangramData, 'utf8');
  const t1 = performance.now();
  benchmark(t0, t1, 'getPangrams');
};

const getWordKeyForWord = word => {
  let wKey = '';
  new Set(word.split('').sort()).forEach(value => (wKey += value));
  return wKey;
};

// An array of words for pangram
// ~20 miliseconds per panagram
const getWordsForPangram = (wordsHashMap, pKey) => {
  let pWords = [];
  wordsHashMap.forEach((words, wKey) => {
    if (pKey.includes(wKey)) pWords = pWords.concat(words);
  });
  return pWords;
};

// ~ 800 miliseconds to preprocess
// 300k -> 100k
const getHashMap = words => {
  const wordObjects = words.reduce((wm, word) => {
    const wKey = getWordKeyForWord(word);
    wm.has(wKey) ? wm.get(wKey).push(word) : wm.set(wKey, [word]);
    return wm;
  }, new Map());
  return wordObjects;
};

const getPangramWords = async n => {
  const t0 = performance.now();
  const nPangrams = n ? n : pangrams.length - 1;

  // Preprocessing & loading pangrams
  const dict = await readFileAsync(__dirname + '/dictionary.txt', 'utf8');
  const words = dict.split('\n');
  const wordsHashMap = getHashMap(words); // 1-2 sec, 3x reduction
  const p = await readFileAsync(__dirname + '/pangrams.txt', 'utf8');
  const pangrams = p.split('\n');

  // For each pangram, find words
  const pangramObjects = pangrams.slice(0, nPangrams).reduce((pm, pangram) => {
    const pKey = getWordKeyForWord(pangram);
    pm.set(pKey, getWordsForPangram(wordsHashMap, pKey));
    return pm;
  }, new Map());

  const t1 = performance.now();
  benchmark(t0, t1, `getPangramWords:${nPangrams}`);
  return pangramObjects;
};

(async () => {
  await getPangrams(7);
  const pangramObjects = await getPangramWords(1000);
  console.log(pangramObjects);
})();
