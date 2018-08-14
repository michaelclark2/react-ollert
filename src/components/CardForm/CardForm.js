import React from 'react';
import './CardForm.css';

import cards from '../../firebase/cards';
import auth from '../../firebase/auth';

class CardForm extends React.Component {
  state = {
    cardContent: '',
  }
  inputChange = (e) => {
    const cardContent = e.target.value;
    if (cardContent.length < 151) {
      this.setState({cardContent});
    }
  }
  postCard = (e) => {
    e.preventDefault();
    const {toggleOff, getCards, columnId, isEditing} = this.props;
    const cardObj = {
      columnId,
      userId: auth.getUid(),
      assignee: auth.getUid(),
      content: this.state.cardContent,
    };
    if (cardObj.content && !isEditing) {
      cards.postCard(cardObj)
        .then(() => {
          toggleOff();
          getCards();
        })
        .catch(err => {
          console.error('Error posting card', err);
        });
    } else if (cardObj.content && isEditing) {
      const {card} = this.props;
      cards.editCard(cardObj, card.id)
        .then(() => {
          toggleOff();
          getCards();
        })
        .catch(err => {
          console.error('Error editing card', err);
        });
    }
  }
  render () {
    const {card, isEditing} = this.props;
    if (card && isEditing) {
      return (
        <div className="CardForm col-sm-12">
          <div className="panel panel-primary">
            <div className="panel-body text-center">
              <form>
                <div className="form-group">
                  <textarea onChange={this.inputChange} className="form-control" placeholder="Enter card content..." value={this.state.cardContent || card.content} ></textarea>
                </div>
                <button onClick={this.postCard} type="submit" className="btn btn-default">
                  Edit Card
                </button>
              </form>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="CardForm col-sm-12">
          <div className="panel panel-primary">
            <div className="panel-body text-center">
              <form>
                <div className="form-group">
                  <textarea onChange={this.inputChange} className="form-control" placeholder="Enter card content..." value={this.state.cardContent} ></textarea>
                </div>
                <button onClick={this.postCard} type="submit" className="btn btn-default">
                  Add New Card
                </button>
              </form>
            </div>
          </div>
        </div>
      );

    }
  }
};

export default CardForm;
