import axios from 'axios';
import constants from '../constants';

const getUsers = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${constants.firebaseConfig.databaseURL}/users.json`)
      .then(res => {
        const data = res.data;
        const users = [];
        if (data !== null) {
          Object.keys(data).forEach(key => {
            data[key].id = key;
            users.push(data[key]);
          });
        }
        resolve(users);
      })
      .catch(err => {
        reject(err);
      });
  });
};
const postUser = (user) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${constants.firebaseConfig.databaseURL}/users.json`, user)
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
};
const getUserName = (uid) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${constants.firebaseConfig.databaseURL}/users.json?orderBy="uid"&equalTo="${uid}"`)
      .then(res => {
        const data = res.data[Object.keys(res.data)[0]];
        resolve(data.displayName);
      })
      .catch(err => {
        reject(err);
      });
  });
};

export default {getUsers, postUser, getUserName};
