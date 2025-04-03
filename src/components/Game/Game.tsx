import React from "react"
import { sample } from "../../utils"
import { WORDS } from "../../data"
import AnswerInput from "../AnswerInput"
import GuessResults from "../GuessResults/GuessResults"
import Keyboard from "../Keyboard/Keyboard"
import { NUM_OF_GUESSES_ALLOWED } from "../../constants"
import { checkGuess, GuessResult } from "../../game-helpers"

interface GameState {
  answer: string;
  guessResults: GuessResult[][];
  currentGuess: string;
}

const findNextEmptyGuess = (guessResults: GuessResult[][]): number => {
  return guessResults.findIndex(guess => guess.some(item => item.letter === ""))
}

function Game(): React.ReactElement {
  const [gameState, setGameState] = React.useState<GameState>({
    answer: sample(WORDS),
    guessResults: Array(NUM_OF_GUESSES_ALLOWED).fill(Array(5).fill({letter: "", status: ""})),
    currentGuess: ""
  })
  
  const handleLogGuess = (guess: string): void => {
    const checkedGuess = checkGuess(guess, gameState.answer)
    if (!checkedGuess) return;
    
    if(findNextEmptyGuess(gameState.guessResults) !== -1) {
      const nextEmptyGuessIndex = findNextEmptyGuess(gameState.guessResults)
      const newGuessResults = [...gameState.guessResults.slice(0, nextEmptyGuessIndex), checkedGuess, ...gameState.guessResults.slice(nextEmptyGuessIndex + 1)]  
      setGameState({...gameState, guessResults: newGuessResults, currentGuess: ""})
    }
  }

  const handleGuessInput = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setGameState({...gameState, currentGuess: event.target.value.toUpperCase()})
  }

  const handleVirtualKeybordInput = (letter: string): void => {
    if(gameState.currentGuess.length < 5) {
      setGameState({...gameState, currentGuess: gameState.currentGuess + letter})
    }
  }

  const handleReset = (): void => {
    setGameState({...gameState, answer: sample(WORDS), guessResults: Array(NUM_OF_GUESSES_ALLOWED).fill(Array(5).fill({letter: "", status: ""})), currentGuess: ""})
  }

  const isGameWon = gameState.guessResults.some(guess => guess.every(item => item.status === "correct"))
  const isGameLost = !gameState.guessResults.some(guess => guess.every(item => item.status === "correct")) && gameState.guessResults.every(guess => guess.every(item => item.status !== ""))
  const isGameOver = isGameWon || isGameLost

  console.log({answer: gameState.answer, guessString: gameState.currentGuess})

  // create an array containing all unique letters guessed and their most recent status
  const uniqueLetters = gameState.guessResults.flat().filter((item, index, guessResultsArray) =>
    index === guessResultsArray.findLastIndex((guessLetter) => (
      guessLetter.letter === item.letter
    ))
  ).filter(item => item.status !== "")


  return (
    <>
      <GuessResults guessResults={gameState.guessResults} />
      <AnswerInput value={gameState.currentGuess} logGuess={handleLogGuess} inputGuess={handleGuessInput} disabled={isGameOver}/>
      {isGameOver && <div className={`${isGameWon ? "happy" : "sad"} banner`}>
        <p>
          {isGameWon && <><strong>Congratulations!</strong> Got it in 
            <strong> {gameState.guessResults.findIndex(guess => guess.every(item => item.status === "correct")) + 1} {gameState.guessResults.findIndex(guess => guess.every(item => item.status === "correct")) === 0 ? "guess" : "guesses"}</strong>.</>}
          {isGameLost && <>Sorry, the correct answer is <strong>{gameState.answer}</strong>.</>}
        </p>
        <button onClick={handleReset} style={{margin: "0 auto", backgroundColor: "white", border: "1px solid black", padding: "10px", borderRadius: "5px", color: "black", marginTop: "10px"}}>Try again</button>
      </div>}
      <Keyboard handleVirtualKeybordInput={handleVirtualKeybordInput} guessedLetters={uniqueLetters}/>
    </>
  )
}

export default Game 