/* eslint-disable no-mixed-operators */
import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'semantic-ui-react';

function updateHeight() {
  const layoutViewport = document.getElementById('layoutViewport');
  const bottomBar = document.getElementById('bottombar');
  const viewport = window.visualViewport;
  const offsetX = viewport.offsetLeft;
  const offsetY =
    viewport.height -
    layoutViewport.getBoundingClientRect().height +
    viewport.offsetTop;
  bottomBar.style.transform = `translate(${offsetX}px,${offsetY}px) scale(${
    1 / viewport.scale
  })`;
}

class Layout extends React.Component {
  componentDidMount() {
    window.visualViewport.addEventListener('resize', updateHeight);
    window.visualViewport.addEventListener('scroll', updateHeight);
  }
  componentWillUnmount() {
    window.visualViewport.removeEventListener('resize', updateHeight);
    window.visualViewport.removeEventListener('scroll', updateHeight);
  }

  render() {
    const { children, leftActionProps, rightActionProps } = this.props;
    return (
      <div className="layout">
        <div className="layout-content">{children}</div>
        <div id="bottombar">
          <div className="row">
            <span className="layout-action-left">
              <Button fluid {...leftActionProps} />
            </span>
            <span className="layout-action-right">
              <Button fluid {...rightActionProps} />
            </span>
          </div>
        </div>
      </div>
    );
  }
}

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
