const createInitialMap = (symbols) => {
  let initial = [...new Array(20)].map(() => new Array(50).fill(symbols.empty));

  for (let i = 0; i < 20; i++) {
    for (let j = 0; j < 50; j++) {
      initial[i][j] = symbols.dot;
    }
  }

  for (let i = 0; i < 20; i++) {
    initial[i][0] = symbols.wall;
    initial[i][49] = symbols.wall;
  }
  for (let i = 0; i < 50; i++) {
    initial[0][i] = symbols.wall;
    initial[19][i] = symbols.wall;
  }

  return initial;
};

export default createInitialMap;