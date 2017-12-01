import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'semantic-ui-react';

const Layout = ({ children, leftActionProps, rightActionProps }) => (
  <div className="layout">
    <div className="layout-content">
      {children}
    </div>
    <div className="row">
      <span className="layout-action-left">
        <Button fluid {...leftActionProps} />
      </span>
      <span className="layout-action-right">
        <Button fluid {...rightActionProps} />
      </span>
    </div>
  </div>
);

Layout.propTypes = {
  leftActionProps: PropTypes.shape({
    content: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    primary: PropTypes.bool,
    disabled: PropTypes.bool,
  }).isRequired,
  rightActionProps: PropTypes.shape({
    content: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    primary: PropTypes.bool,
    disabled: PropTypes.bool,
  }).isRequired,
  children: PropTypes.node.isRequired,
};

export default Layout;
