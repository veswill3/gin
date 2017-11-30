import React from 'react';
import PropTypes from 'prop-types';
import PlayerInfo from './PlayerInfo';

const GameInfo = ({
  hand, name1, name2, score1, score2, dealer,
}) => (
  <div>
    <p style={{ textAlign: 'right', paddingRight: '1em', marginBottom: 0 }}>
      Hand {hand}
    </p>
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <PlayerInfo name={name1} score={score1} isDealer={dealer === 1} />
      <PlayerInfo name={name2} score={score2} isDealer={dealer === 2} />
    </div>
  </div>
);

GameInfo.propTypes = {
  hand: PropTypes.number.isRequired,
  name1: PropTypes.string.isRequired,
  name2: PropTypes.string.isRequired,
  score1: PropTypes.number.isRequired,
  score2: PropTypes.number.isRequired,
  dealer: PropTypes.number.isRequired,
};

export default GameInfo;
