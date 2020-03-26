const { performance } = require('perf_hooks');
const {
  benchmark,
  persist,
  read,
  persistKeyedObjects,
  readKeyedObjects,
  quantile,
  getPossiblePoints
} = require('./utils');

const PANGRAM_NUM = 7;
const DICT_FILE = 'dictionary.txt';
const PANGRAMS_FILE = 'pangramLetterSets.txt';
const PANGRAM_WORDS_FILE = 'pangramWords.txt';

const getWordSet = word => new Set(word.split('').sort());

const getWordKey = wSet => {
  let wKey = '';
  wSet.forEach(value => (wKey += value));
  return wKey;
};

const addKVToMap = (hashMap, key, value) => {
  hashMap.has(key) ? hashMap.get(key).push(value) : hashMap.set(key, [value]);
};

// There are only 20k unique letter sets corresponding to pangrams
const getUniqueLetterSets = async letterCount => {
  const t0 = performance.now();
  const dict = await read(DICT_FILE);
  const words = dict.split('\n');
  const letterSets = new Set();
  const pangramObjects = new Map();
  words.forEach(word => {
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
  words.forEach(word => {
    const wKey = getWordKey(getWordSet(word));
    addKVToMap(wordObjects, wKey, word);
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
  const dict = await read(DICT_FILE);
  const words = dict.split('\n');
  const wordsHashMap = getWordsHashMap(words); // 1-2 sec, 3x reduction

  // Load all pangrams
  const p = await read(PANGRAMS_FILE);
  const pangrams = p.split(',');
  const nPangrams = n ? n : pangrams.length - 1;

  // For each pangram, find words
  const pangramWordObjects = new Map();
  pangrams.slice(0, nPangrams).forEach(pKey => {
    const wordsForPangram = getWordsForPangramInner(wordsHashMap, pKey);
    pangramWordObjects.set(pKey, wordsForPangram);
  });

  await persistKeyedObjects(PANGRAM_WORDS_FILE, pangramWordObjects);
  const t1 = performance.now();
  benchmark(
    t0,
    t1,
    `getWordsForPangram: for ${pangramWordObjects.size} pangrams`
  );
};

const getRoundsFromPangramWords = async pangramObjects => {
  const t0 = performance.now();

  const pangramWordsObjects = await readKeyedObjects(PANGRAM_WORDS_FILE);

  const rounds = [];
  pangramWordsObjects.forEach((words, pKey) => {
    for (cl of pKey) {
      const roundWords = words.filter(word => word.includes(cl));
      const pangramList = pangramObjects.get(pKey);
      const possiblePoints = getPossiblePoints(roundWords, pangramList);
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

(async () => {
  const pangramObjects = await getUniqueLetterSets(PANGRAM_NUM); // this is fast
  //await getWordsForPangram(); // this takes 2 min
  const rounds = getRoundsFromPangramWords(pangramObjects);
  // await persist('allPossibleRounds.json', JSON.stringify(rounds));
})();

// (async () => {
//   const roundsFile = await readFileAsync(
//     __dirname + '/allPossibleRounds.json',
//     'utf8'
//   );
//   const rounds = JSON.parse(roundsFile);
//   const possiblePoints = rounds.map(round => round.possiblePoints);
//   const QUANTILES = [0, 25, 33, 50, 66, 75, 100];
//   const pointsQuantiles = QUANTILES.map(element =>
//     quantile(possiblePoints, element)
//   );
//   const MIN_QUANTILE = 25;
//   const MAX_QUANTILE = 75;
//   const minRoundPoints = pointsQuantiles[QUANTILES.indexOf(MIN_QUANTILE)];
//   const maxRoundPoints = pointsQuantiles[QUANTILES.indexOf(MAX_QUANTILE)];
//   const goodRounds = rounds.filter(
//     round =>
//       round.possiblePoints >= minRoundPoints &&
//       round.possiblePoints <= maxRoundPoints
//   );
//   console.log(`of ${rounds.length} there are ${goodRounds.length} good rounds`);
//   await writeFileAsync(
//     __dirname + '/goodRounds.json',
//     JSON.stringify(goodRounds),
//     'utf8'
//   );
// })();
