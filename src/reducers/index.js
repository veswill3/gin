import { calcScoreChange } from '../Util';

const resetHand = {
  whoCalled: null,
  deadwood: ['', ''],
  gin: null,
  bigGin: null,
};

const initialState = {
  ...resetHand,
  showHistory: false,
  options: null,
  names: [null, null],
  score: [0, 0],
  history: [], // --> { whoCalled: 1, score: [4, 0], deadwood: [3, 7], gin: false, bigGin: false }
};

const ginApp = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_DEADWOOD': {
      const { who, val } = action;
      const deadwood = [
        who === 1 ? val : state.deadwood[0],
        who === 2 ? val : state.deadwood[1],
      ];
      return {
        ...state,
        deadwood,
      };
    }
    case 'KNOCK': {
      const { whoCalled, gin, bigGin } = action;
      const deadwood = [...state.deadwood];
      if (gin || bigGin) {
        deadwood[whoCalled - 1] = 0;
      }
      return {
        ...state,
        whoCalled,
        gin,
        bigGin,
        deadwood,
      };
    }
    case 'CANCEL_KNOCK': {
      return {
        ...state,
        ...resetHand,
      };
    }
    case 'CONFIRM': {
      const {
        whoCalled, gin, bigGin, deadwood: [dw1, dw2], options,
      } = state;
      const change = calcScoreChange(whoCalled, gin, bigGin, dw1, dw2, options);
      // accumulate score
      const score = state.score.map((s, i) => s + change[i]);
      return {
        ...state,
        ...resetHand,
        score,
        // add to history
        history: [
          ...state.history,
          {
            whoCalled,
            score,
            deadwood: [+dw1, +dw2],
            gin,
            bigGin,
          },
        ],
      };
    }
    case 'CALL_DRAW': {
      return {
        ...state,
        ...resetHand,
        history: [
          ...state.history,
          {
            whoCalled: 0,
            score: state.score,
            deadwood: [0, 0],
            gin: false,
            bigGin: false,
          },
        ],
      }; }
    case 'JUMP_TO_HAND': {
      if (action.number === 0) {
        // basically starting the game over
        return {
          ...state,
          ...resetHand,
          score: [0, 0],
          history: [],
        };
      }
      // get history up to the hand at index
      const partOfHistory = state.history.slice(0, action.number);
      // extract the scores from that point
      const { score } = partOfHistory[partOfHistory.length - 1];
      return {
        ...state,
        ...resetHand,
        score,
        history: partOfHistory,
      }; }
    case 'GO_TO_HISTORY': {
      return {
        ...state,
        showHistory: true,
      }; }
    case 'RETURN_FROM_HISTORY': {
      return {
        ...state,
        showHistory: false,
      }; }
    case 'QUIT_GAME':
    { return initialState; }
    case 'NEW_GAME': {
      return {
        ...state,
        ...resetHand,
        options: action.options,
        names: action.names,
        history: [],
      }; }
    default:
      return state;
  }
};

export default ginApp;
