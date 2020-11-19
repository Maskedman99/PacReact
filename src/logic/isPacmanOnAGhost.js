const isPacmanOnAGhost = (pacmanNextPosition, ghostPosition) => {
  if (pacmanNextPosition.r === ghostPosition.r1 && pacmanNextPosition.c === ghostPosition.c1) {
    return true;
  } else if (pacmanNextPosition.r === ghostPosition.r2 && pacmanNextPosition.c === ghostPosition.c2) {
    return true;
  } else {
    return false;
  }
};

export default isPacmanOnAGhost;
