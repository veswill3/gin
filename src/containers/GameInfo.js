import { connect } from 'react-redux';
import GameInfo from '../components/GameInfo';

const mapStateToProps = state => ({
  currentHand: state.currentHand + 1, // programmers count from zero, but not users
  name1: state.names[0],
  name2: state.names[1],
  score1: state.score[0],
  score2: state.score[1],
  dealer: (state.history.length % 2) + 1,
});

export default connect(mapStateToProps)(GameInfo);
