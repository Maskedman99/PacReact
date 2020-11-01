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
  const [pacmanPosition, setPacmanPosition] = useState({r: 9, c: 24});
  const [pacmanMovingDirection, setPacmanMovingDirection] = useState('left');

  useEffect(() => {
    let x = mapScreen;
    x[pacmanPosition.r][pacmanPosition.c] = symbols.empty;
    setMapScreen(x);
  }, [pacmanPosition]);

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
    if (pacmanMovingDirection === 'up') {
      setPacmanPosition({r: pacmanPosition.r - 1, c: pacmanPosition.c});
    } else if (pacmanMovingDirection === 'down') {
      setPacmanPosition({r: pacmanPosition.r + 1, c: pacmanPosition.c});
    } else if (pacmanMovingDirection === 'right') {
      setPacmanPosition({r: pacmanPosition.r, c: pacmanPosition.c + 1});
    } else if (pacmanMovingDirection === 'left') {
      setPacmanPosition({r: pacmanPosition.r, c: pacmanPosition.c - 1});
    }
  }, [pacmanMovingDirection]);

  console.log(pacmanPosition);

  return (
    <div>
      <div className="gameScreenContainer">
        {mapScreen.map(row => (
          <div className="gameScreenRow">
            {row.map(cell => (
              <div className={`gameScreenCell ${cell === symbols.wall && 'gameWall'}`}>{cell}</div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Game;
