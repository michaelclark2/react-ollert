import React from 'react';
import {DropTarget} from 'react-dnd';
import './Column.css';

import {deleteColumn} from '../../firebase/columns';
import cards from '../../firebase/cards';
import CardForm from '../CardForm/CardForm';
import Card from '../Card/Card';

const columnSource = {
  drop: (props, monitor, component) => {
    return {columnId: props.column.id, getCards: component.getCards};
  },
};

function collect (connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
  };
}

class Column extends React.Component {
  state = {
    cards: [],
    isAdding: false,
  }
  componentDidMount () {
    this.getCards();
  }
  toggleAdding = () => {
    this.setState({isAdding: true});
  }
  toggleAddingOff = () => {
    this.setState({isAdding: false});
  }
  getCards = () => {
    const {column} = this.props;
    cards.getCards(column.id)
      .then(cards => {
        this.setState({cards});
      })
      .catch(err => {
        console.error('Error getting cards', err);
      });
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
    const {column, connectDropTarget} = this.props;
    return connectDropTarget(
      <div className="Column col-md-3">
        <div className="panel panel-primary">
          <div className="panel-heading clearfix">
            <div className="pull-left">
              {column.title}
            </div>
            <div className="pull-right col-toolbar">
              <a onClick={this.toggleAdding}>
                +
              </a>
              <a onClick={this.removeColumn}>
                &times;
              </a>
            </div>
          </div>
          <div className="panel-body clearfix">
            {
              this.state.isAdding || this.state.cards.length === 0 ? (
                <CardForm toggleOff={this.toggleAddingOff} columnId={this.props.column.id} getCards={this.getCards} />
              ) : (
                null
              )
            }
            {
              this.state.cards.map(card => {
                return (
                  <Card key={card.id} card={card} getCards={this.getCards} />
                );
              })
            }
          </div>
        </div>
      </div>
    );
  }
};
export default DropTarget('card', columnSource, collect)(Column);
