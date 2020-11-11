import {useState, useEffect} from 'react';

import './App.css';

import Game from './components/Game';
import Menu from './components/Menu';

import useKeyPressed from './hooks/useKeyPressed';

const App = () => {
  const [isGamePaused, setIsGamePaused] = useState(false);

  const keyPressed = useKeyPressed();

  useEffect(() => {
    if (keyPressed === 'escape') {
      setIsGamePaused(true);
    } else if (keyPressed === ' ') {
      setIsGamePaused(false);
    }
  }, [keyPressed]);

  return (
    <div className="App">
      <div className="appTitle">pacman</div>
      <Game isGamePaused={isGamePaused} keyPressed={keyPressed} />
      {isGamePaused && <Menu />}
    </div>
  );
};

export default App;
