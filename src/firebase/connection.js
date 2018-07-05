import firebase from 'firebase';
import constants from '../../src/constants';

const connection = () => {
  firebase.initializeApp(constants.firebaseConfig);
};

export default connection;
