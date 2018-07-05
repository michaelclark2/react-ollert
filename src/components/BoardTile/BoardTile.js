import React from 'react';
import './BoardTile.css';

class BoardTile extends React.Component {
  render () {
    const {board} = this.props;
    return (
      <button className="BoardTile btn btn-lg btn-primary"> {board.title} </button>
    );
  }
};
export default BoardTile;
