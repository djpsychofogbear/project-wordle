import Game from '../Game';
import Header from '../Header';

function App(): JSX.Element {
  return (
    <div className="wrapper">
      <Header />

      <div className="game-wrapper">
        <Game />
      </div>
    </div>
  );
}

export default App; 