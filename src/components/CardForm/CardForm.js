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
  addCard = (e) => {
    e.preventDefault();
    const {toggleOff, getCards, columnId} = this.props;
    const cardObj = {
      columnId,
      userId: auth.getUid(),
      assignee: auth.getUid(),
      content: this.state.cardContent,
    };
    if (cardObj.content) {
      cards.postCard(cardObj)
        .then(() => {
          toggleOff();
          getCards();
        })
        .catch(err => {
          console.error('Error posting card', err);
        });
    }
  }
  render () {
    return (
      <div className="CardForm col-sm-12">
        <div className="panel panel-primary">
          <div className="panel-body text-center">
            <form>
              <div className="form-group">
                <textarea onChange={this.inputChange} className="form-control" placeholder="Enter card content..." value={this.state.cardContent} ></textarea>
              </div>
              <button onClick={this.addCard} type="submit" className="btn btn-default">
                Add New Card
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
};

export default CardForm;
