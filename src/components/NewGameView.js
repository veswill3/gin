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
          as="h2"
          image={icon}
          content="Gin"
          subheader="Gin Rummy made easy"
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
        <h2>How to play</h2>
        <h3>Setup</h3>
        <p>
          Gin rummy is a two person card game, played with a standard deck of 52 cards. King is
          high, Ace is low. Player One starts by shuffling and dealing 10 cards to each player. The
          remaining cards go into the draw pile. Turn one card up to start the discard pile. Switch
          the dealer each round.
        </p>
        <h3>Objective</h3>
        <p>
          Form sets (e.g. 7, 7, 7) and runs (9, 10, J, Q - all hearts) of 3+ cards each in your hand
          such that your leftover cards (deadwood) have fewer points that your opponent. End the
          round by knocking to score the difference between each player&#39;s deadwood. A player
          wins when they have exceeded the total points to win.
        </p>
        <h3>Play</h3>
        <p>
          On the first turn of each round the non-dealer can decline to take the up-card, in which
          case the dealer can pick it up. If the dealer also declines, the non-dealer draws from the
          discard pile.
        </p>
        <p>
          Taking turns, each player starts by drawing a card from the top of either the draw or
          discard pile, and then discards a card face up. The round ends when one player knocks or
          only two cards remain. A player may only knock on their turn when they have fewer than 10
          points of deadwood. You may knock on the first turn or before discarding, though you are
          never required to knock.
        </p>
        <h3>Scoring</h3>
        <p>
          When a player has knocked, they will organize their cards into melds (sets or runs of 3+
          cards) and lay them face up on the table. A card may only belong to a single meld. The
          opponent will do that same, and have the opportunity to lay cards off the knocking players
          melds. Any unmatched cards count towards that player&#39;s deadwood. Aces are worth one
          point, numbered cards equal their value, and face cards are all worth ten points of
          deadwood.
        </p>
        <p>
          Typically, the player who knocked gains the difference in deadwood. There are a few
          caveats that are automatically applied in this app, but for reference:
        </p>
        <ul>
          <li>
            If the opponent undercuts the knocking player (ends up with fewer points of deadwood)
            than the opponent scores the difference in deadwood, plus an undercut bonus.
          </li>
          <li>
            If a player knocks with no unmatched cards, they Go Gin. In this case, the opponent does
            not have the opportunity to lay off unmatched cards. The knocking player scores the
            total amount of their opponents deadwood, plus a Gin bonus.
          </li>
          <li>
            If a player knocks with no unmatched cards, including the draw card, it is known as Big
            Gin. The same rules apply as Going Gin, except they get a Big Gin bonus.
          </li>
        </ul>
      </Layout>
    );
  }
}

export default NewGameView;
