import React from 'react';
import './Boards.css';
import BoardTile from '../BoardTile/BoardTile';

class Boards extends React.Component {
  render () {
    const {user, boards} = this.props;
    const boardComponents = boards.map(board => {
      return (
        <BoardTile key={board.id} board={board}/>
      );
    });
    boardComponents.push((<button className="btn btn-danger"><span className="glyphicon glyphicon-plus"></span></button>));
    return (
      <div className="Boards">
        <h1>Welcome to Ollert</h1>
        {user ? boardComponents : <h2>Log in to view your boards</h2>}
      </div>
    );
  }
}
export default Boards;
