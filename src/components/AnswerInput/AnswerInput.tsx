import React from "react"

interface AnswerInputProps {
  value: string;
  logGuess: (guess: string) => void;
  inputGuess: (event: React.ChangeEvent<HTMLInputElement>) => void;
  disabled: boolean;
}

function AnswerInput({ value, logGuess, inputGuess, disabled }: AnswerInputProps): React.ReactElement {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    logGuess(value)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
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

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>): void => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData("text")
    // Remove invalid characters and take the first 5 valid letters
    const scrubbedData = pastedData
      .replace(/[^A-Za-z]/g, "")
      .slice(0, 5)
      .toUpperCase()
    inputGuess({ target: { value: scrubbedData } } as React.ChangeEvent<HTMLInputElement>)
  }

  return (
    <form className="guess-input-wrapper" onSubmit={handleSubmit}>
      <label htmlFor="guess-input">Enter guess:</label>
      <input
        id="guess-input"
        type="text"
        value={value}
        onChange={inputGuess}
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