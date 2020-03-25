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
  words.forEach(word => {
    const letterSet = getWordSet(word);

    if (letterSet.size === letterCount) {
      const pKey = getWordKey(letterSet);
      letterSets.add(pKey);
    }
  });
  await writeFileAsync(
    __dirname + '/pangramLetterSets.txt',
    Array.from(letterSets),
    'utf8'
  );
  const t1 = performance.now();
  benchmark(t0, t1, `getUniqueLetterSets count ${letterSets.size}`);
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
const getWordsForPangram = (wordsHashMap, pKey) => {
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

const getPangramWords = async n => {
  const t0 = performance.now();

  // Preprocessing & loading pangrams
  const dict = await readFileAsync(__dirname + '/dictionary.txt', 'utf8');
  const words = dict.split('\n');
  const wordsHashMap = getWordsHashMap(words); // 1-2 sec, 3x reduction
  const p = await readFileAsync(__dirname + '/pangramLetterSets.txt', 'utf8');
  const pangrams = p.split(',');
  const nPangrams = n ? n : pangrams.length - 1;

  console.log('processing', nPangrams, 'pangrams');

  // For each pangram, find words
  const pangramObjects = pangrams.slice(0, nPangrams).reduce((pm, pKey) => {
    pm.set(pKey, getWordsForPangram(wordsHashMap, pKey));
    return pm;
  }, new Map());

  const t1 = performance.now();
  benchmark(t0, t1, `getPangramWords: for ${nPangrams} pangrams`);
  return pangramObjects;
};

const persistPangramWords = async pangramObjects => {
  let pangramObjectsStr = '';
  pangramObjects.forEach((words, pKey) => {
    const pKeyWordsStr = `${pKey}:` + words.join(',') + '\n';
    pangramObjectsStr += pKeyWordsStr;
  });
  await writeFileAsync(
    __dirname + '/pangramWords.txt',
    pangramObjectsStr,
    'utf8'
  );
};

(async () => {
  await getUniqueLetterSets(7);
  const pangramObjects = await getPangramWords();
  await persistPangramWords(pangramObjects);
})();
