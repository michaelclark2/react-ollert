import React from 'react';
import './ColumnForm.css';
import { postColumn } from '../../firebase/columns';

class ColumnForm extends React.Component {
  state = {
    isActive: false,
    colName: '',
  }
  toggleActive = () => {
    this.setState({isActive: !this.state.isActive});
  }
  changeInput = (e) => {
    const colName = e.target.value;
    if (colName.length < 16) {
      this.setState({colName});
    }
  }
  addColumn = (e) => {
    const {colName} = this.state;
    if (colName) {
      postColumn({title: colName, boardId: this.props.boardId})
        .then(() => {
          this.setState({colName: '', isActive: false});
          this.props.loadColumns();
        });
    }
  }
  render () {
    return (
      <div className="ColumnForm">
        {
          this.state.isActive ? (

            <div className="col-md-3">
              <div className="panel panel-primary">
                <div className="panel-body text-center">
                  <button className='btn btn-sm btn-danger' onClick={this.addColumn}>
                    <span className="glyphicon glyphicon-plus"></span>
                  </button>
                  <input type="text" onChange={this.changeInput} value={this.state.colName} placeholder="Add new column..." />
                </div>
              </div>
            </div>

          ) : (

            <div className="col-md-1">
              <div className="panel panel-primary">
                <div className="panel-body text-center">
                  <button className='btn btn-sm btn-danger' onClick={this.toggleActive}>
                    <span className="glyphicon glyphicon-plus"></span>
                  </button>
                </div>
              </div>
            </div>
          )
        }
      </div>
    );
  }
};

export default ColumnForm;
