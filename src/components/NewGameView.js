import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Header, Form } from 'semantic-ui-react';
import Layout from '../components/Layout';
import icon from '../icon.svg';

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

    // dont allow any flasy values
    const disableStart = Object.keys(this.state).some(key => !this.state[key]);
    return (
      <Layout
        leftActionProps={{
          content: 'Reset',
          onClick: this.handleClear,
        }}
        rightActionProps={{
          content: 'Start',
          onClick: this.handleNewgame,
          primary: true,
          disabled: disableStart,
        }}
      >
        <Header
          as='h2'
          image={icon}
          content='Gin'
          subheader='Gin Rummy made easy'
        />
        <Form>
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
          <h2>Options</h2>
          <Form.Group>
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
