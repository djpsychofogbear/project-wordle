import React from "react"

function AnswerInput({ logGuess, disabled }) {
  const [guess, setGuess] = React.useState("")

  const handleGuessInput = event => {
    setGuess(event.target.value.toUpperCase())
  }
  const handleSubmit = e => {
    e.preventDefault()
    console.log({ guess })
    logGuess(guess)
    setGuess("")
  }
  const handleKeyDown = e => {
    const validKeys = /^[A-Za-z]$/ // Allow only letters
    const isSpecialKey = [
      "Enter",
      "Backspace",
      "ArrowLeft",
      "ArrowRight",
      "Tab",
    ].includes(e.key) // Allow navigation keys

    // If the key is not a letter or a special key, prevent input
    if (!validKeys.test(e.key) && !isSpecialKey) {
      e.preventDefault()
    }
  }
  const handlePaste = e => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData("text")
    // Remove invalid characters and take the first 5 valid letters
    const scrubbedData = pastedData
      .replace(/[^A-Za-z]/g, "")
      .slice(0, 5)
      .toUpperCase()
    setGuess(scrubbedData)
  }

  return (
    <form className="guess-input-wrapper" onSubmit={handleSubmit}>
      <label htmlFor="guess-input">Enter guess:</label>
      <input
        id="guess-input"
        type="text"
        value={guess}
        onChange={handleGuessInput}
        onKeyDown={handleKeyDown}
        onPaste={handlePaste}
        pattern="^.{5,5}$"
        minLength={5}
        maxLength={5}
        required
        disabled={disabled}
      />
    </form>
  )
}

export default AnswerInput
