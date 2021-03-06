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
const postBoard = (boardObj) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${constants.firebaseConfig.databaseURL}/boards.json`, boardObj)
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
};
const deleteBoard = (boardId) => {
  return new Promise((resolve, reject) => {
    axios
      .delete(`${constants.firebaseConfig.databaseURL}/boards/${boardId}.json`)
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
};
export {getBoards, postBoard, deleteBoard};
