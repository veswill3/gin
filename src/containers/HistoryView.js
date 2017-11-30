import { connect } from 'react-redux';
import { jumpToHand, returnFromHistory } from '../actions';
import HistoryView from '../components/HistoryView';

const mapStateToProps = state => ({
  names: state.names,
  history: state.history,
});

const mapDispatchToProps = {
  jumpToHand,
  goBack: returnFromHistory,
};

export default connect(mapStateToProps, mapDispatchToProps)(HistoryView);
