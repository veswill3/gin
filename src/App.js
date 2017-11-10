import React, { Component } from 'react';
import Play from './Play';
import NewGame from './NewGame';

class App extends Component {
  state = {
    p1Name: '',
    p2Name: '',
    options: null,
  }

  startGame = (p1Name, p2Name, options) => this.setState({ p1Name, p2Name, options });
  quitGame = () => this.setState({ p1Name: '', p2Name: '', options: null });

  render() {
    const { p1Name, p2Name, options } = this.state;
    if (!p1Name || !p2Name || !options) {
      return (<NewGame newgameHandler={this.startGame} />)
    }
    return (<Play p1={p1Name} p2={p2Name} options={options} quitHandler={this.quitGame} />);
  }
}

export default App;
