import React from "react"

import { sample } from "../../utils"
import { WORDS } from "../../data"

import AnswerInput from "../AnswerInput"
import GuessResults from "../GuessResults/GuessResults"
import { NUM_OF_GUESSES_ALLOWED } from "../../constants"
import { checkGuess } from "../../game-helpers"
// Pick a random word on every pageload.
const answer = sample(WORDS)
// To make debugging easier, we'll log the solution in the console.
console.info({ answer })

const findNextEmptyGuess = guessResults => {
  return guessResults.findIndex(guess => guess.some(item => item.letter === ""))
}

function Game() {
  const [guessResults, setGuessResults] = React.useState(Array(NUM_OF_GUESSES_ALLOWED).fill(Array(5).fill({letter: "", status: ""})))

  const handleLogGuess = guess => {
    const checkedGuess = checkGuess(guess, answer)
    if(findNextEmptyGuess(guessResults) !== -1) {
      const nextEmptyGuessIndex = findNextEmptyGuess(guessResults)
      const newGuessResults = [...guessResults.slice(0, nextEmptyGuessIndex), checkedGuess, ...guessResults.slice(nextEmptyGuessIndex + 1)]  
      setGuessResults(newGuessResults)
    } else {
      return;
    }
  }

  const isGameWon = guessResults.some(guess => guess.every(item => item.status === "correct"))
  const isGameLost = !guessResults.some(guess => guess.every(item => item.status === "correct")) && guessResults.every(guess => guess.every(item => item.status !== ""))
  const isGameOver = isGameWon || isGameLost

  return (
    <>
      <GuessResults guessResults={guessResults} />
      <AnswerInput logGuess={handleLogGuess} disabled={isGameOver}/>
      {isGameOver && <div className={`${isGameWon ? "happy" : "sad"} banner`}>
        <p>
          {isGameWon && <><strong>Congratulations!</strong> Got it in 
            <strong> {guessResults.findIndex(guess => guess.every(item => item.status === "correct")) + 1} {guessResults.findIndex(guess => guess.every(item => item.status === "correct")) === 0 ? "guess" : "guesses"}</strong>.</>}
          {isGameLost && <>Sorry, the correct answer is <strong>{answer}</strong>.</>}
        </p>
      </div>}
    </>
  )
}

export default Game
