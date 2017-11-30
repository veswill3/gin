import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import NewGameView from './NewGameView';
import PlayView from './PlayView';
import ConfirmView from './ConfirmView';
import HistoryView from './HistoryView';

const App = ({ view }) => {
  switch (view) {
    case 'newGame':
      return (<NewGameView />);
    case 'play':
      return (<PlayView />);
    case 'confirm':
      return (<ConfirmView />);
    case 'history':
      return (<HistoryView />);
    default:
      throw new Error('Unable to determin which view to show');
  }
};

App.propTypes = {
  view: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => {
  if (state.names[0] === null) return { view: 'newGame' };
  if (state.showHistory === true) return { view: 'history' };
  if (state.whoCalled === null) return { view: 'play' };
  if (state.whoCalled !== null) return { view: 'confirm' };
  return { view: undefined };
};

export default connect(mapStateToProps)(App);
