import { connect } from 'react-redux';
import { cancelKnock, confirm } from '../actions';
import ConfirmView from '../components/ConfirmView';

const mapStateToProps = state => ({
  whoCalled: state.whoCalled,
  dw1: state.deadwood[0],
  dw2: state.deadwood[1],
});

const mapDispatchToProps = {
  onCancel: cancelKnock,
  onConfirm: confirm,
};

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmView);
