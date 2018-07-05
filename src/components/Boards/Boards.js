import React from 'react';
import './Boards.css';

class Boards extends React.Component {
  render () {
    const {user} = this.props;
    const boardComponents = () => {
      const {boards} = this.props;
      return boards.map(board => {
        return (
          // <BoardTile board={board}/>
          <p>{board.title}</p>
        );
      });
    };
    return (
      <div>
        <h1>Baords!</h1>
        {user ? boardComponents() : <h2>Log in to view your boards</h2> }
      </div>
    );
  }
}
export default Boards;
