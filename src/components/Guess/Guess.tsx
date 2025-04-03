import { range } from "../../utils"
import { GuessResult } from "../../game-helpers"

interface GuessProps {
  guessCharArr: GuessResult[];
}

function Guess({ guessCharArr }: GuessProps): React.ReactElement {
  return (
    <p className="guess">
      {Array.isArray(guessCharArr) && !guessCharArr.some(item => item.letter === "")
        ? guessCharArr.map(item => (
            <span key={crypto.randomUUID()} className={`cell ${item.status}`}>
              {item.letter}
            </span>
          ))
        : range(5).map(index => (
            <span key={crypto.randomUUID()} className="cell" />
          ))}
    </p>
  )
}

export default Guess 