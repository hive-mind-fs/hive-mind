const fs = require('fs');
const { performance } = require('perf_hooks');
const {
  benchmark,
  persist,
  read,
  append,
  readKeyedObjects,
  quantile,
  getPossiblePoints
} = require('./utils');

const PANGRAM_NUM = 7;
const DICT_FILE = 'dictionary.txt';
const PANGRAMS_FILE = 'pangramLetterSets.txt';
const PANGRAM_WORDS_FILE = 'pangramWords.txt';

const MIN_QUANTILE = 50;
const MAX_QUANTILE = 55;
const QUANTILES = [MIN_QUANTILE, MAX_QUANTILE];

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
    const wKey = getWordKey(getWordSet(word));
    addKVToMap(wordObjects, wKey, [word, idx]);
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

const getWordsForPangram = async n => {
  const t0 = performance.now();

  // Preprocessing words hash map
  const words = await getWords(); // array of [word, idx]
  const wordsHashMap = getWordsHashMap(words); // 1-2 sec, 3x reduction

  // Load all pangrams
  const p = await read(PANGRAMS_FILE);
  const pangrams = p.split(',');
  const nPangrams = n ? n : pangrams.length - 1;

  // For each pangram, find words and write to file
  var stream = fs.createWriteStream(PANGRAM_WORDS_FILE);

  pangrams.slice(0, nPangrams).forEach(async pKey => {
    const wordsForPangram = getWordsForPangramInner(wordsHashMap, pKey);
    const wordsForPangramFlat = wordsForPangram.flat().join(',');
    const objectStr = `${pKey}:${wordsForPangramFlat}\n`;
    stream.write(objectStr);
  });

  const t1 = performance.now();
  benchmark(t0, t1, `getWordsForPangram`);
};

const getRoundsFromPangramWords = async pangramObjects => {
  const t0 = performance.now();

  const pangramWordsObjectsFlat = await readKeyedObjects(PANGRAM_WORDS_FILE);

  const pangramWordsObjects = new Map();
  pangramWordsObjectsFlat.forEach((wordsFlat, pKey) => {
    const words = wordsFlat.filter((e, idx) => !(idx % 2));
    const wordsPks = wordsFlat.filter((e, idx) => idx % 2);
    const wordsWithPks = words.map((word, idx) => [wordsPks[idx], word]);
    pangramWordsObjects.set(pKey, wordsWithPks);
  });

  const rounds = [];
  pangramWordsObjects.forEach((wordsWithPks, pKey) => {
    for (cl of pKey) {
      const roundWords = wordsWithPks.filter(word => word[1].includes(cl));
      const pangramList = pangramObjects.get(pKey);
      const possiblePoints = getPossiblePoints(
        roundWords.map(word => word[1]),
        pangramList
      );
      rounds.push({
        letters: pKey,
        coreLetter: cl,
        words: roundWords,
        pangramList: pangramList,
        possiblePoints: possiblePoints
      });
    }
  });

  const t1 = performance.now();
  benchmark(t0, t1, `getRoundsFromPangramWords: for ${rounds.length} rounds`);
  return rounds;
};

const filterGoodRounds = (
  allPossibleRounds,
  minQuantile = MIN_QUANTILE,
  maxQuantile = MAX_QUANTILE
) => {
  const possiblePoints = allPossibleRounds.map(round => round.possiblePoints);
  const pointsQuantiles = QUANTILES.map(element =>
    quantile(possiblePoints, element)
  );
  const minRoundPoints = pointsQuantiles[QUANTILES.indexOf(minQuantile)];
  const maxRoundPoints = pointsQuantiles[QUANTILES.indexOf(maxQuantile)];
  const goodRounds = allPossibleRounds.filter(
    round =>
      round.possiblePoints >= minRoundPoints &&
      round.possiblePoints <= maxRoundPoints
  );
  console.log(
    `of ${allPossibleRounds.length} there are ${goodRounds.length} good rounds`
  );
  return goodRounds;
};

const generateRounds = async (
  minQuantile = MIN_QUANTILE,
  maxQuantile = MAX_QUANTILE
) => {
  const pangramObjects = await getUniqueLetterSets(PANGRAM_NUM); // this takes 1 sec
  await getWordsForPangram(); // this takes 2 min
  const allPossibleRounds = await getRoundsFromPangramWords(pangramObjects); // this takes 7 seconds secs
  const rounds = filterGoodRounds(allPossibleRounds, minQuantile, maxQuantile);
  return rounds;
};

//Run this if you want to recreate pangrams for new dictionary
// (async () => {
//   await getUniqueLetterSets(PANGRAM_NUM); // this is fast
//   await getWordsForPangram(); // this takes 2 min
// })();

module.exports = { generateRounds };
