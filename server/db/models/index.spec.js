const { expect } = require("chai");
const { db, Word, Round, Game, User, UserRound } = require("../models");

describe("Game >-< Round Association", () => {
  beforeEach(() => db.sync({ force: true }));

  describe("Round magic methods", () => {
    it("a round belongs to exactly one game", async () => {
      const round = await Round.create({
        letters: "abcd",
        coreLetter: "a",
        gameDate: new Date()
      });
      const game1 = await Game.create({
        date: new Date(),
        mode: "1v1"
      });
      const game2 = await Game.create({
        date: new Date(),
        mode: "competition"
      });
      await round.setGame(game1);
      await round.setGame(game2);
      round.getGame().then(game => {
        expect(game.id).to.equal(game2.id);
      });
    });
  });

  describe("Game magic methods", () => {
    it("a game can have many rounds", async () => {
      const round1 = await Round.create({
        letters: "abcd",
        coreLetter: "a",
        gameDate: new Date()
      });
      const round2 = await Round.create({
        letters: "abcd",
        coreLetter: "c",
        gameDate: new Date()
      });
      const game = await Game.create({
        date: new Date(),
        mode: "1v1"
      });
      await game.addRound(round1);
      await game.addRound(round2);
      game.getRounds().then(rounds => {
        expect(rounds.length).to.equal(2);
      });
    });
  });
});

describe("Game/Round >-< User Association", () => {
  beforeEach(() => db.sync({ force: true }));

  describe("Game winner", () => {
    it("Each game has a winner", async () => {
      const game = await Game.create({
        date: new Date(),
        mode: "1v1"
      });
      const user = await User.create({
        email: "cody@email.com",
        password: "123"
      });
      await game.setWinner(user);
      game.getWinner().then(winner => {
        expect(winner.id).to.equal(user.id);
      });
    });
  });

  describe("Round winner", () => {
    it("Each round has a winner", async () => {
      const round = await Round.create({
        letters: "abcd",
        coreLetter: "c",
        gameDate: new Date()
      });
      const user = await User.create({
        email: "cody@email.com",
        password: "123"
      });
      await round.setWinner(user);
      round.getWinner().then(winner => {
        expect(winner.id).to.equal(user.id);
      });
    });
  });
});

describe("Round >-< User Association", () => {
  beforeEach(() => db.sync({ force: true }));

  describe("User magic methods", () => {
    it("Each user can play many rounds", async () => {
      const user = await User.create({
        email: "cody@email.com",
        password: "123"
      });
      const round1 = await Round.create({
        letters: "abcd",
        coreLetter: "a",
        gameDate: new Date()
      });
      const round2 = await Round.create({
        letters: "abcd",
        coreLetter: "c",
        gameDate: new Date()
      });
      await user.addRounds([round1, round2]);

      user.getRounds().then(rounds => {
        expect(rounds.length).to.equal(2);
      });
    });

    describe("User magic methods pt 2", () => {
      it("Users can get their user rounds", async () => {
        const user = await User.create({
          email: "cody@email.com",
          password: "123"
        });
        const round1 = await Round.create({
          letters: "abcd",
          coreLetter: "a",
          gameDate: new Date()
        });
        const round2 = await Round.create({
          letters: "abcd",
          coreLetter: "c",
          gameDate: new Date()
        });
        await user.addRounds([round1, round2]);

        user.getUserRounds().then(userRounds => {
          expect(userRounds.length).to.equal(2);
        });
      });
    });
  });

  describe("Round magic methods", () => {
    it("Each round can have many users", async () => {
      const round = await Round.create({
        letters: "abcd",
        coreLetter: "a",
        gameDate: new Date()
      });
      const user1 = await User.create({
        email: "cody@email.com",
        password: "123"
      });
      const user2 = await User.create({
        email: "murphy@email.com",
        password: "123"
      });

      await round.addUsers([user1, user2]);

      round.getUsers().then(users => {
        expect(users.length).to.equal(2);
      });
    });
  });

  describe("Round magic method pt 2", () => {
    it("Rounds can get their user rounds", async () => {
      const round = await Round.create({
        letters: "abcd",
        coreLetter: "a",
        gameDate: new Date()
      });
      const user1 = await User.create({
        email: "cody@email.com",
        password: "123"
      });
      const user2 = await User.create({
        email: "murphy@email.com",
        password: "123"
      });
      await round.addUsers([user1, user2]);

      round.getUserRounds().then(userRounds => {
        expect(userRounds.length).to.equal(2);
      });
    });
  });

  describe("User round magic methods", () => {
    it("User rounds can set and get their user ", async () => {
      const userRound = await UserRound.create({});
      const round1 = await Round.create({
        letters: "abcd",
        coreLetter: "a",
        gameDate: new Date()
      });
      const user1 = await User.create({
        email: "cody@email.com",
        password: "123"
      });
      await userRound.setUser(user1);
      await userRound.setRound(round1);

      userRound.getUser().then(user => {
        expect(user.id).to.equal(user1.id);
      });
    });
  });

  describe("User round magic methods", () => {
    it("User rounds can set and get their round", async () => {
      const userRound = await UserRound.create({});
      const round1 = await Round.create({
        letters: "abcd",
        coreLetter: "a",
        gameDate: new Date()
      });
      const user1 = await User.create({
        email: "cody@email.com",
        password: "123"
      });
      await userRound.setUser(user1);
      await userRound.setRound(round1);

      userRound.getRound().then(round => {
        expect(round.id).to.equal(round1.id);
      });
    });
  });
});

describe("Word >-< Round Association", () => {
  beforeEach(() => db.sync({ force: true }));

  describe("Round magic methods", () => {
    it("Each round has many words", async () => {
      const round = await Round.create({
        letters: "abcd",
        coreLetter: "a",
        gameDate: new Date()
      });

      await round.addWords([
        await Word.create({ word: "i" }),
        await Word.create({ word: "love" }),
        await Word.create({ word: "my" }),
        await Word.create({ word: "team" })
      ]);

      round.getWords().then(words => {
        expect(words.length).to.equal(4);
      });
    });
  });

  describe("Word magic methods", () => {
    it("Each word can be used in many rounds", async () => {
      const word = await Word.create({
        word: "panagram"
      });

      await word.addRounds([
        await Round.create({
          letters: "abcd",
          coreLetter: "a",
          gameDate: new Date()
        }),
        await Round.create({
          letters: "abcd",
          coreLetter: "a",
          gameDate: new Date()
        })
      ]);

      word.getRounds().then(rounds => {
        expect(rounds.length).to.equal(2);
      });
    });
  });
});

describe("Word >-< UserRound Association", () => {
  beforeEach(() => db.sync({ force: true }));

  describe("Word magic methods", () => {
    it("Each user round has many words", async () => {
      const userRounds = await Round.create(
        {
          letters: "abcd",
          coreLetter: "a",
          gameDate: new Date(),
          users: [
            { email: "cody@email.com", password: "123" },
            { email: "murphy@email.com", password: "123" }
          ]
        },
        {
          include: [User]
        }
      ).then(round => round.getUserRounds().then(userRounds => userRounds));

      const userRound = userRounds[0];

      await userRound.addWords([
        await Word.create({ word: "hi" }),
        await Word.create({ word: "there" })
      ]);

      userRound
        .getWords()
        .then(userRoundWords => expect(userRoundWords.length).to.equal(2));
    });
  });

  // describe("Word magic methods", () => {
  //   it("Each word can be used in many rounds", async () => {
  //     const word = await Word.create({
  //       word: "panagram"
  //     });

  //     await word.addRounds([
  //       await Round.create({
  //         letters: "abcd",
  //         coreLetter: "a",
  //         gameDate: new Date()
  //       }),
  //       await Round.create({
  //         letters: "abcd",
  //         coreLetter: "a",
  //         gameDate: new Date()
  //       })
  //     ]);

  //     word.getRounds().then(rounds => {
  //       expect(rounds.length).to.equal(2);
  //     });
  //   });
  // });
});
