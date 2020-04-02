/**
 * Getters from practice round object
 **/

const getOtherLetters = (round, cl) => round.letters.replace(cl, '').split('');
const getRoundDictObjs = round => round.words;
const getRoundDict = round => round.words.map(word => word.word);

export const getScore = (word, pangramList) => {
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

export const getInitialStateFromProps = props => {
  const userRounds = props.practiceRound.round;
  const cl = round.coreLetter;
  const otherLetters = getOtherLetters(round, cl);
  const roundDictObjs = getRoundDictObjs(round);
  const roundDict = getRoundDict(round);
  const pangramList = round.pangramList;
  const possiblePoints = round.possiblePoints;
  return {
    cl,
    otherLetters,
    roundDictObjs,
    roundDict,
    pangramList,
    possiblePoints
  };
};
