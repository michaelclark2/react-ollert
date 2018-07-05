import React from 'react';
import './BoardTile.css';

class BoardTile extends React.Component {
  clickBoard = (e) => {
    const {selectBoard, board} = this.props;
    selectBoard(board.id);
  }
  render () {
    const {board} = this.props;
    return (
      <div className="col-md-2">
        <div id={board.id} className="panel panel-primary" onClick={this.clickBoard}>
          <div className="panel-body bg-primary">
            <p className="text-center">{board.title}</p>
          </div>
        </div>
      </div>
    );
  }
};
export default BoardTile;
