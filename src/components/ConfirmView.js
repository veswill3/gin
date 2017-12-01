import React from 'react';
import PropTypes from 'prop-types';
import Layout from './Layout';
import GameInfo from '../containers/GameInfo';
import DeadwoodEntry from '../containers/DeadwoodEntry';

const ConfirmView = ({
  whoCalled,
  dw1,
  dw2,
  onCancel,
  onConfirm,
}) => (
  <Layout
    leftActionProps={{
      onClick: onCancel,
      content: 'Cancel',
    }}
    rightActionProps={{
      primary: true,
      onClick: onConfirm,
      content: 'Confirm',
      disabled: (
        dw1 === '' || dw2 === '' ||
        // you cannot knock with more than 10 pts deadwood
        (whoCalled === 1 && dw1 > 10) ||
        (whoCalled === 2 && dw2 > 10)
      ),
    }}
  >
    <GameInfo />
    <DeadwoodEntry />
  </Layout>
);

ConfirmView.propTypes = {
  whoCalled: PropTypes.number.isRequired,
  dw1: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  dw2: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};

export default ConfirmView;
