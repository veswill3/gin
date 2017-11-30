import React from 'react';
import PropTypes from 'prop-types';

const PlayerInfo = ({ name, score, isDealer }) => (
  <div className="player-info">
    <h3>{name}{isDealer && <span className="dealer"> (D)</span>}</h3>
    <h1>{score}</h1>
  </div>
);

PlayerInfo.propTypes = {
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  isDealer: PropTypes.bool.isRequired,
};

export default PlayerInfo;
