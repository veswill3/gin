/* eslint react/no-array-index-key: 0 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Table } from 'semantic-ui-react';
import Layout from './Layout';
import { wasUndercut } from '../Util';

class HistoryView extends Component {
  static propTypes = {
    names: PropTypes.arrayOf(PropTypes.string).isRequired,
    history: PropTypes.arrayOf(PropTypes.shape({
      whoCalled: PropTypes.number.isRequired,
      score: PropTypes.arrayOf(PropTypes.number).isRequired,
      deadwood: PropTypes.arrayOf(PropTypes.number).isRequired,
      gin: PropTypes.bool.isRequired,
      bigGin: PropTypes.bool.isRequired,
    })).isRequired,
    jumpToHand: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired,
  }

  state = { selectedRow: null }

  replayClick = () => {
    if (this.state.selectedRow === null) return;
    this.props.jumpToHand(this.state.selectedRow);
    this.props.goBack();
  }

  render() {
    const { names, history, goBack } = this.props;
    return (
      <Layout
        leftAction={
          <Button
            fluid
            onClick={this.replayClick}
            disabled={this.state.selectedRow === null}
          >Replay Hand
          </Button>
        }
        rightAction={<Button fluid primary onClick={goBack}>Back</Button>}
      >
        <Table unstackable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell rowSpan="2">#</Table.HeaderCell>
              <Table.HeaderCell colSpan="2">{names[0]}</Table.HeaderCell>
              <Table.HeaderCell colSpan="2">{names[1]}</Table.HeaderCell>
              <Table.HeaderCell rowSpan="2">Action</Table.HeaderCell>
            </Table.Row>
            <Table.Row>
              <Table.HeaderCell>S</Table.HeaderCell>
              <Table.HeaderCell>DW</Table.HeaderCell>
              <Table.HeaderCell>S</Table.HeaderCell>
              <Table.HeaderCell>DW</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {history.map(({
              whoCalled,
              score,
              deadwood,
              gin,
              bigGin,
            }, i) => {
              let text;
              if (whoCalled === 0) text = 'Draw';
              else {
                text = whoCalled === 1 ? names[0] : names[1];
                if (gin) text += ' went Gin';
                else if (bigGin) text += ' got Big Gin';
                else if (wasUndercut(whoCalled, deadwood[0], deadwood[1])) {
                  text += ' was undercut';
                } else text += ' knocked';
              }
              return (
                <Table.Row
                  key={i}
                  onClick={() =>
                    (this.state.selectedRow === i ?
                    this.setState({ selectedRow: null }) :
                    this.setState({ selectedRow: i }))
                  }
                  active={i === this.state.selectedRow}
                >
                  <Table.Cell>{i + 1}</Table.Cell>
                  <Table.Cell>{score[0]}</Table.Cell>
                  <Table.Cell>{deadwood[0]}</Table.Cell>
                  <Table.Cell>{score[1]}</Table.Cell>
                  <Table.Cell>{deadwood[1]}</Table.Cell>
                  <Table.Cell>{text}</Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>
      </Layout>
    );
  }
}

export default HistoryView;
