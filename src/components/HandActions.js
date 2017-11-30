import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'semantic-ui-react';
import PlayerActions from './PlayerActions';

const HandActions = ({ knock, callDraw }) => (
  <div>
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <PlayerActions
        onKnock={() => knock(1, false, false)}
        onGin={() => knock(1, true, false)}
        onBigGin={() => knock(1, false, true)}
      />
      <PlayerActions
        onKnock={() => knock(2, false, false)}
        onGin={() => knock(2, true, false)}
        onBigGin={() => knock(2, false, true)}
      />
    </div>
    <div style={{ flex: 1, margin: '0em 1em 1em 1em' }}>
      <Button
        fluid
        onClick={callDraw}
        content="Only 2 cards left? - Draw"
      />
    </div>
  </div>
);

HandActions.propTypes = {
  knock: PropTypes.func.isRequired,
  callDraw: PropTypes.func.isRequired,
};

export default HandActions;
