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
  const [ghostsPosition, setGhostsPosition] = useState({
    r1: 1,
    c1: 1,
    r2: 18,
    c2: 48,
    r3: 1,
    c3: 48,
    r4: 18,
    c4: 1
  });
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
        if (isPacmanOnAGhost(pacmanNextPosition, ghostsPosition)) {
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
        let r1 = ghostsPosition.r1;
        let r2 = ghostsPosition.r2;
        let r3 = ghostsPosition.r3;
        let r4 = ghostsPosition.r4;
        let c1 = ghostsPosition.c1;
        let c2 = ghostsPosition.c2;
        let c3 = ghostsPosition.c3;
        let c4 = ghostsPosition.c4;

        let ghostRandom = Math.floor(Math.random() * 4);
        if (ghostRandom === 0) {
          r1 = ghostsPosition.r1 - 1;
          c2 = ghostsPosition.c2 + 1;
          r3 = ghostsPosition.r3 + 1;
          c4 = ghostsPosition.c4 - 1;
        } else if (ghostRandom === 1) {
          r1 = ghostsPosition.r1 + 1;
          c2 = ghostsPosition.c2 - 1;
          r3 = ghostsPosition.r3 - 1;
          c4 = ghostsPosition.c4 + 1;
        } else if (ghostRandom === 2) {
          c1 = ghostsPosition.c1 + 1;
          r2 = ghostsPosition.r2 - 1;
          c3 = ghostsPosition.c3 - 1;
          r4 = ghostsPosition.r4 + 1;
        } else {
          c1 = ghostsPosition.c1 - 1;
          r2 = ghostsPosition.r2 + 1;
          c3 = ghostsPosition.c3 + 1;
          r4 = ghostsPosition.r4 - 1;
        }
        if (
          mapScreen[r1][c1] !== symbols.wall &&
          mapScreen[r2][c2] !== symbols.wall &&
          mapScreen[r3][c3] !== symbols.wall &&
          mapScreen[r4][c4] !== symbols.wall 
        ) {
          setGhostsPosition({r1, c1, r2, c2, r3, c3, r4, c4});
        }
      }, 125);
      return () => {
        clearInterval(interval);
      };
    }
  }, [ghostsPosition, isGamePaused]);

  return (
    <div>
      <div className="gameScreenContainer">
        {mapScreen.map((row, i) => (
          <div key={i} className="gameScreenRow">
            {row.map((cell, j) =>
              i === ghostsPosition.r1 && j === ghostsPosition.c1 ? (
                <div key={j} className="gameScreenCell gameGhost">
                  {symbols.ghost}
                </div>
              ) : i === ghostsPosition.r2 && j === ghostsPosition.c2 ? (
                <div key={j} className="gameScreenCell gameGhost">
                  {symbols.ghost}
                </div>
              ) : i === ghostsPosition.r3 && j === ghostsPosition.c3 ? (
                <div key={j} className="gameScreenCell gameGhost">
                  {symbols.ghost}
                </div>
              ) : i === ghostsPosition.r4 && j === ghostsPosition.c4 ? (
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
