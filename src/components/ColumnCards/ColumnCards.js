import React from 'react';
import './ColumnCards.css';

import Card from '../Card/Card';

class ColumnCards extends React.Component {
  render () {
    return (
      <div className="ColumnCards clearfix">
        {
          this.props.cards.map(card => {
            return (
              <Card key={card.id} card={card} getCards={this.props.getCards} />
            );
          })
        }
      </div>
    );
  }
};

export default ColumnCards;
