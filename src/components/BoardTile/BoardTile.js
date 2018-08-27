import React from 'react';
import {Link} from 'react-router-dom';
import './BoardTile.css';
import { deleteBoard } from '../../firebase/boards';

class BoardTile extends React.Component {
  removeBoard = (e) => {
    const {board} = this.props;
    deleteBoard(board.id)
      .then(() => {
        this.props.getBoards();
      })
      .catch(err => {
        console.error('Error deleting board', err);
      });
  }
  render () {
    const {board} = this.props;
    const pathname = '/board/' + board.id;
    return (
      <div className="panel panel-primary">
        <div className="panel-body text-center">
          <Link to={{pathname, title: board.title}}>{board.title}</Link>
          <button onClick={this.removeBoard} type="button" className="close" aria-label="Close">
            &times;
          </button>
        </div>
      </div>
    );
  }
};
export default BoardTile;
