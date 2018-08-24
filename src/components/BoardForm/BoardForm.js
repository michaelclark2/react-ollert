import React from 'react';
import './BoardForm.css';

import { postBoard } from '../../firebase/boards';
import auth from '../../firebase/auth';

class BoardForm extends React.Component {
  state = {
    isActive: false,
    boardName: '',
  }
  toggleActive = () => {
    this.setState({isActive: !this.state.isActive});
  }
  changeInput = (e) => {
    const boardName = e.target.value;
    if (boardName.length <= 25) {
      this.setState({boardName});
    }
  }
  addBoard = (e) => {
    const {boardName} = this.state;
    if (boardName) {
      postBoard({title: boardName, ownerId: auth.getUid()})
        .then(() => {
          this.setState({boardName: '', isActive: false});
          this.props.getBoards();
        });
    }
  }
  render () {
    return (
      <div className="BoardForm">
        <div className={this.state.isActive ? 'col-md-3' : 'col-md-1'}>
          <div className="panel panel-primary">
            <div className="panel-body text-center">
              <button className='btn btn-sm btn-danger' onClick={this.state.isActive ? this.addBoard : this.toggleActive}>
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
        </div>
      </div>
    );
  }
};

export default BoardForm;
