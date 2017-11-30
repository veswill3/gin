import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'semantic-ui-react';
import Layout from './Layout';
import GameInfo from '../containers/GameInfo';
import HandActions from '../containers/HandActions';

const PlayView = ({ onQuitClick, onHxClick }) => (
  <Layout
    leftAction={<Button fluid onClick={onQuitClick}>Quit</Button>}
    rightAction={<Button fluid primary onClick={onHxClick}>History</Button>}
  >
    <GameInfo />
    <HandActions />
  </Layout>
);

PlayView.propTypes = {
  onQuitClick: PropTypes.func.isRequired,
  onHxClick: PropTypes.func.isRequired,
};

export default PlayView;
