import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Layout from './Layout';
import GameInfo from '../containers/GameInfo';
import HandActions from '../containers/HandActions';

class PlayView extends Component {
  static propTypes = {
    onQuitClick: PropTypes.func.isRequired,
    onHxClick: PropTypes.func.isRequired,
    isGameOver: PropTypes.bool.isRequired,
  }

  state = { tryQuit: false }

  render() {
    const { onQuitClick, onHxClick, isGameOver } = this.props;

    let leftActionProps = {
      content: 'Quit',
      onClick: isGameOver ? onQuitClick : () => this.setState({ tryQuit: true }),
    };
    let rightActionProps = {
      primary: true,
      content: 'History',
      onClick: onHxClick,
    };
    if (this.state.tryQuit) {
      leftActionProps = {
        content: 'Cancel',
        onClick: () => this.setState({ tryQuit: false }),
      };
      rightActionProps = {
        content: 'Confirm Quit',
        onClick: onQuitClick,
      };
    }

    return (
      <Layout leftActionProps={leftActionProps} rightActionProps={rightActionProps}>
        <GameInfo />
        {isGameOver ?
          <h2 className="gameover-message">Game Over</h2>
          :
          <HandActions />
        }
      </Layout>
    );
  }
}

export default PlayView;
