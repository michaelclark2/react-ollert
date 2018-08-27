import React from 'react';
import './ColumnForm.css';
import { postColumn } from '../../firebase/columns';

class ColumnForm extends React.Component {
  state = {
    isActive: false,
    colName: '',
  }
  toggleActive = (e) => {
    e.preventDefault();
    this.setState({isActive: !this.state.isActive});
  }
  changeInput = (e) => {
    const colName = e.target.value;
    if (colName.length < 16) {
      this.setState({colName});
    }
  }
  addColumn = (e) => {
    e.preventDefault();
    const {colName} = this.state;
    if (colName) {
      postColumn({title: colName, boardId: this.props.boardId})
        .then(() => {
          this.setState({colName: '', isActive: false});
          this.props.loadColumns();
        });
    }
    else if (colName === '') {
      this.toggleActive(e);
    }
  }
  render () {
    return (
      <form className="ColumnForm">
        <div className="panel panel-primary">
          <div className="panel-body text-center">
            <button className='btn btn-sm btn-danger' onClick={this.state.isActive ? this.addColumn : this.toggleActive}>
              <span className="glyphicon glyphicon-plus"></span>
            </button>
            {
              this.state.isActive ? (
                <input type="text" onChange={this.changeInput} value={this.state.colName} placeholder="Add new column..." />
              ) : null
            }
          </div>
        </div>
      </form>
    );
  }
};

export default ColumnForm;
