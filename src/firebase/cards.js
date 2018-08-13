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

export default {getCards};
