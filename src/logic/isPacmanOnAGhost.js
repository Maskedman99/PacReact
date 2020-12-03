const isPacmanOnAGhost = (pacmanNextPosition, ghostsPosition) => {
  if (pacmanNextPosition.r === ghostsPosition.r1 && pacmanNextPosition.c === ghostsPosition.c1) {
    return true;
  } else if (pacmanNextPosition.r === ghostsPosition.r2 && pacmanNextPosition.c === ghostsPosition.c2) {
    return true;
  } else if (pacmanNextPosition.r === ghostsPosition.r3 && pacmanNextPosition.c === ghostsPosition.c3) {
    return true;
  } else if (pacmanNextPosition.r === ghostsPosition.r4 && pacmanNextPosition.c === ghostsPosition.c4) {
    return true;
  } else {
    return false;
  }
};

export default isPacmanOnAGhost;
