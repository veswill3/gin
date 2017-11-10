import React, { Component } from 'react';
import { Button, Input, Message } from 'semantic-ui-react'
import Layout from './Layout';
import PlayerInfo from './PlayerInfo';
import History from './History';

const wasUndercut = (knocker, dw1, dw2) => {
  const difference = (knocker === 1) ? dw2 - dw1 : dw1 - dw2;
  return difference < 0;
}

class Play extends Component {
  state = {
    history: [], // list of hands
    // current hand info
    knocker: null, // 1 or 2
    gin: false,
    bigGin: false,
    p1Score: 0, // score as of this hand
    p1Deadwood: '', // deadwood this hand
    p2Score: 0,
    p2Deadwood: '',
    showHistory: false,
  }

  handleChange = e => this.setState({ [e.target.name]: e.target.value })

  // returns [p1 pts change, p2 pts change]
  calcScoreChange = (who, gin, bGin, dw1, dw2) => {
    let points = dw2 - dw1;
    if (who === 2) points *= -1; // flip sign of p2 called it
    if (points < 0) { // undercut
      points *= -1; // flip the sign
      points += this.props.options.undercutBonus;
      return (who === 1) ? [0, points] : [points, 0];
    }
    if (gin) points += this.props.options.ginBonus;
    if (bGin) points += this.props.options.bigGinBonus;
    return (who === 1) ? [points, 0] : [0, points];
  }

  confirmHand = () => {
    const { history, knocker, gin, bigGin, p1Deadwood, p2Deadwood } = this.state;
    // calculate points gained this hand
    const [p1pts, p2pts] = this.calcScoreChange(knocker, gin, bigGin, +p1Deadwood, +p2Deadwood);
    const [p1Score, p2Score] = [this.state.p1Score + p1pts, this.state.p2Score + p2pts];
    const hand = { knocker, gin, bigGin, p1Score, p1Deadwood, p2Score, p2Deadwood };
    // add to history and clear current hand info
    this.setState({
      history: [...history, hand],
      knocker: null,
      gin: false,
      bigGin: false,
      p1Score, // let the score accumulate
      p1Deadwood: '',
      p2Score,
      p2Deadwood: '',
    });
  }

  dontShowHx = () => this.setState({ showHistory: false });

  jumpToHand = (index) => {
    if (index === 0) {
      // basically like starting the game over
      this.setState({
        showHistory: false,
        history: [],
        knocker: null,
        gin: false,
        bigGin: false,
        p1Score: 0,
        p1Deadwood: '',
        p2Score: 0,
        p2Deadwood: '',
      });
      return;
    }
    // get history up to the hand at index
    const partOfHistory = this.state.history.slice(0, index);
    // extract the scores from that point
    const { p1Score, p2Score } = partOfHistory[partOfHistory.length - 1]
    this.setState({
      showHistory: false,
      history: partOfHistory,
      knocker: null,
      gin: false,
      bigGin: false,
      p1Deadwood: '',
      p2Deadwood: '',
      p1Score,
      p2Score,
    });
  }

  render() {
    const { p1, p2 } = this.props;
    if (this.state.showHistory) {
      return (
        <History
          p1={p1}
          p2={p2}
          history={this.state.history}
          jumpHandler={this.jumpToHand}
          backHandler={this.dontShowHx}
        />
      );
    }
    const {
      history,
      p1Score,
      p2Score,
      knocker,
      gin,
      bigGin,
      p1Deadwood,
      p2Deadwood
    } = this.state;
    const handNum = history.length + 1;
    let p1pts = '';
    let p2pts = '';
    if (knocker && p1Deadwood !== '' && p2Deadwood !== '') {
      [p1pts, p2pts] = this.calcScoreChange(knocker, gin, bigGin, +p1Deadwood, +p2Deadwood);
    }
    let leftAction;
    let rightAction;
    if (knocker) {
      leftAction = (
        <Button
          fluid
          onClick={() => this.setState({
            knocker: null,
            gin: false,
            bigGin: false,
            p1Deadwood: '',
            p2Deadwood: '',
          })}
          content='Cancel'
        />
      );
      rightAction = (
        <Button
          fluid
          primary
          onClick={this.confirmHand}
          content='Confirm'
          disabled={
            p1Deadwood === '' || p2Deadwood === '' ||
            // you cannot knock with more than 10 pts deadwood
            (knocker === 1 && p1Deadwood > 10) ||
            (knocker === 2 && p2Deadwood > 10)
          }
        />
      );
    } else {
      leftAction = (<Button fluid onClick={this.props.quitHandler}>Quit</Button>);
      rightAction = (<Button fluid primary onClick={() => this.setState({ showHistory: true })}>History</Button>);
    }
    return (
      <Layout leftAction={leftAction} rightAction={rightAction}>
        <p style={{ textAlign: 'right', paddingRight: '1em' }}>Hand {handNum}</p>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <PlayerInfo name={p1} score={p1Score} isDealer={handNum % 2 === 0} />
          <PlayerInfo name={p2} score={p2Score} isDealer={handNum % 2 !== 0} />
        </div>
        {knocker === null ?
          <div>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <div style={{ flex: 1, flexDirection: 'column', padding: '0 1em 0 1em' }}>
                <Button
                  style={{ marginBottom: '1em' }}
                  fluid
                  content='Knock'
                  onClick={() => this.setState({ knocker: 1 })}
                  />
                <Button
                  style={{ marginBottom: '1em' }}
                  fluid
                  content='Gin'
                  onClick={() => this.setState({ knocker: 1, gin: true, p1Deadwood: 0 })}
                  />
                <Button
                  style={{ marginBottom: '1em' }}
                  fluid
                  content='Big Gin'
                  onClick={() => this.setState({ knocker: 1, bigGin: true, p1Deadwood: 0 })}
                  />
              </div>
              <div style={{ flex: 1, flexDirection: 'column', padding: '0 1em 0 1em' }}>
                <Button
                  style={{ marginBottom: '1em' }}
                  fluid
                  content='Knock'
                  onClick={() => this.setState({ knocker: 2 })}
                  />
                <Button
                  style={{ marginBottom: '1em' }}
                  fluid
                  content='Gin'
                  onClick={() => this.setState({ knocker: 2, gin: true, p2Deadwood: 0 })}
                  />
                <Button
                  style={{ marginBottom: '1em' }}
                  fluid
                  content='Big Gin'
                  onClick={() => this.setState({ knocker: 2, bigGin: true, p2Deadwood: 0 })}
                  />
              </div>
            </div>
            <div style={{ flex: 1, margin: '0em 1em 1em 1em' }}>
              <Button
                fluid
                content='Only 2 cards left - Draw'
                onClick={this.confirmHand}
              />
            </div>
          </div>
          :
          <div style={{ textAlign: 'center' }}>
            <div style={{ padding: '0em 1em 1em 1em' }}>
              {((knocker === 1 && p1Deadwood > 10) || (knocker === 2 && p2Deadwood > 10)) &&
                <Message error content='You must have less than 10 pts deadwood to knock' />
              }
              {wasUndercut(knocker, p1Deadwood, p2Deadwood) && p1Deadwood !== '' && p2Deadwood !== '' &&
                <Message warning content='Undercut!' />
              }
              {(gin || bigGin) && <Message content='Going Gin - no adding to melds' />}
            </div>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <div style={{ flex: 1, padding: '0 1em 0 1em' }}>
                <Input
                  fluid
                  type="number"
                  name="p1Deadwood"
                  value={p1Deadwood}
                  placeholder="deadwood"
                  onChange={this.handleChange}
                  disabled={knocker === 1 && (gin || bigGin)}
                />
                {p1pts !== 0 && p1pts !== '' && <h2>+{p1pts}</h2>}
              </div>
              <div style={{ flex: 1, padding: '0 1em 0 1em' }}>
                <Input
                  fluid
                  type="number"
                  name="p2Deadwood"
                  value={p2Deadwood}
                  placeholder="deadwood"
                  onChange={this.handleChange}
                  disabled={knocker === 2 && (gin || bigGin)}
                />
                {p2pts !== 0 && p2pts !== '' && <h2>+{p2pts}</h2>}
              </div>
            </div>
          </div>
        }
      </Layout>
    );
  }
}

export default Play;
