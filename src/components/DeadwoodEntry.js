import React from 'react';
import PropTypes from 'prop-types';
import { Input, Message } from 'semantic-ui-react';
import { calcScoreChange, wasUndercut } from '../Util';

const DeadwoodEntry = ({
  options,
  dw1,
  dw2,
  who,
  gin,
  bigGin,
  onDeadWoodUpdate,
}) => {
  const [p1pts, p2pts] = calcScoreChange(who, gin, bigGin, dw1, dw2, options);
  let showScoreChange = (gin || bigGin) ?
    (dw1 !== '' || dw2 !== '') : // either filled in
    (dw1 !== '' && dw2 !== ''); // both must enter

  let message = null;
  if (gin || bigGin) {
    message = (
      <Message content="Going Gin - no adding to melds" />
    );
  } else if ((who === 1 && dw1 > 10) || (who === 2 && dw2 > 10)) {
    showScoreChange = false;
    message = (
      <Message
        error
        content="You must have less than 10 pts deadwood to knock"
      />
    );
  } else if (dw1 !== '' && dw2 !== '' && wasUndercut(who, dw1, dw2)) {
    message = (
      <Message
        warning
        content="Undercut!"
      />
    );
  }

  return (
    <div className="deadwood-entry">
      <div className="deadwood-message">
        {message}
      </div>
      <div className="row">
        <div className="deadwood-input">
          <Input
            fluid
            type="number"
            value={dw1}
            placeholder="deadwood"
            onChange={e => onDeadWoodUpdate(1, e.target.value)}
            disabled={who === 1 && (gin || bigGin)}
          />
          {showScoreChange && p1pts !== 0 && <h2>+{p1pts}</h2>}
        </div>
        <div className="deadwood-input">
          <Input
            fluid
            type="number"
            value={dw2}
            placeholder="deadwood"
            onChange={e => onDeadWoodUpdate(2, e.target.value)}
            disabled={who === 2 && (gin || bigGin)}
          />
          {showScoreChange && p2pts !== 0 && <h2>+{p2pts}</h2>}
        </div>
      </div>
    </div>
  );
};

DeadwoodEntry.propTypes = {
  options: PropTypes.shape({
    ginBonus: PropTypes.number,
    bigGinBonus: PropTypes.number,
    undercutBonus: PropTypes.number,
    winLimit: PropTypes.number,
  }).isRequired,
  dw1: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  dw2: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  who: PropTypes.number.isRequired,
  gin: PropTypes.bool.isRequired,
  bigGin: PropTypes.bool.isRequired,
  onDeadWoodUpdate: PropTypes.func.isRequired,
};

export default DeadwoodEntry;
