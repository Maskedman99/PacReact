const checkPosition = (position, mapScreen, symbols) => {
  if (mapScreen[position.r][position.c] === symbols.dot) {
    return 'dot';
  } else if (mapScreen[position.r][position.c] === symbols.empty) {
    return 'empty';
  } else if (mapScreen[position.r][position.c] === symbols.wall) {
    return 'wall';
  }
};
