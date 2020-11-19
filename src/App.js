import {useState, useEffect} from 'react';

import './App.css';

import Game from './components/Game';
import Menu from './components/Menu';

import useKeyPressed from './hooks/useKeyPressed';

const App = () => {
  const [isGamePaused, setIsGamePaused] = useState(true);
  const [isGameOver, setIsGameOver] = useState(false);

  const keyPressed = useKeyPressed();

  useEffect(() => {
    if (keyPressed === 'escape') {
      setIsGamePaused(true);
    } else if (keyPressed === ' ') {
      if (isGameOver) {
        setIsGameOver(false);
      }
      setIsGamePaused(false);
    }
  }, [keyPressed]);

  return (
    <div className="App">
      <div className="appTitle">pacman</div>
      <Game
        isGamePaused={isGamePaused}
        setIsGamePaused={setIsGamePaused}
        setIsGameOver={setIsGameOver}
        keyPressed={keyPressed}
      />
      {isGamePaused && <Menu isGameOver={isGameOver} />}
    </div>
  );
};

export default App;
