const fs = require('fs');
const readline = require('readline');
const { performance } = require('perf_hooks');
const { benchmark, persist, read, getPossiblePoints } = require('./utils');

const PANGRAM_NUM = 7;
const DICT_FILE = 'dictionary.txt';
const PANGRAMS_FILE = 'pangramLetterSets.txt';
const PANGRAM_WORDS_FILE = '../pangramWords.txt';

const MIN_POINTS = 200;
const MAX_POINTS = 500;

const getWordSet = word => new Set(word.split('').sort());

const getWordKey = wSet => {
  let wKey = '';
  wSet.forEach(value => (wKey += value));
  return wKey;
};

const addKVToMap = (hashMap, key, value) => {
  hashMap.has(key) ? hashMap.get(key).push(value) : hashMap.set(key, [value]);
};

const getWords = async () => {
  const dict = await read(DICT_FILE);
  const words = dict.split('\n').map((word, idx) => [word, idx + 1]);
  return words;
};

// There are only 20k unique letter sets corresponding to pangrams
const getUniqueLetterSets = async letterCount => {
  const t0 = performance.now();

  const words = await getWords();
  const letterSets = new Set();
  const pangramObjects = new Map();
  words.forEach(([word, idx]) => {
    const letterSet = getWordSet(word);

    if (letterSet.size === letterCount) {
      const pKey = getWordKey(letterSet);
      letterSets.add(pKey);
      addKVToMap(pangramObjects, pKey, word);
    }
  });
  await persist(PANGRAMS_FILE, Array.from(letterSets));
  const t1 = performance.now();
  benchmark(t0, t1, `getUniqueLetterSets count ${letterSets.size}`);
  return pangramObjects;
};

// ~ 800 miliseconds to preprocess
// 300k -> 100k
const getWordsHashMap = words => {
  const t0 = performance.now();
  const wordObjects = new Map();
  words.forEach(([word, idx]) => {
    if (word.length >= 4) {
      const wKey = getWordKey(getWordSet(word));
      addKVToMap(wordObjects, wKey, [word, idx]);
    }
  });
  const t1 = performance.now();
  benchmark(t0, t1, `getWordsHashMap: count ${wordObjects.size}`);
  return wordObjects;
};

// An array of words for pangram
// ~20 miliseconds per panagram
const getWordsForPangramInner = (wordsHashMap, pKey) => {
  let pWords = [];
  const pSet = new Set(pKey.split(''));
  wordsHashMap.forEach((words, wKey) => {
    let i = 0;
    let subset = true;
    while (i < wKey.length && subset) {
      if (!pSet.has(wKey[i])) {
        subset = false;
        break;
      }
      i++;
    }

    if (subset) {
      pWords = pWords.concat(words);
    }
  });
  return pWords;
};

const getWordsForPangram = async (pangramWordsFile, n) => {
  const t0 = performance.now();

  // Preprocessing words hash map
  const words = await getWords(); // array of [word, idx]
  const wordsHashMap = getWordsHashMap(words); // 1-2 sec, 3x reduction

  // Load all pangrams
  const p = await read(PANGRAMS_FILE);
  const pangrams = p.split(',');
  const nPangrams = n ? n : pangrams.length - 1;

  // For each pangram, find words and write to file
  var stream = fs.createWriteStream(pangramWordsFile);

  pangrams.slice(0, nPangrams).forEach(async pKey => {
    const wordsForPangram = getWordsForPangramInner(wordsHashMap, pKey);
    const wordsForPangramFlat = wordsForPangram.flat().join(',');
    const objectStr = `${pKey}:${wordsForPangramFlat}\n`;
    stream.write(objectStr);
  });

  const t1 = performance.now();
  benchmark(t0, t1, `getWordsForPangram`);
};

const getRoundsFromPangramWords = async (
  pangramObjects,
  pangramWordsFile,
  roundsFile,
  minPoints,
  maxPoints
) => {
  const t0 = performance.now();

  // stream the panagrams one by one from the file
  const readStream = fs.createReadStream(pangramWordsFile);

  const lines = readline.createInterface({
    input: readStream,
    crlfDelay: Infinity
  });

  const writeStream = fs.createWriteStream(roundsFile);
  for await (const line of lines) {
    const [pKey, wordsLine] = line.split(':');

    // string -> array of arrays, partition by 2
    const wordsFlat = wordsLine.split(',');
    const words = wordsFlat.filter((e, idx) => !(idx % 2));
    const wordsPks = wordsFlat.filter((e, idx) => idx % 2);
    const wordsWithPks = words.map((word, idx) => [wordsPks[idx], word]);

    // stream the rounds one by one to the file
    for (const cl of pKey) {
      const roundWords = wordsWithPks.filter(word => word[1].includes(cl));
      const pangramList = pangramObjects.get(pKey);
      const possiblePoints = getPossiblePoints(
        roundWords.map(word => word[1]),
        pangramList
      );
      if (possiblePoints >= minPoints && possiblePoints <= maxPoints) {
        const round = {
          letters: pKey,
          coreLetter: cl,
          words: roundWords,
          pangramList: pangramList,
          possiblePoints: possiblePoints
        };

        writeStream.write(`${JSON.stringify(round)}\n`);
      }
    }
  }

  const t1 = performance.now();
  benchmark(t0, t1, `getRoundsFromPangramWords`);
};

const generateRounds = async (
  rounds_file,
  pangram_words_file = PANGRAM_WORDS_FILE,
  minPoints = MIN_POINTS,
  maxPoints = MAX_POINTS
) => {
  const pangramObjects = await getUniqueLetterSets(PANGRAM_NUM); // this takes 1 sec
  await getWordsForPangram(pangram_words_file);
  await getRoundsFromPangramWords(
    pangramObjects,
    pangram_words_file,
    rounds_file,
    minPoints,
    maxPoints
  );
};

//Run this if you want to recreate pangrams for new dictionary
// (async () => {
//   await getUniqueLetterSets(PANGRAM_NUM); // this is fast
//   await getWordsForPangram(); // this takes 2 min
// })();

module.exports = { generateRounds };
