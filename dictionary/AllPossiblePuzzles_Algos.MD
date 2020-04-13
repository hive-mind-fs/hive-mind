
  

# All Possible Puzzles -- Finding an Efficient Algorithm for Generating the Honeycomb (DRAFT)

  

### By: Mike Vosters, Natasha Whitney, Rich McAteer, and Robert Nixon

## Intro

There are roughly 4,604,600 possible puzzles in the [New York Times Spelling Bee](https://www.nytimes.com/puzzles/spelling-bee), each of which may contain over 1,000 valid words. Given an English language dictionary what is the most efficient way to generate all possible puzzles as well as their solutions. This article is an overview of the various methods that my team implemented to solve this problem, from the iterative approach that took over 5 hours to find all the puzzles to our final algorithm which used bitmaps and ran in less than 2 seconds.
 
## Iterative Approach

At the core of each puzzle is the honeycomb, the seven letters that populate the hive. Each puzzle must have at least one pangram — a word that uses all seven letters. For the iterative approach, we simplified the problem by finding the pangrams first. Then given the pangrams, we could find all words that were composed of subsets of those seven letters in order to construct the puzzles. Afterwards, we can filter the puzzles based on total words and max possible score to reduce the variance in playing the game. This approach was more straightforward than using NLP to generate the puzzles.

To find all the pangrams, we converted every word in the dictionary into a set of unique letters. There were 20,000 sets that contained exactly seven characters. Next, for each set we needed to find every other word with at least four letters that was made up of letters in the set.

For example, the set of seven letters, {a, d, f, l, r, o, w}, has one pangram 'aardwolf' as well as over 150 other English words that can be made from those letters, including 'afar', 'warlord', and 'allow'.

To find the other words, we looped through the entire dictionary and checked whether for each word, its set of letters was a subset of the seven letters in the pangram. If so, the word was added to the list of valid words for that puzzle. Generating all the puzzles with this approach would have taken close to six hours. 
 
The dictionary we used had nearly 300,000 words, so combing through it for each honeycomb required over 5 billion comparisons. Was there a way to reduce the number of comparisons? Was there a way to speed up the search? 

## Hash Map Approach

Our first optimization was to reduce the number of words that had to be checked for each honeycomb. We did this by pre-processing the dictionary and converting it into a hashmap. The keys of the map were the unique letters in a word and the values were all the words composed of those letters. For example, instead of having four entries, one for each of ‘yellow’, ‘yellowly’, ‘yellowy’, and ‘yowley’, we now had one entry for ‘elowy’ that pointed to an array of those four words.

Now, to construct a puzzle, we only had to check if the hashmap key was a subset of the pangram. If so, all the words in the array were added to the possible words for the puzzle. Grouping our words by unique letters took less than a second and reduced the number of entries to 100 thousand. 

The second performance gain was to switch from using Javascript objects to store the pangrams and the pre-processed words to using ES6 maps. Maps are more performant than objects for storing large data sets, keys whose values aren’t known until runtime, and strongly-typed keys and values (all of which applied in our case). Storing the pangrams and the words in a ES6 map more than halved our runtime.

Finally, we sped up the individual comparisons by storing the unique letters for each word as an alphabetized string. In the naive implementation, we checked if the set of letters in a word was a subset of the pangram's set. This method involved creating set objects for each word and set operations. With alphabetization, we iterated through the chars in the sorted string, exiting early if we arrived at a letter that was not in the pangram.

With the above optimizations, we were able to generate all the puzzles in 6 minutes; a full order of magnitude more efficient.

## Bit Set Approach

Working off of our progress from the hash map solution we came across a Hacker News post by wchargin that turned us towards bit sets to see if we could further optimize our algorithm. A bit set is an array data structure that compactly stores bits in a manner that lends itself to the effective exploitation of bit-level parallelism in hardware to perform operations quickly.

The algorithm runs in two distinct phases. The first, handles the pre-processing of the dictionary and the generation of all possible puzzles for the given constraints. During pre-processing each word in the dictionary is converted into the set of its characters whose bit set will serve as the key in our hash map, e.g. 'crouton' and 'contour' both share the character set $cs = \{c, n, o, r, t, u\}$ and corresponding bit set: 18505732.

So in our hash map if you looked up the key 18505732 you would be returned the value 'crouton', 'contour' and all other words sharing the given character set. Our constraints specify that the set of possible letters for a puzzle be of size 7 so all words where $|cs| > 7$ are thrown out. Additionally all puzzles must contain a panagram so all $|cs| = 7$ are flagged to be used for puzzle generation.

From here all flagged character sets can be used to generate the set of all possible puzzles by simply creating a multidimensional array containing 7 nested arrays for each character set where the first element is the set of possible letters in the puzzle and the second element is the required letter (the yellow center tile in NYT Spelling Bee).

e.g. for $cs =\{t, c, n, o, r, u, y \}$ we have the character sets:

$$puzzles = [ [tcnoruy, t], [tcnoruy, c] , [tcnoruy, n] ,$$

$$ [tcnoruy, o] , [tcnoruy, r] , [tcnoruy, u] , [tcnoruy, y]  ] $$

Or as bit sets:

$$puzzles = [[18505732, 524288], [18505732, 4],$$

$$[18505732, 8192], [18505732, 16384],[18505732, 131072],$$

$$ [18505732, 1048576], [18505732, 16777216]] $$

In the second phase we generate the solutions for each puzzle in the set of all puzzles. For a given character set this is done bone by taking the power set of the puzzle’s optional letters (the character set for the puzzle not including the required letter). Then for each of the 128 subsets we use our hash map dictionary to match all words with the character set $s \cup r$, where s is a given subset and r is the required letter. We store each result as the solutions for the given puzzle and when this is done for all character sets meeting the initial conditions the algorithm is complete.

## Conclusion

#### Algorithm Efficiency Comparisons

| Method  | Execution Time (ms) |

| ------------- |:-------------:| -----:|

| Iterative | $2.16e7 \leq x \leq 2.34e7$ |

| Hash Map  | $ 3.3e5 \leq x \leq 3.9e5 $ |

| Bit Set | $ 850 \leq x \leq 2250 $  |

As a team we were very pleased with the success of our optimization. We learned a great deal throughout the process as we researched different approaches to solving the problem from techniques in Natural Language Processing to Linear Algebra. When it was all said and done, what began as an untenable execution time of over 6 hours with our first pass solution, ended as a maximally efficient algorithm that was over 20,000 times more efficient.
