import React from 'react';
import PostRoundScreen from './PostRoundScreen';

export default function Game({ navigation }) {
    const [roundStatus, setRoundStatus] = useState('countdown');

    const renderRoundScreen() => {
        if (roundStatus === 'countdown') {
            <CountdownScreen/>
        } else if (roundStatus === 'live') {
            <GameBoardScreen/>
        } else if (roundStatus === 'complete') {
            <PostRoundScreen/>
        }
    }
  return (
      {renderRoundScreen()}
  );
}


// // TO DOS
// // R - Login/Signup and set global user state
// // V - 3 screen arch
// // V - Start Game
// // B - Gameplay (tap letters, delete, shuffle)
// //   - Enter functionality (validate words got)
// // NV - Database stuff (making sure round api works, put/post route that persists user game after game is over)
// // Thunks communicate with each to routes
// // V - Theme Styling
// // R - Hive Board styling

// // Global State
// loggedIn: true/false
// userId: 
// username: 
// userPhoto: 

// // All Game
// gameStatus: "countdown", "live", "ended"
// round: object with all letters and possible words
//     letters: string abc order "abcdefg"
//     coreletter: "a"
//     gameDate:
//     winnerId:
//     words: array of objects {ID, word, pangram, points?}
// userRound: object { userid, roundId }
// user: 
// score:
// wordsGot:

// When you click "Start Game"...
// - hit API to get round object (includes letters and all possible words)
// --- Store that in state as Round
// - Also create a userRounds entry with user info 
// - Run shuffle function and store to 'lettersOrder'

// // Countdown
// countDownTimer: 

// // GameBoard
// timer: 
// wordInput:
// lettersOrder: array of letters?

// When you hit enter... (handler passed down)
// - It'll validate locally if it's correct or not
// - Update wordsGot and score state immediately, don't wait for database promise
// - Display proper error/success response

//         COMPETITION MODE  (IGNORE FOR NOW)
//         --- If it's correct, store it to db 
//         --- Respond with updated score

// When you hit shuffle... (local handler)
// - Update 'lettersOrder' state 
// - random, whoever's does it figure out how to store and mix it up 

// When you hit delete... (local handler)
// - update the 'wordInput' state and remove the last letter

// When you tap a letter... (local handler)
// - Add it to the 'wordInput' state 


// // Postround
// When game ends (timer = 0)...
// - set 'gameStatus' = 'ended'
// - send everything to database
// - display PostRound screen

// Optional...
// - Total points possible
// - Total wrods possible 

// When you click play again , use the same "Start Game" logic 
// When you click queueMicrotask, redirect to PlayScreen