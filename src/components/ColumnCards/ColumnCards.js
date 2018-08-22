import React from 'react';
import {DropTarget} from 'react-dnd';
import './ColumnCards.css';

import Card from '../Card/Card';

const columnSource = {
  drop: (props, monitor, component) => {
    return {columnId: props.columnId, getCards: props.getCards};
  },
};

function collect (connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
  };
}

class ColumnCards extends React.Component {
  render () {
    const {connectDropTarget} = this.props;
    return connectDropTarget(
      <div className="ColumnCards clearfix">
        {
          this.props.cards.map(card => {
            return (
              <Card key={card.id} card={card} getCards={this.props.getCards} loadColumns={this.props.loadColumns} />
            );
          })
        }
      </div>
    );
  }
};

export default DropTarget('card', columnSource, collect)(ColumnCards);
