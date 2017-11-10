import React, { Component } from 'react';
import { Button, Table } from 'semantic-ui-react'
import Layout from './Layout';

const wasUndercut = (knocker, dw1, dw2) => {
  const difference = (knocker === 1) ? dw2 - dw1 : dw1 - dw2;
  return difference < 0;
}

class History extends Component {
  state = {
    selectedRow: null,
  }

  handleJump = () => {
    if (this.state.selectedRow === null) return;
    this.props.jumpHandler(this.state.selectedRow);
  }

  render() {
    const { history, backHandler, p1, p2 } = this.props;
    return (
      <Layout
        leftAction={<Button fluid disabled={this.state.selectedRow === null} onClick={this.handleJump}>Replay Hand</Button>}
        rightAction={<Button fluid primary onClick={backHandler}>Back</Button>}
      >
        <Table unstackable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell rowSpan='2'>#</Table.HeaderCell>
              <Table.HeaderCell colSpan='2'>{p1}</Table.HeaderCell>
              <Table.HeaderCell colSpan='2'>{p2}</Table.HeaderCell>
              <Table.HeaderCell rowSpan='2'>Action</Table.HeaderCell>
            </Table.Row>
            <Table.Row>
              <Table.HeaderCell>S</Table.HeaderCell>
              <Table.HeaderCell>DW</Table.HeaderCell>
              <Table.HeaderCell>S</Table.HeaderCell>
              <Table.HeaderCell>DW</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {history.map((hand, i) => {
              const undercut = wasUndercut(hand.knocker, hand.p1Deadwood, hand.p2Deadwood);
              let text = hand.knocker === 1 ? p1 : p2;
              if (undercut) text += ' was undercut';
              else if (hand.gin) text += ' went Gin';
              else if (hand.bigGin) text += ' got Big Gin';
              else text += ' knocked';
              if (hand.knocker === null) text = 'Draw'
              return (
                <Table.Row
                  key={i}
                  onClick={() =>
                    this.state.selectedRow === i ?
                    this.setState({ selectedRow: null }) :
                    this.setState({ selectedRow: i })
                  }
                  active={i === this.state.selectedRow}
                >
                  <Table.Cell>{i + 1}</Table.Cell>
                  <Table.Cell>{hand.p1Score}</Table.Cell>
                  <Table.Cell>{hand.p1Deadwood}</Table.Cell>
                  <Table.Cell>{hand.p2Score}</Table.Cell>
                  <Table.Cell>{hand.p2Deadwood}</Table.Cell>
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

export default History;

// H  Vesper  Laura   Action
//    sc  dw  sc  dw
// 1  4   3   0   7   Vesper knocked
// 2  12  4   0   12  Vesper knocked
// 3  12  18  12  6   Laura knocked
// 4  12  11  48  0   Laura went Gin
// 5  26  3   48  4   Laura was undercut