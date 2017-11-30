import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'semantic-ui-react';
import Layout from './Layout';
import GameInfo from '../containers/GameInfo';
import HandActions from '../containers/HandActions';

class PlayView extends Component {
  static propTypes = {
    onQuitClick: PropTypes.func.isRequired,
    onHxClick: PropTypes.func.isRequired,
  }

  state = { tryQuit: false }

  render() {
    const { onQuitClick, onHxClick } = this.props;

    let leftAction = (
      <Button
        fluid
        onClick={() => this.setState({ tryQuit: true })}
        content="Quit"
      />
    );
    let rightAction = (
      <Button
        fluid
        primary
        onClick={onHxClick}
        content="History"
      />
    );
    if (this.state.tryQuit) {
      leftAction = (
        <Button
          fluid
          onClick={() => this.setState({ tryQuit: false })}
          content="Cancel"
        />
      );
      rightAction = (
        <Button
          fluid
          primary
          onClick={onQuitClick}
          content="Confirm Quit"
        />
      );
    }

    return (
      <Layout leftAction={leftAction} rightAction={rightAction}>
        <GameInfo />
        <HandActions />
      </Layout>
    );
  }
}

export default PlayView;
