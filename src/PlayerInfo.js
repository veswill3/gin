import React from 'react';

const PlayerInfo = ({ name, score, isDealer }) => (
  <div style={{
    textAlign: 'center',
    flex: 1,
    border: '2px solid black',
    borderRadius: '10px',
    margin: '1em',
    padding: '1em',
  }}>
    <h3>{name}{isDealer && <span style={{ color: 'red' }}> (D)</span>}</h3>
    <h1>{score}</h1>
  </div>
);

export default PlayerInfo;
