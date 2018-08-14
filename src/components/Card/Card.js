import React from 'react';
import './Card.css';

import cards from '../../firebase/cards';
import users from '../../firebase/users';

class Card extends React.Component {
  state = {
    userName: '',
  }
  componentDidMount () {
    const {card} = this.props;
    this.findUserName(card.userId);
  }
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
  findUserName = (uid) => {
    users.getUserName(uid).then(userName => {
      this.setState({userName});
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
              <span className="pull-left">{this.state.userName}</span>
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
