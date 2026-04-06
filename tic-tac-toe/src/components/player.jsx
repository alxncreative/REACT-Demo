import { useState } from 'react';

export function Player(props) {
	const [isEditing, setIsEditing] = useState(false);
	const handleClick = () => setIsEditing(editing => !editing);

	return (
		<div className="player">
			{isEditing ? (
				<>
					<input type="text" value={props.name} onChange={props.onNameChange} />
					<select value={props.chosenSymbol} onChange={props.onSymbolChange}>
						{props.symbols.map((symbol) => (
							<option key={symbol} value={symbol}>{symbol}</option>
						))}
					</select>
				</>
			) : (
				<>
					<div className="player-name">{props.name}</div>
					<div className="player-symbol">{props.chosenSymbol}</div>
				</>
			)}
			<button onClick={handleClick} className="player-eidt">
				{isEditing ? 'Save' : 'Edit' }
			</button>
		</div>
	);
}

export function PlayerScoreBoard(props) {
	const {games} = props;

	return (
		<div class name="score-board">
		{!games || games.length <= 0 ? (
			<p>No games played yet.</p>
		) : (
      <div className="score-table">
				<div className="score-table-header">
					<h2>Game Scores</h2>
					<button className="score-table-reset" onClick={props.onReset}>Reset</button>
				</div>
				<div className="score-table-body">
					{games.map((game, index) => (
						<PlayerScoreRow players={game.players} game={index + 1}/>
					))}
				</div>
			</div>
		)}
		</div>
	);
}

export function PlayerScoreRow(props) {
	const {players, game} = props;
  return (
    <div className="score-row">
      <div className="score-row-header">Game {game}</div>
			<div className="score-row-body">
				{players && players.map((player, index) => (
					<div key={index} className="player">{player.name} {player.score}</div>
				))}
      </div>
    </div>
  );
}
