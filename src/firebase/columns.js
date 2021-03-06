import constants from '../constants';
import axios from 'axios';

const getColumns = (boardId) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${constants.firebaseConfig.databaseURL}/columns.json/?orderBy="boardId"&equalTo="${boardId}"`)
      .then(res => {
        const columns = [];
        Object.keys(res.data).forEach(key => {
          res.data[key].id = key;
          columns.push(res.data[key]);
        });
        resolve(columns);
      })
      .catch(err => {
        reject(err);
      });
  });
};
const postColumn = (colObj) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${constants.firebaseConfig.databaseURL}/columns.json`, colObj)
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
};
const deleteColumn = (colId) => {
  return new Promise((resolve, reject) => {
    axios
      .delete(`${constants.firebaseConfig.databaseURL}/columns/${colId}.json`)
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
};
export {getColumns, postColumn, deleteColumn};
