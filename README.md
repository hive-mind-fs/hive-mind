# Hivemind

We are using Expo to develop with React Native. We are using the “managed workflow” (similar to create-react-app) to minimize complexity.
https://docs.expo.io/versions/v36.0.0/introduction/managed-vs-bare/.

### Run the project locally

First, install the command line tools.

```
npm install -g expo-cli
```

Install dangling expo dep:

```
expo install react-native-svg
```

Install project dependencies:

```
npm install
```

Create the postgres database with psql cli:

```
createdb hive-mind
```

Seed the database:

```
npm run seed
```

Run the project:

```
npm start
```

On the left panel, click “Run on iOS simulator”.

You may have to download Xcode. Refer to errors in Expo DevTools console. running at http://localhost:19002

When you make changes to the code, they will automatically show up in the simulator.

To debug in the iOS simulator:

```
⌘ + D
Debug Remote JS
```

### Run the project remotely

## Algorithms

### Scoring

4-letter words are worth 1 point each.
Longer words earn 1 point per letter.
Each puzzle includes at least one “pangram” which uses every letter. These are worth 7 extra points!

### Ranking

Ranks are based on a percentage of possible points in a puzzle. For our purposes the rankings will break down as follows,where x is a users points:

Beginner: 0% < x < 2.5%
Good Start: 2.5% < x < 5%
Moving Up: 5% < x < 10%
Good: 10% < x < 15%
Solid: 15% < x < 25%
Nice: 25% < x < 40%
Great: 40% < x < 55%
Amazing: 55% < x < 75%
Genius: 75% < x < 100%
