import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'semantic-ui-react';

const PlayerActions = ({ onKnock, onGin, onBigGin }) => (
  <div className="player-actions">
    <div className="action-btn">
      <Button fluid content="Knock" onClick={onKnock} />
    </div>
    <div className="action-btn">
      <Button fluid content="Gin" onClick={onGin} />
    </div>
    <div className="action-btn">
      <Button fluid content="Big Gin" onClick={onBigGin} />
    </div>
  </div>
);

PlayerActions.propTypes = {
  onKnock: PropTypes.func.isRequired,
  onGin: PropTypes.func.isRequired,
  onBigGin: PropTypes.func.isRequired,
};

export default PlayerActions;
