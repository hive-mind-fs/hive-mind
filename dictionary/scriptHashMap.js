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

// There are only 20k unique letter sets corresponding to pangrams
const getUniqueLetterSets = async letterCount => {
  const t0 = performance.now();
  const dict = await readFileAsync(__dirname + '/dictionary.txt', 'utf8');
  const words = dict.split('\n');
  const letterSets = new Set();
  const pangramObjects = new Map();
  words.forEach(word => {
    const letterSet = getWordSet(word);

    if (letterSet.size === letterCount) {
      const pKey = getWordKey(letterSet);
      letterSets.add(pKey);
      pangramObjects.has(pKey)
        ? pangramObjects.get(pKey).push(word)
        : pangramObjects.set(pKey, [word]);
    }
  });
  await writeFileAsync(
    __dirname + '/pangramLetterSets.txt',
    Array.from(letterSets),
    'utf8'
  );
  const t1 = performance.now();
  benchmark(t0, t1, `getUniqueLetterSets count ${letterSets.size}`);
  return pangramObjects;
};

const getWordSet = word => new Set(word.split('').sort());

const getWordKey = wSet => {
  let wKey = '';
  wSet.forEach(value => (wKey += value));
  return wKey;
};

// ~ 800 miliseconds to preprocess
// 300k -> 100k
const getWordsHashMap = words => {
  const t0 = performance.now();
  const wordObjects = words.reduce((wm, word) => {
    const wKey = getWordKey(getWordSet(word));
    wm.has(wKey) ? wm.get(wKey).push(word) : wm.set(wKey, [word]);
    return wm;
  }, new Map());
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
  const dict = await readFileAsync(__dirname + '/dictionary.txt', 'utf8');
  const words = dict.split('\n');
  const wordsHashMap = getWordsHashMap(words); // 1-2 sec, 3x reduction

  // Load all pangrams
  const p = await readFileAsync(__dirname + '/pangramLetterSets.txt', 'utf8');
  const pangrams = p.split(',');
  const nPangrams = n ? n : pangrams.length - 1;
  console.log('processing', nPangrams, 'pangrams');

  // For each pangram, find words
  const pangramWordObjects = pangrams.slice(0, nPangrams).reduce((pm, pKey) => {
    pm.set(pKey, getWordsForPangramInner(wordsHashMap, pKey));
    return pm;
  }, new Map());

  const t1 = performance.now();
  benchmark(t0, t1, `getWordsForPangram: for ${nPangrams} pangrams`);
  return pangramWordObjects;
};

const persistKeyedObjects = async (keyedObjects, fileName) => {
  let objectsStr = '';
  keyedObjects.forEach((words, pKey) => {
    const pKeyWordsStr = `${pKey}:` + words.join(',') + '\n';
    objectsStr += pKeyWordsStr;
  });
  await writeFileAsync(__dirname + fileName, objectsStr, 'utf8');
};

const getScore = (word, panagramList) => {
  const wordLength = word.length;
  let score;
  if (wordLength === 4) {
    score = 1;
  } else if (panagramList.includes(word)) {
    score = wordLength + 7;
  } else {
    score = wordLength;
  }
  return score;
};

const getPossiblePoints = (roundDict, panagramList) => {
  return roundDict
    .map(word => getScore(word, panagramList))
    .reduce((a, b) => a + b, 0);
};

const getRoundsFromPangramWords = (pangramWords, pangramObjects) => {
  const t0 = performance.now();

  const rounds = [];
  pangramWords.forEach((words, pKey) => {
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
  const pangramObjects = await getUniqueLetterSets(7);
  await persistKeyedObjects(pangramObjects, '/pangramSets.txt');
  const pangramWords = await getWordsForPangram(10);
  await persistKeyedObjects(pangramWords, '/pangramWordSet.txt');
  const rounds = getRoundsFromPangramWords(pangramWords, pangramObjects);
  console.log(rounds[9]);
})();
