import { connect } from 'react-redux';
import { quit, goToHistory } from '../actions';
import PlayView from '../components/PlayView';

const mapDispatchToProps = {
  onQuitClick: quit,
  onHxClick: goToHistory,
};

export default connect(null, mapDispatchToProps)(PlayView);
