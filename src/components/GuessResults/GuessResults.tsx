import React from "react"
import Guess from "../Guess/Guess"
import { GuessResult } from "../../game-helpers"

interface GuessResultsProps {
  guessResults: GuessResult[][];
}

function GuessResults({ guessResults }: GuessResultsProps): React.ReactElement {
  return (
    <>
      {guessResults.map((guess, index) => (
        <Guess guessCharArr={guess} key={index}/>
      ))}
    </>
  )
}

export default GuessResults 