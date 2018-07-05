import React from 'react';
import './Boards.css';
import BoardTile from '../BoardTile/BoardTile';

class Boards extends React.Component {
  state = {
    isAdding: false,
    boardName: '',
    selectedBoardId: '',
  }
  addBoard = (e) => {
    this.setState({isAdding: !this.state.isAdding});
  }
  changeBoardName = (e) => {
    const newName = e.target.value;
    this.setState({boardName: newName});
  }
  postBoard = (e) => {
    const {postNewBoard, user} = this.props;
    const {boardName} = this.state;
    if (boardName) {
      postNewBoard({title: boardName, ownerId: user.uid});
      this.addBoard();
    }
    else {
      this.addBoard();
    }
  }
  selectBoard = (boardId) => {
    this.setState({selectedBoardId: boardId});
  }
  render () {
    const {user, boards} = this.props;
    const boardComponents = boards.map(board => {
      return (
        <BoardTile key={board.id} board={board} selectBoard={this.selectBoard}/>
      );
    });
    if (this.state.isAdding) {
      boardComponents.push((<div key={1} className="col-md-3 panel panel-primary"><input onChange={this.changeBoardName} value={this.state.boardName} type="text"/><button onClick={this.postBoard} className="btn btn-danger"><span className="glyphicon glyphicon-plus"></span></button></div>));
    } else {
      boardComponents.push((<button key={1} onClick={this.addBoard} className="btn btn-danger"><span className="glyphicon glyphicon-plus"></span></button>));
    }
    return (
      <div className="Boards">
        <div className="row">
          <h1>Welcome to Ollert</h1>
          {user ? boardComponents : <h2>Log in to view your boards</h2>}
        </div>
        <div className="row">
          {this.state.selectedBoardId ? this.state.selectedBoardId : <p>no board selected</p>}
        </div>
      </div>
    );
  }
}
export default Boards;
