import React from 'react';
import './Boards.css';

class Boards extends React.Component {
  render () {
    const {user, boards} = this.props;
    const boardComponents = boards.map(board => {
      return (
        // <BoardTile board={board}/>
      );
    });
    return (
      <div>
        <h1>Baords!</h1>
        {user ? {boardComponents} : <h2>Log in to view your boards</h2> }
      </div>
    );
  }
}
export default Boards;
