import React from "react"

import Guess from "../Guess/Guess"

import { range } from "../../utils"
import { NUM_OF_GUESSES_ALLOWED } from "../../constants"

function GuessResults({ guessResults }) {
  return (
    <>
      {guessResults.map((guess, index) => (
        <Guess guessCharArr={guess} key={index}/>
      ))}
    </>
  )
}

export default GuessResults
