import React from 'react';
import './Card.css';

import cards from '../../firebase/cards';

class Card extends React.Component {
  removeCard = (e) => {
    const {card, getCards} = this.props;
    cards
      .deleteCard(card.id)
      .then(() => {
        getCards();
      })
      .catch(err => {
        console.error('Error deleting card', err);
      });
  }
  render () {
    const {card} = this.props;
    return (
      <div className="Card">
        <div className="col-sm-12">
          <div className="panel panel-primary" draggable>
            <div className="panel-body">
              {card.content}
            </div>
            <div className="panel-footer clearfix">
              <p className="pull-left">{card.userId}</p>
              <button onClick={this.removeCard} type="button" className="close" aria-label="Close">
                <span className="glyphicon glyphicon-trash"></span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Card;
