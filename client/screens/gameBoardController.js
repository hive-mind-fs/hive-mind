/**
 * Getters from practice round object
 **/

const getCoreLetter = round => round.coreLetter;
const getOtherLetters = (round, cl) => round.letters.replace(cl, '').split('');
const getRoundDictObjs = round => round.words;
const getRoundDict = round => round.words.map(word => word.word);
const getPanagramList = roundDict =>
  roundDict.filter(word => new Set(word.split('')).size === 7);

export const getScore = (word, panagramList) => {
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

export const getInitialStateFromProps = props => {
  const round = props.practiceRound.round;
  const cl = getCoreLetter(round);
  const otherLetters = getOtherLetters(round, cl);
  const roundDictObjs = getRoundDictObjs(round);
  const roundDict = getRoundDict(round);
  const panagramList = getPanagramList(roundDict);
  const possiblePoints = getPossiblePoints(roundDict, panagramList);
  return {
    cl,
    otherLetters,
    roundDictObjs,
    roundDict,
    panagramList,
    possiblePoints
  };
};

/**
 * Functions
 **/
//shuffling algorithm: https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle#The_modern_algorithm
export const shuffle = arr => {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return [...arr];
};

//Ranking Logic
// Convert round dictionary into array of points for each word
//Attempt at better algo for ranking

const RANKINGS = [
  'Beginner',
  'Good Start',
  'Moving Up',
  'Good',
  'Solid',
  'Nice',
  'Great',
  'Amazing',
  'Genius'
];

export const getRank = (score, possiblePoints) => {
  const n = (score / possiblePoints) * 100;
  const rankIndex = [2.5, 5, 10, 15, 25, 40, 55, 75]
    .concat(n)
    .sort((a, b) => a - b)
    .indexOf(n);
  return RANKINGS[rankIndex];
};
