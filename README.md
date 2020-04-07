![Hivemind](/client/assets/app-screenshot.jpg)

# Hivemind

A live multiplayer spelling game mobile app based off [NYT Spelling Bee](https://www.nytimes.com/puzzles/spelling-bee). Built with React Native, Node.js, Express, Postgres, Web Sockets, D3, and Expo.

## Features

- Two Play Modes
  - Practice: Single player practice rounds
  - Live 1v1: Complete live against another player in the app via web sockets
- Email and Facebook Auth
- Leaderboard
- Player stats and game logs

![Hivemind How To Play](https://media.giphy.com/media/Za3YoADDQSGUitmfEe/giphy.gif)

## Game Rules & Scoring

The goal of the game is to spell as many words as you can with the 7 provided letters within 5 minutes.

- Every word must include the "Core Letter", the letter in the yellow center of the hive
- Words must be at least 4 letters long
- 4-letter words are worth 1 point each
- Longer words earn 1 point per letter
- Each puzzle includes at least one “pangram” which uses every letter – these are worth 7 extra points!

## Getting Started / Installing Locally

This project is developed with [React Native](https://reactnative.dev/) and [Expo](https://expo.io/). We are using the “managed workflow” (similar to create-react-app) to minimize complexity.
https://docs.expo.io/versions/v36.0.0/introduction/managed-vs-bare/.


First, install the command line tools.

```
npm install -g expo-cli
```

Install a dangling Expo dependency:

```
expo install react-native-svg
```

Install nodemon (this is used to run the server and watch for changes):

```
npm install -g nodemon
```

Install project dependencies:

```
npm install
```

Create the PostgreSQL database with psql cli:

```
createdb hive-mind
```

Seed the database:

```
npm run seed
```

Run the project:

```
npm run dev
```

On the left panel, click “Run on iOS simulator”. This requires [Xcode](https://apps.apple.com/us/app/xcode/id497799835?mt=12).


## Round Creation Algorithm

We generated all possible rounds using...need to put details here...


## Rankings
Rankings are based on the percentage of total points earned in a puzzle.

* **Beginner**: 0% - 2.5%
* **Good Start**: 2.5% - 5%
* **Moving Up**: 5% - 10%
* **Good**: 10% - 15%
* **Solid**: 15% - 25%
* **Nice**: 25% - 40%
* **Great**: 40% - 55%
* **Amazing**: 55% - 75%
* **Genius**: 75% - 100%

## Contributors

- @rhanixon
- @natiwhitney
- @richmcateer
- @vosters