import {useState, useEffect} from 'react';

import createInitialMap from '../logic/createInitialMap';

import useKeyPressed from '../hooks/useKeyPressed';

import '../css/Game.css';

const Game = () => {
  const symbols = {
    empty: ' ',
    wall: '█',
    dot: '●',
    pacman: 'ᗤ',
    ghost: 'ᗣ'
  };

  const keyPressed = useKeyPressed();

  const [mapScreen, setMapScreen] = useState(createInitialMap(symbols));
  const [pacmanNextPosition, setPacmanNextPosition] = useState({r: 9, c: 24});
  const [pacmanPosition, setPacmanPosition] = useState({r: 9, c: 24});
  const [pacmanMovingDirection, setPacmanMovingDirection] = useState('left');

  useEffect(() => {
    if (keyPressed === 'w' || keyPressed === 'arrowup') {
      setPacmanMovingDirection('up');
    } else if (keyPressed === 's' || keyPressed === 'arrowdown') {
      setPacmanMovingDirection('down');
    } else if (keyPressed === 'd' || keyPressed === 'arrowright') {
      setPacmanMovingDirection('right');
    } else if (keyPressed === 'a' || keyPressed === 'arrowleft') {
      setPacmanMovingDirection('left');
    }
  }, [keyPressed]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (pacmanMovingDirection === 'up') {
        setPacmanNextPosition({r: pacmanPosition.r - 1, c: pacmanPosition.c});
      } else if (pacmanMovingDirection === 'down') {
        setPacmanNextPosition({r: pacmanPosition.r + 1, c: pacmanPosition.c});
      } else if (pacmanMovingDirection === 'right') {
        setPacmanNextPosition({r: pacmanPosition.r, c: pacmanPosition.c + 1});
      } else if (pacmanMovingDirection === 'left') {
        setPacmanNextPosition({r: pacmanPosition.r, c: pacmanPosition.c - 1});
      }
      if (mapScreen[pacmanNextPosition.r][pacmanNextPosition.c] !== symbols.wall) {
        setPacmanPosition(pacmanNextPosition);
      }
    }, 125);
    return () => {
      clearInterval(interval);
    };
  }, [pacmanPosition, pacmanMovingDirection]);

  useEffect(() => {
    if (mapScreen[pacmanPosition.r][pacmanPosition.c] === symbols.dot) {
      let x = mapScreen;
      x[pacmanPosition.r][pacmanPosition.c] = symbols.empty;
      setMapScreen(x);
    }
  }, [pacmanPosition]);

  console.log(pacmanPosition);

  return (
    <div>
      <div className="gameScreenContainer">
        {mapScreen.map((row, i) => (
          <div key={i} className="gameScreenRow">
            {row.map((cell, j) => (
              <div
                key={j}
                className={`gameScreenCell ${
                  cell === symbols.wall
                    ? 'gameWall'
                    : i === pacmanPosition.r && j === pacmanPosition.c && 'gamePacman'
                }`}>
                {{r: i, c: j} !== pacmanPosition ? cell : symbols.pacman}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Game;
