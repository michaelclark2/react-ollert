import React from 'react';
import './BoardTile.css';

class BoardTile extends React.Component {
  render () {
    const {board} = this.props;
    return (
      <div className="col-md-3">
        <button className="BoardTile btn btn-lg btn-primary"> {board.title} </button>
      </div>
    );
  }
};
export default BoardTile;
