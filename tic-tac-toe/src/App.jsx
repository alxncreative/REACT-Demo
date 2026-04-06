import { useEffect } from "react";
import { useState } from "react";

/**
 * Internal resources.
 */
import { Player, PlayerScoreBoard } from "./components/player";
import { GameBoard } from "./components/game";

function App() {
  const [games, setGames] = useState([]);
  const availabelSymobols = ["X", "O"];
  const [currentSymbol, setCurrentSymbol] = useState(availabelSymobols[1]);

  const [gameArray, setGameArray] = useState([
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ]);

  const [players, setPlayers] = useState([
    { name: "Player 1", score: 0, symbol: availabelSymobols[0] },
    { name: "Player 2", score: 0, symbol: availabelSymobols[1] },
  ]);

  const [currentActivePlayer, setCurrentActivePlayer] = useState(players.filter(player => player.symbol === currentSymbol));

  const handleCellClick = (colIndex, rowIndex) => {
    setCurrentSymbol( value => availabelSymobols.filter(symbol => symbol!== currentSymbol)[0]);

    gameArray[rowIndex][colIndex] = currentSymbol;
    const noWingingButEnd = gameArray.every(row => row.every(cell => cell));
    const winningCondition = [ [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6] ].some(combination => combination.every(index => gameArray[Math.floor(index / 3)][index % 3] === currentSymbol));

    if (winningCondition) {
      setGames(games => [...games, { players: [{ name: "Player 1", score: 1 }, { name: "Player 2", score: 0 }] }]);
      setGameArray(Array(3).fill(null).map(() => Array(3).fill(null)));
    } else {
      if (noWingingButEnd) {
        setGames(games => [...games, { players: [{ name: "Player 1", score: 0 }, { name: "Player 2", score: 0 }] }]);
      } else {
        setGameArray(gameArray);
      }
    }
  }

  const handleReset = () => {
    setGames([]);
    setCurrentSymbol("X");
    setGameArray(Array(3).fill(null).map(() => Array(3).fill(null)));
  }

  const handlePlaeyrChange = (event, index, type) => {
    const updatedPlayers = [...players];
    updatedPlayers[index][type] = event.target.value;
    setPlayers(updatedPlayers);
  }

  return (
    <main id="tic-tac-toe">
      <div className="player-list">
        {players.map((player, index) => (
          <Player
          onNameChange={(event) => handlePlaeyrChange(event, index, "name"  )}
          onSymbolChange={(event) => handlePlaeyrChange(event, index, "symbol")}
          key={index}
          chosenSymbol={player.symbol || "(^_^)" }
          name={player.name}
          symbols={availabelSymobols}
          />
        ))}
      </div>
      <h4><strong>X</strong> starts the game!</h4>
      <GameBoard
        gameCells={gameArray}
        onClick={handleCellClick}
        currentSymbol={currentSymbol}
      />
      <PlayerScoreBoard games={games} onReset={handleReset} />
    </main>
  );
}

export default App;
