import React from 'react';
import './BoardTile.css';

class BoardTile extends React.Component {
  render () {
    const {board} = this.props;
    return (
      <div className="col-md-2">
        <div className="panel panel-primary">
          <div className="panel-body bg-info">
            <p className="text-center">{board.title}</p>
          </div>
        </div>
      </div>
    );
  }
};
export default BoardTile;
