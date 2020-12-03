import {useState, useEffect} from 'react';

const useKeyPressed = key => {
  const [pressedKey, setPressedKey] = useState('');

  const onDown = event => {
    setPressedKey(event.key.toLowerCase());
  };

  useEffect(() => {
    window.addEventListener('keydown', onDown);
    return () => {
      window.removeEventListener('keydown', onDown);
    };
  }, []);

  return pressedKey;
};

export default useKeyPressed;
