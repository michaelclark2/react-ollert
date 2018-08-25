import React from 'react';
import {DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import './SingleBoard.css';

import { getColumns } from '../../firebase/columns';

import HorizontalScroll from 'react-scroll-horizontal';
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
    const columnComponents = this.state.columns.map(col => {
      return <Column key={col.id} column={col} loadColumns={this.loadColumns} />;
    });

    return (
      <div className="SingleBoard">
        <div className="row title-bar">
          <div className="col-md-6">
            <h1>{this.props.location.title}</h1>
          </div>
          <div className="col-md-6">
            <ColumnForm loadColumns={this.loadColumns} boardId={this.props.match.params.id} />
          </div>
        </div>
        {
          columnComponents.length ? (
            <HorizontalScroll reverseScroll className="row">
              {columnComponents}
            </HorizontalScroll>
          ) : null
        }
      </div>
    );
  }
};

export default DragDropContext(HTML5Backend)(SingleBoard);
