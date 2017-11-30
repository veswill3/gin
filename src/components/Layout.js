import React from 'react';
import PropTypes from 'prop-types';

const Layout = ({ children, leftAction, rightAction }) => (
  <div className="layout">
    <div className="layout-content">
      {children}
    </div>
    <div className="row">
      <span className="layout-action-left">
        {leftAction}
      </span>
      <span className="layout-action-right">
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
