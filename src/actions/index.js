export const startGame = (p1name, p2name, options) => ({
  type: 'NEW_GAME',
  names: [p1name, p2name],
  options,
});

export const updateDeadwood = (who, val) => ({
  type: 'UPDATE_DEADWOOD',
  who,
  val,
});

export const knock = (whoCalled, gin, bigGin) => ({
  type: 'KNOCK',
  whoCalled,
  gin,
  bigGin,
});

export const cancelKnock = () => ({
  type: 'CANCEL_KNOCK',
});

export const callDraw = () => ({
  type: 'CALL_DRAW',
});

export const confirm = (p1dw, p2dw) => ({
  type: 'CONFIRM',
  deadwood: [p1dw, p2dw],
});

export const jumpToHand = number => ({
  type: 'JUMP_TO_HAND',
  number,
});

export const quit = () => ({
  type: 'QUIT_GAME',
});

export const goToHistory = () => ({
  type: 'GO_TO_HISTORY',
});

export const returnFromHistory = () => ({
  type: 'RETURN_FROM_HISTORY',
});

