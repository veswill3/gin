import { connect } from 'react-redux';
import { quit, goToHistory } from '../actions';
import PlayView from '../components/PlayView';

const mapStateToProps = state => ({
  isGameOver: state.score.some(s => s >= state.options.winLimit),
});

const mapDispatchToProps = {
  onQuitClick: quit,
  onHxClick: goToHistory,
};

export default connect(mapStateToProps, mapDispatchToProps)(PlayView);
