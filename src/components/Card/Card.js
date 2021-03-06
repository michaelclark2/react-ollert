import React from 'react';
import {DragSource} from 'react-dnd';
import './Card.css';

import cards from '../../firebase/cards';
import users from '../../firebase/users';
import CardForm from '../CardForm/CardForm';

function collect (connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
  };
};

const cardSource = {
  beginDrag: (props, monitor, component) => {
    return {cardId: props.card.id, columnId: props.card.columnId};
  },
  endDrag: (props, monitor, component) => {
    const dropColumn = monitor.getDropResult();
    if (dropColumn !== null) {
      cards.editCard(props.card, props.card.id, dropColumn.columnId)
        .then(() => {
          dropColumn.getCards();
          props.getCards();
        });
    }
  },
};

class Card extends React.Component {
  state = {
    userName: '',
    isEditing: false,
  }
  componentDidMount () {
    const {card} = this.props;
    this.findUserName(card.userId);
  }
  toggleEditingOn = () => {
    this.setState({isEditing: true});
  }
  toggleEditingOff = () => {
    this.setState({isEditing: false});
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
    users.getUserName(uid)
      .then(userName => {
        this.setState({userName});
      })
      .catch(err => {
        console.error('Error finding username', err);
      });
  }
  render () {
    const {card} = this.props;
    if (this.state.isEditing) {
      return (
        <CardForm
          isEditing={this.state.isEditing}
          card={card}
          toggleOff={this.toggleEditingOff}
          columnId={card.columnId}
          getCards={this.props.getCards}
        />
      );
    } else {
      const {connectDragSource} = this.props;
      return connectDragSource(
        <div>
          <div className="Card col-sm-12">
            <div className="panel panel-primary">
              <div className="panel-body">
                {card.content}
              </div>
              <div className="panel-footer clearfix">
                <span className="pull-left username">{this.state.userName}</span>
                <button onClick={this.toggleEditingOn} type="button" className="close" aria-label="Close">
                  <span className="glyphicon glyphicon-edit"></span>
                </button>
                <button onClick={this.removeCard} type="button" className="close" aria-label="Close">
                  <span className="glyphicon glyphicon-trash"></span>
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
};

export default DragSource('card', cardSource, collect)(Card);
