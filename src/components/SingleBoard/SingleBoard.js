import React from 'react';
import './SingleBoard.css';
import { getColumns } from '../../firebase/columns';
import Column from '../Column/Column';
import ColumnForm from '../ColumnForm/ColumnForm';

class SingleBoard extends React.Component {
  state = {
    columns: [],
  }
  loadColumns = () => {
    getColumns(this.props.match.params.id)
      .then(columns => {
        this.setState({columns});
      })
      .catch(err => {
        console.error('Error getting columns', err);
      });
  }
  componentDidMount () {
    this.loadColumns();
  }
  render () {
    return (
      <div className="SingleBoard">
        <div className="row">
          <div className="col-md-8">
            <h1>{this.props.location.title}</h1>
          </div>
          <ColumnForm loadColumns={this.loadColumns} boardId={this.props.match.params.id} />
        </div>
        <div className="row scroll-row">
          {
            this.state.columns.map(col => {
              return <Column key={col.id} column={col} loadColumns={this.loadColumns} />;
            })
          }
        </div>
      </div>
    );
  }
};

export default SingleBoard;
