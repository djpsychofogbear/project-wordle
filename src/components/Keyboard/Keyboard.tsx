import React from 'react';
import { GuessResult, LetterStatus } from '../../game-helpers';

const keyboardRows: string[][] = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["Z", "X", "C", "V", "B", "N", "M"]
]

type KeyProps = React.ComponentProps<"button"> & {
  letter: string;
  status: LetterStatus | "";
}
function Key({letter, status, ...props}: KeyProps): React.ReactElement {
  return (
    <>
      <button className={`keyboard-key ${status}`} {...props}>
        {letter}
      </button>
    </>)
}

type KeyboardProps = {
  guessedLetters: GuessResult[];
  handleVirtualKeybordInput: (letter: string) => void;
}

function Keyboard({guessedLetters, handleVirtualKeybordInput}: KeyboardProps): React.ReactElement {
  return <div className="keyboard">
    {keyboardRows.map((row, index) => (
      <div key={index} className="keyboard-row">
        {row.map((currentLetter, index) => (
          <Key key={index} letter={currentLetter} onClick={() => handleVirtualKeybordInput(currentLetter)} status={guessedLetters.find(letter => letter.letter === currentLetter)?.status || ""}/>
        ))}
      </div>
    ))}
  </div>;
}

export default Keyboard; 