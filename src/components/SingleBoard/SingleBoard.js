import React from 'react';
import './SingleBoard.css';
import { getColumns } from '../../firebase/columns';
import Column from '../Column/Column';

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
        <h1>{this.props.location.title}</h1>
        <div className="row">
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
