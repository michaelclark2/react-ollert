import React from 'react';
import './Column.css';

import {deleteColumn} from '../../firebase/columns';
import cards from '../../firebase/cards';
import CardForm from '../CardForm/CardForm';
import Card from '../Card/Card';

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
    const {column} = this.props;
    return (
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
          <div className="panel-body clearfix ColumnCards">
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
                  <Card key={card.id} card={card} getCards={this.props.getCards} />
                );
              })
            }
            {/* <ColumnCards cards={this.state.cards} getCards={this.getCards} /> */}
          </div>
        </div>
      </div>
    );
  }
};
export default Column;
