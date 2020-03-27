const fs = require('fs');
const { promisify } = require('util');
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

const persistKeyedObjects = async (file, keyedObjects) => {
  let objectsStr = '';
  keyedObjects.forEach((words, pKey) => {
    const pKeyWordsStr = `${pKey}:` + words.join(',') + '\n';
    objectsStr += pKeyWordsStr;
  });
  await persist(file, objectsStr);
};

const readKeyedObjects = async file => {
  const objectsStr = await read(file);
  const lines = objectsStr.split('\n');
  const keyedObjects = new Map();
  lines.pop(); // extra line
  lines.forEach(line => {
    const kVs = line.split(':');
    keyedObjects.set(kVs[0], kVs[1].split(','));
  });
  return keyedObjects;
};

const persist = async (file, data) => {
  await writeFileAsync(__dirname + `/${file}`, data, 'utf8');
};

const read = async file => {
  return await readFileAsync(__dirname + `/${file}`, 'utf8');
};

const getScore = (word, pangramList) => {
  const wordLength = word.length;
  let score;
  if (wordLength === 4) {
    score = 1;
  } else if (pangramList.includes(word)) {
    score = wordLength + 7;
  } else {
    score = wordLength;
  }
  return score;
};

const getPossiblePoints = (roundDict, pangramList) => {
  return roundDict
    .map(word => getScore(word, pangramList))
    .reduce((a, b) => a + b, 0);
};

function sortNumber(a, b) {
  return a - b;
}

function quantile(array, percentile) {
  array.sort(sortNumber);
  let index = (percentile / 100) * (array.length - 1);
  let result;
  if (Math.floor(index) == index) {
    result = array[index];
  } else {
    let i = Math.floor(index);
    let fraction = index - i;
    result = array[i] + (array[i + 1] - array[i]) * fraction;
  }
  return result;
}

module.exports = {
  benchmark,
  persist,
  read,
  append,
  persistKeyedObjects,
  readKeyedObjects,
  getPossiblePoints,
  quantile
};
