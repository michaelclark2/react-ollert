import constants from '../constants';
import axios from 'axios';

const getBoards = (uid) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${constants.firebaseConfig.databaseURL}/boards.json/?orderBy="ownerId"&equalTo="${uid}"`)
      .then(res => {
        res = res.data;
        const boards = [];
        Object.keys(res).forEach(key => {
          res[key].id = key;
          boards.push(res[key]);
        });
        resolve(boards);
      })
      .catch(err => {
        reject(err);
      });
  });
};
export {getBoards};
