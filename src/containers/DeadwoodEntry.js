import { connect } from 'react-redux';
import { updateDeadwood } from '../actions';
import DeadwoodEntry from '../components/DeadwoodEntry';

const mapStateToProps = state => ({
  options: state.options,
  dw1: state.deadwood[0],
  dw2: state.deadwood[1],
  who: state.whoCalled,
  gin: state.gin,
  bigGin: state.bigGin,
});

const mapDispatchToProps = {
  onDeadWoodUpdate: updateDeadwood,
};

export default connect(mapStateToProps, mapDispatchToProps)(DeadwoodEntry);
