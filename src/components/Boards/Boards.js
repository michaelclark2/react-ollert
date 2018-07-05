import React from 'react';
import './Boards.css';
import BoardTile from '../BoardTile/BoardTile';

class Boards extends React.Component {
  state = {
    isAdding: false,
    boardName: '',
  }
  addBoard = (e) => {
    this.setState({isAdding: true});
  }
  changeBoardName = (e) => {
    const newName = e.target.value;
    this.setState({boardName: newName});
  }

  render () {
    const {user, boards} = this.props;
    const boardComponents = boards.map(board => {
      return (
        <BoardTile key={board.id} board={board}/>
      );
    });
    if (this.state.isAdding) {
      boardComponents.push((<div className="col-md-3 panel panel-primary"><input onChange={this.changeBoardName} value={this.state.boardName} type="text"/><button className="btn btn-danger"><span className="glyphicon glyphicon-plus"></span></button></div>));
    } else {
      boardComponents.push((<button onClick={this.addBoard} className="btn btn-danger"><span className="glyphicon glyphicon-plus"></span></button>));
    }
    return (
      <div className="container-fluid">
        <div className="Boards">
          <h1>Welcome to Ollert</h1>
          {user ? boardComponents : <h2>Log in to view your boards</h2>}
        </div>
      </div>
    );
  }
}
export default Boards;
