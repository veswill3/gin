import React from 'react';

const Layout = props => (
  <div style={{ display: 'flex', minHeight: '100vh', flexDirection: 'column' }}>
    <div style={{ flex: 1, padding: '1em 1em 0 1em' }}>
      {props.children}
    </div>
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <span style={{ flex: 1, padding: '1em 0.5em 1em 1em' }}>
        {props.leftAction}
      </span>
      <span style={{ flex: 1, padding: '1em 1em 1em 0.5em' }}>
        {props.rightAction}
      </span>
    </div>
  </div>
);

export default Layout;
