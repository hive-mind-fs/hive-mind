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

export const getMinutesAndSeconds = gameTimer => {
  let minutes = Math.floor(gameTimer / 60);
  let secondsCalc = gameTimer - minutes * 60;
  let seconds = secondsCalc <= 9 ? '0' + secondsCalc : secondsCalc;
  return {
    minutes,
    seconds
  };
};

// Change ranking
// let x = 0;
// let shareOfTotal = (score / possiblePoints) * 100;
// shareOfTotal < 2.5
//   ? (x = 0)
//   : shareOfTotal > 2.5 && shareOfTotal < 5
//   ? (x = 1)
//   : shareOfTotal > 5 && shareOfTotal < 10
//   ? (x = 2)
//   : shareOfTotal > 10 && shareOfTotal < 15
//   ? (x = 3)
//   : shareOfTotal > 15 && shareOfTotal < 25
//   ? (x = 4)
//   : shareOfTotal > 25 && shareOfTotal < 40
//   ? (x = 5)
//   : shareOfTotal > 40 && shareOfTotal < 55
//   ? (x = 6)
//   : shareOfTotal > 55 && shareOfTotal < 75
//   ? (x = 7)
//   : shareOfTotal > 75
//   ? (x = 8)
//   : null;

// this.setState({ rank: rankings[x] });

//Ranking Logic
// Convert round dictionary into array of points for each word

//Attempt at better algo for ranking
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

export const getPossiblePoints = (roundDict, panagramList) => {
  return roundDict
    .map(word => getScore(word, panagramList))
    .reduce((a, b) => a + b, 0);
};

export const getRankIndex = (score, possiblePoints) => {
  const n = (score / possiblePoints) * 100;
  return [2.5, 5, 10, 15, 25, 40, 55, 75]
    .concat(n)
    .sort((a, b) => a - b)
    .indexOf(n);
};

/**
 * Globals
 **/
export const RANKINGS = [
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
