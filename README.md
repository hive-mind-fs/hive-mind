# Hivemind

This project is built using [React Native](https://reactnative.dev/) and [Expo](https://expo.io/)

### Build the project locally

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

On the left panel, click “Run on iOS simulator”. This requires [Xcode](https://apps.apple.com/us/app/xcode/id497799835?mt=12)

### Build the project remotely

## Algorithms

### Scoring

4-letter words are worth 1 point each.
Longer words earn 1 point per letter.
Each puzzle includes at least one “pangram” which uses every letter. These are worth 7 extra points!

### Ranking

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
