const sumWordLength = (acc, curr ) => acc + curr.length

export const getAverageWordLength = words => words.length ? words.reduce(sumWordLength,0)/words.length : 0

export const getPangrams = userWords => userWords.filter(word => {
          const uniqueLetters = new Set(...word.split(''));
          return uniqueLetters === 7;
        });

