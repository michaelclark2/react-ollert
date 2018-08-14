import React from 'react';
import dragula from 'dragula';
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
  componentDidUpdate (prevProps, prevState) {
    if (prevState.columns !== this.state.columns) {
      dragula({
        containers: [...document.getElementsByClassName('ColumnCards')],
        revertOnSpill: true,
        invalid: (el, handle) => {
          return el.classList.contains('CardForm');
        },
      });
    }
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
        <HorizontalScroll reverseScroll className="row">
          {
            this.state.columns.map(col => {
              return <Column key={col.id} column={col} loadColumns={this.loadColumns} />;
            })
          }
        </HorizontalScroll>
      </div>
    );
  }
};

export default SingleBoard;
