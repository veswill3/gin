import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'semantic-ui-react';

const PlayerActions = ({ onKnock, onGin, onBigGin }) => (
  <div style={{ flex: 1, flexDirection: 'column', padding: '0 1em 0 1em' }}>
    <Button
      style={{ marginBottom: '1em' }}
      fluid
      content="Knock"
      onClick={onKnock}
    />
    <Button
      style={{ marginBottom: '1em' }}
      fluid
      content="Gin"
      onClick={onGin}
    />
    <Button
      style={{ marginBottom: '1em' }}
      fluid
      content="Big Gin"
      onClick={onBigGin}
    />
  </div>
);

PlayerActions.propTypes = {
  onKnock: PropTypes.func.isRequired,
  onGin: PropTypes.func.isRequired,
  onBigGin: PropTypes.func.isRequired,
};

export default PlayerActions;
