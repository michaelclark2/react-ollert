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
        <BoardForm getBoards={this.getUserBoards}/>
        <div className="row">
          {boardComponents}
        </div>
      </div>
    );
  }
}
export default Boards;
