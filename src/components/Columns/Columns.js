import React from 'react';
import './Columns.css';

class Columns extends React.Component {
  render () {
    const {columns} = this.props;
    const allColumns = columns.map(col => {
      return (
        <div key={col.id} className="col-md-4">
          <div className="panel panel-primary">
            <div className="panel-heading">{col.title}</div>
            <div className="panel-body">cards, cards, cards</div>
          </div>
        </div>
      );
    });
    return (
      <div className="Columns">
        {allColumns}
      </div>
    );
  }
};
export default Columns;
