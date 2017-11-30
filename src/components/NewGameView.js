import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Form } from 'semantic-ui-react';
import Layout from '../components/Layout';

class NewGameView extends Component {
  static propTypes = {
    startGame: PropTypes.func.isRequired,
  }

  state = {
    player1: '',
    player2: '',
    ginBonus: 25,
    bigGinBonus: 35,
    undercutBonus: 25,
    winLimit: 100,
  }

  handleChange = e => this.setState({ [e.target.name]: e.target.value })
  handleOptChange = e =>
    this.setState({ [e.target.name]: e.target.value === '' ? '' : +e.target.value })

  handleClear = () => this.setState({
    player1: '',
    player2: '',
    ginBonus: 25,
    bigGinBonus: 35,
    undercutBonus: 25,
    winLimit: 100,
  })

  handleNewgame = () => {
    const { player1, player2, ...options } = this.state;
    this.props.startGame(player1, player2, options);
  }

  render() {
    const {
      player1,
      player2,
      ginBonus,
      bigGinBonus,
      undercutBonus,
      winLimit,
    } = this.state;
    const disableStart = !player1
      || !player2
      || !ginBonus
      || !bigGinBonus
      || !undercutBonus
      || !winLimit;

    return (
      <Layout
        leftAction={<Button fluid onClick={this.handleClear}>Reset</Button>}
        rightAction={
          <Button
            fluid
            primary
            onClick={this.handleNewgame}
            disabled={disableStart}
            content="Start"
          />
        }
      >
        <Form>
          <h2>Player Info</h2>
          <Form.Group>
            <Form.Input
              label="Player One"
              placeholder="player one"
              name="player1"
              value={player1}
              onChange={this.handleChange}
              maxLength="10"
            />
            <Form.Input
              label="Player Two"
              placeholder="player two"
              name="player2"
              value={player2}
              onChange={this.handleChange}
              maxLength="10"
            />
          </Form.Group>
          <h2>Game Options</h2>
          <Form.Group unstackable widths="equal">
            <Form.Input
              type="number"
              label="Gin Bonus"
              name="ginBonus"
              value={ginBonus}
              onChange={this.handleOptChange}
            />
            <Form.Input
              type="number"
              label="Big Gin Bonus"
              name="bigGinBonus"
              value={bigGinBonus}
              onChange={this.handleOptChange}
            />
            <Form.Input
              type="number"
              label="Undercut Bonus"
              name="undercutBonus"
              value={undercutBonus}
              onChange={this.handleOptChange}
            />
            <Form.Input
              type="number"
              label="Points to Win"
              name="winLimit"
              value={winLimit}
              onChange={this.handleOptChange}
            />
          </Form.Group>
        </Form>
      </Layout>
    );
  }
}

export default NewGameView;
