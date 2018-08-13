import React from 'react';
import './Column.css';

import {deleteColumn} from '../../firebase/columns';

class Column extends React.Component {
  state = {
    cards: [],
  }
  removeColumn = (e) => {
    const {column, loadColumns} = this.props;
    deleteColumn(column.id)
      .then(() => {
        loadColumns();
      })
      .catch(err => {
        console.error('Error deleting column', err);
      });
  }
  render () {
    const {column} = this.props;
    return (
      <div className="Column col col-md-3">
        <div className="panel panel-primary">
          <div className="panel-heading">
            {column.title}
            <button onClick={this.removeColumn} type="button" className="close" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="panel-body">cards, cards, cards</div>
        </div>
      </div>
    );
  }
};
export default Column;
