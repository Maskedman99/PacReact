import {useState, useEffect} from 'react';

import createInitialMap from '../logic/createInitialMap';

import useKeyPressed from '../hooks/useKeyPressed';

import '../css/Game.css';

const Game = () => {
  const symbols = {
    empty: ' ',
    wall: '█',
    dot: '●',
    pacman: 'c',
    ghost: '9'
  };

  const keyPressed = useKeyPressed();

  const [mapScreen, setMapScreen] = useState(createInitialMap(symbols));
  const [ghostPosition, setGhostPosition] = useState({r: 1, c: 1});
  const [pacmanPosition, setPacmanPosition] = useState({r: 9, c: 24});
  const [pacmanMovingDirection, setPacmanMovingDirection] = useState('left');
  const [isGamePaused, setIsGamePaused] = useState(false);

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
      } else if (keyPressed === 'escape') {
        setIsGamePaused(true);
      }
    } else if (keyPressed === 'escape') {
      setIsGamePaused(false);
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
        if (mapScreen[pacmanNextPosition.r][pacmanNextPosition.c] !== symbols.wall) {
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
        let ghostNextPosition = ghostPosition;
        let ghostRandom = Math.floor(Math.random() * 4);
        if (ghostRandom === 0) {
          ghostNextPosition = {r: ghostPosition.r - 1, c: ghostPosition.c};
        } else if (ghostRandom === 1) {
          ghostNextPosition = {r: ghostPosition.r + 1, c: ghostPosition.c};
        } else if (ghostRandom === 2) {
          ghostNextPosition = {r: ghostPosition.r, c: ghostPosition.c + 1};
        } else {
          ghostNextPosition = {r: ghostPosition.r, c: ghostPosition.c - 1};
        }
        if (mapScreen[ghostNextPosition.r][ghostNextPosition.c] !== symbols.wall) {
          setGhostPosition(ghostNextPosition);
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
              i === ghostPosition.r && j === ghostPosition.c ? (
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
