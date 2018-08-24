import React from 'react';
import './BoardForm.css';

import { postBoard } from '../../firebase/boards';
import auth from '../../firebase/auth';

class BoardForm extends React.Component {
  state = {
    isActive: false,
    boardName: '',
  }
  toggleActive = (e) => {
    e.preventDefault();
    this.setState({isActive: !this.state.isActive});
  }
  changeInput = (e) => {
    const boardName = e.target.value;
    if (boardName.length <= 25) {
      this.setState({boardName});
    }
  }
  addBoard = (e) => {
    e.preventDefault();
    const {boardName} = this.state;
    if (boardName) {
      postBoard({title: boardName, ownerId: auth.getUid()})
        .then(() => {
          this.setState({boardName: '', isActive: false});
          this.props.getBoards();
        });
    }
    else if (boardName === '') {
      this.toggleActive(e);
    }
  }
  render () {
    return (
      <form className="BoardForm">
        <div className="panel panel-primary">
          <div className="panel-body text-center">
            <button type="submit" className='btn btn-sm btn-danger' onClick={this.state.isActive ? this.addBoard : this.toggleActive}>
              <span className="glyphicon glyphicon-plus"></span>
            </button>
            {
              this.state.isActive ? (
                <input type="text" onChange={this.changeInput} value={this.state.boardName} placeholder="Add new board..." />
              ) : (
                null
              )
            }
          </div>
        </div>
      </form>
    );
  }
};

export default BoardForm;
