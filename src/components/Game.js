import {useState, useEffect} from 'react';

import createInitialMap from '../logic/createInitialMap';
import isPacmanOnAGhost from '../logic/isPacmanOnAGhost';

import '../css/Game.css';

const Game = ({isGamePaused, setIsGamePaused, setIsGameOver, keyPressed}) => {
  const symbols = {
    empty: ' ',
    wall: '█',
    dot: '●',
    pacman: 'c',
    ghost: '9'
  };

  const [mapScreen, setMapScreen] = useState(createInitialMap(symbols));
  const [ghostPosition, setGhostPosition] = useState({r1: 1, c1: 1, r2: 18, c2: 48});
  const [pacmanPosition, setPacmanPosition] = useState({r: 9, c: 24});
  const [pacmanMovingDirection, setPacmanMovingDirection] = useState('left');

  // --------------- UPDATE PACMAN-MOVING-DIRECTION BASED ON KEY PRESSED ---------------------
  useEffect(() => {
    if (!isGamePaused) {
      if (keyPressed === 'w' || keyPressed === 'arrowup') {
        setPacmanMovingDirection('up');
      } else if (keyPressed === 's' || keyPressed === 'arrowdown') {
        setPacmanMovingDirection('down');
      } else if (keyPressed === 'd' || keyPressed === 'arrowright') {
        setPacmanMovingDirection('right');
      } else if (keyPressed === 'a' || keyPressed === 'arrowleft') {
        setPacmanMovingDirection('left');
      }
    }
  }, [keyPressed]);

  // ---------------- MOVE PACMAN --------------------
  useEffect(() => {
    if (!isGamePaused) {
      const interval = setInterval(() => {
        let pacmanNextPosition = {r: 0, c: 0};
        if (pacmanMovingDirection === 'up') {
          pacmanNextPosition = {r: pacmanPosition.r - 1, c: pacmanPosition.c};
        } else if (pacmanMovingDirection === 'down') {
          pacmanNextPosition = {r: pacmanPosition.r + 1, c: pacmanPosition.c};
        } else if (pacmanMovingDirection === 'right') {
          pacmanNextPosition = {r: pacmanPosition.r, c: pacmanPosition.c + 1};
        } else if (pacmanMovingDirection === 'left') {
          pacmanNextPosition = {r: pacmanPosition.r, c: pacmanPosition.c - 1};
        }
        if (isPacmanOnAGhost(pacmanNextPosition, ghostPosition)) {
          setIsGamePaused(true);
          setIsGameOver(true);
        } else if (mapScreen[pacmanNextPosition.r][pacmanNextPosition.c] !== symbols.wall) {
          setPacmanPosition(pacmanNextPosition);
        }
      }, 125);
      return () => {
        clearInterval(interval);
      };
    }
  }, [pacmanPosition, pacmanMovingDirection, isGamePaused]);

  //  ---------------- UPDATE MAP AFTER PACMAN EATS DOT ---------------------
  useEffect(() => {
    if (!isGamePaused) {
      if (mapScreen[pacmanPosition.r][pacmanPosition.c] === symbols.dot) {
        let x = mapScreen;
        x[pacmanPosition.r][pacmanPosition.c] = symbols.empty;
        setMapScreen(x);
      }
    }
  }, [pacmanPosition, isGamePaused]);

  // ------------------ MOVE GHOST ---------------------
  useEffect(() => {
    if (!isGamePaused) {
      const interval = setInterval(() => {
        let r1 = ghostPosition.r1;
        let r2 = ghostPosition.r2;
        let c1 = ghostPosition.c1;
        let c2 = ghostPosition.c2;

        let ghostRandom = Math.floor(Math.random() * 4);
        if (ghostRandom === 0) {
          r1 = ghostPosition.r1 - 1;
          r2 = ghostPosition.r2 + 1;
        } else if (ghostRandom === 1) {
          r1 = ghostPosition.r1 + 1;
          r2 = ghostPosition.r2 - 1;
        } else if (ghostRandom === 2) {
          c1 = ghostPosition.c1 + 1;
          c2 = ghostPosition.c2 - 1;
        } else {
          c1 = ghostPosition.c1 - 1;
          c2 = ghostPosition.c2 + 1;
        }
        if (mapScreen[r1][c1] !== symbols.wall && mapScreen[r2][c2] !== symbols.wall) {
          setGhostPosition({r1, c1, r2, c2});
        }
      }, 125);
      return () => {
        clearInterval(interval);
      };
    }
  }, [ghostPosition, isGamePaused]);

  return (
    <div>
      <div className="gameScreenContainer">
        {mapScreen.map((row, i) => (
          <div key={i} className="gameScreenRow">
            {row.map((cell, j) =>
              i === ghostPosition.r1 && j === ghostPosition.c1 ? (
                <div key={j} className="gameScreenCell gameGhost">
                  {symbols.ghost}
                </div>
              ) : i === ghostPosition.r2 && j === ghostPosition.c2 ? (
                <div key={j} className="gameScreenCell gameGhost">
                  {symbols.ghost}
                </div>
              ) : i === pacmanPosition.r && j === pacmanPosition.c ? (
                <div key={j} className={`gameScreenCell gamePacman pacman${pacmanMovingDirection}`}>
                  {symbols.pacman}
                </div>
              ) : (
                <div key={j} className={`gameScreenCell ${cell === symbols.wall && 'gameWall'}`}>
                  {cell}
                </div>
              )
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Game;
