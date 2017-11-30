import { connect } from 'react-redux';
import { startGame } from '../actions';
import NewGameView from '../components/NewGameView';

const mapDispatchToProps = {
  startGame,
};

export default connect(null, mapDispatchToProps)(NewGameView);
