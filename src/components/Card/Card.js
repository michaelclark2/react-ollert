import React from 'react';
import './Card.css';

class Card extends React.Component {
  render () {
    const {card} = this.props;
    return (
      <div className="Card">
        <div className="col-sm-12">
          <div className="panel panel-primary" draggable>
            <div className="panel-body">
              {card.content}
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Card;
