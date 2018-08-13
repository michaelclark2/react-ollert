import React from 'react';
import './Column.css';

import {deleteColumn} from '../../firebase/columns';
import cards from '../../firebase/cards';
import Card from '../Card/Card';

class Column extends React.Component {
  state = {
    cards: [],
  }
  componentDidMount () {
    this.getCards();
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
      <div className="Column col col-md-3">
        <div className="panel panel-primary">
          <div className="panel-heading clearfix">
            <div className="pull-left">
              {column.title}
            </div>
            <button onClick={this.removeColumn} type="button" className="close" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="panel-body">
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
export default Column;
