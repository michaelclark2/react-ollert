import React from 'react';
import './Boards.css';
import BoardTile from '../BoardTile/BoardTile';
import Columns from '../Columns/Columns';
import {getBoards} from '../../firebase/boards';
import auth from '../../firebase/auth';

class Boards extends React.Component {
  state = {
    isAdding: false,
    boardName: '',
    selectedBoardId: '',
    boards: [],
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
  componentDidMount () {
    getBoards(auth.getUid())
      .then(boards => {
        this.setState({boards});
      })
      .catch(err => {
        console.error('Error getting boards', err);
      });
  }
  render () {
    const {boards} = this.state;
    const boardComponents = boards.map(board => {
      return (
        <BoardTile key={board.id} board={board}/>
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
          {boardComponents}
        </div>
        <div className="ColumnRow">
          {this.state.columns ? <Columns columns={this.state.columns}/> : <p>Select or create a board to get started</p>}
        </div>
      </div>
    );
  }
}
export default Boards;
