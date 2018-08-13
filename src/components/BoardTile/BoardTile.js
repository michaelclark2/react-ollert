import React from 'react';
import {Link} from 'react-router-dom';
import './BoardTile.css';

class BoardTile extends React.Component {
  render () {
    const {board} = this.props;
    return (
      <div className="col-md-2">
        <div className="panel panel-primary">
          <div className="panel-body text-center">
            <Link to={'/board/' + board.id}>{board.title}</Link>
          </div>
        </div>
      </div>
    );
  }
};
export default BoardTile;
