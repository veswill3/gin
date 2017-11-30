import React from 'react';
import PropTypes from 'prop-types';

const Layout = ({ children, leftAction, rightAction }) => (
  <div style={{ display: 'flex', minHeight: '100vh', flexDirection: 'column' }}>
    <div style={{ flex: 1, padding: '1em 1em 0 1em' }}>
      {children}
    </div>
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <span style={{ flex: 1, padding: '1em 0.5em 1em 1em' }}>
        {leftAction}
      </span>
      <span style={{ flex: 1, padding: '1em 1em 1em 0.5em' }}>
        {rightAction}
      </span>
    </div>
  </div>
);

Layout.propTypes = {
  leftAction: PropTypes.node.isRequired,
  rightAction: PropTypes.node.isRequired,
  children: PropTypes.node.isRequired,
};

export default Layout;
