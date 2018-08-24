import React from 'react';
import './Boards.css';

import BoardTile from '../BoardTile/BoardTile';
import BoardForm from '../BoardForm/BoardForm';

import {getBoards} from '../../firebase/boards';
import auth from '../../firebase/auth';

class Boards extends React.Component {
  state = {
    boards: [],
  }
  getUserBoards = () => {
    getBoards(auth.getUid())
      .then(boards => {
        this.setState({boards});
      })
      .catch(err => {
        console.error('Error getting boards', err);
      });
  }
  componentDidMount () {
    this.getUserBoards();
  }
  render () {
    const {boards} = this.state;
    const boardComponents = boards.map(board => {
      return (
        <BoardTile key={board.id} board={board} getBoards={this.getUserBoards}/>
      );
    });

    return (
      <div className="Boards">
        <div className="board-tiles">
          <h1 className="page-header text-center">My Boards</h1>
          <div className="board-container">
            {boardComponents}
          </div>
        </div>
        <div className="board-menu">
          <p>In order to use Ollert, you need to create a board.</p>
          <p>You can do so by clicking below.</p>
          <BoardForm getBoards={this.getUserBoards}/>
        </div>
      </div>
    );
  }
}
export default Boards;
