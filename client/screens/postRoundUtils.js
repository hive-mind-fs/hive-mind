const sumWordLength = (acc, curr ) => acc + curr.word.length

export const getAverageWordLength = words => words.length ? words.reduce(sumWordLength,0)/words.length : 0

