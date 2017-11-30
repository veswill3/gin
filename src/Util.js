// returns [p1 pts change, p2 pts change]
export const calcScoreChange = (who, gin, bGin, dw1, dw2, opts) => {
  let points = +dw2 - dw1;
  if (who === 2) points *= -1; // flip sign of p2 called it
  if (points < 0) { // undercut
    points *= -1; // flip the sign
    points += opts.undercutBonus;
    return (who === 1) ? [0, points] : [points, 0];
  }
  if (gin) points += opts.ginBonus;
  if (bGin) points += opts.bigGinBonus;
  return (who === 1) ? [points, 0] : [0, points];
};

export const wasUndercut = (who, dw1, dw2) => {
  const difference = (who === 1) ? dw2 - dw1 : dw1 - dw2;
  return difference < 0;
};
