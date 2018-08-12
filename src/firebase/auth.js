import firebase from 'firebase';

const signIn = (user) => {
  return firebase.auth().signInWithEmailAndPassword(user.email, user.password);
};
const signInGoogle = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  return firebase.auth().signInWithPopup(provider);
}
const signOut = () => {
  return firebase.auth().signOut();
};
const registerUser = (user) => {
  return firebase.auth().createUserWithEmailAndPassword(user.email, user.password);
};
const getUid = () => {
  return firebase.auth().currentUser.uid;
};

export default {
  signIn,
  signOut,
  registerUser,
  getUid,
  signInGoogle,
};
