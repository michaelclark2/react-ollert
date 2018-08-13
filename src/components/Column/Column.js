import React from 'react';
import './Column.css';

class Column extends React.Component {
  state = {
    cards: [],
  }
  render () {
    const {column} = this.props;
    return (
      <div className="Column col col-md-3">
        <div className="panel panel-primary">
          <div className="panel-heading">{column.title}</div>
          <div className="panel-body">cards, cards, cards</div>
        </div>
      </div>
    );
  }
};
export default Column;
