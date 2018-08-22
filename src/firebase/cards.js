import axios from 'axios';
import constants from '../constants';

const getCards = (colId) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${constants.firebaseConfig.databaseURL}/cards.json?orderBy="columnId"&equalTo="${colId}"`)
      .then(res => {
        const data = res.data;
        const cards = [];
        if (data !== null) {
          Object.keys(data).forEach(key => {
            data[key].id = key;
            cards.push(data[key]);
          });
        }
        resolve(cards);
      })
      .catch(err => {
        reject(err);
      });
  });
};
const postCard = (cardObj) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${constants.firebaseConfig.databaseURL}/cards.json`, cardObj)
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        console.error(err);
      });
  });
};
const editCard = (cardObj, cardId, newColumnId) => {
  cardObj.columnId = newColumnId;
  delete cardObj.id;
  return new Promise((resolve, reject) => {
    axios
      .put(`${constants.firebaseConfig.databaseURL}/cards/${cardId}.json`, cardObj)
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
};
const deleteCard = (cardId) => {
  return new Promise((resolve, reject) => {
    axios
      .delete(`${constants.firebaseConfig.databaseURL}/cards/${cardId}.json`)
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
};

export default {getCards, postCard, editCard, deleteCard};
