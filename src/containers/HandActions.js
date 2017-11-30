import { connect } from 'react-redux';
import { knock, callDraw } from '../actions';
import HandActions from '../components/HandActions';

const mapDispatchToProps = {
  knock,
  callDraw,
};

export default connect(null, mapDispatchToProps)(HandActions);
