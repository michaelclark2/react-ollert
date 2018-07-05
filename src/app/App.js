import React from 'react';
import './App.css';
import firebase from 'firebase';
import connection from '../firebase/connection';
import Navbar from '../components/Navbar/Navbar';
import Boards from '../components/Boards/Boards';
import {getBoards, postBoard} from '../firebase/boards';

class App extends React.Component {
  state = {
    username: '',
    user: null,
    boards: [],
  }
  updateUser = (user) => {
    this.setState({user});
  }
  checkLogin () {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        // User is signed in.
        getBoards(user.uid).then(boards => {
          this.setState({
            user,
            boards,
            username: user.displayName,
          });
        });

      } else {
        // No user is signed in.
      }
    });
  }
  postNewBoard = (boardObj) => {
    postBoard(boardObj).then(res => {
      const {user} = this.state;
      getBoards(user.uid).then(boards => {
        this.setState({
          user,
          boards,
          username: user.displayName,
        });
      }).catch(err => {
        console.error('Error posting board', err);
      });
    });
  }
  componentDidMount () {
    connection();
    this.checkLogin();
  }
  render () {
    return (
      <div className="App">
        <Navbar user={this.state.user} setUser={this.updateUser}/>
        <div className="row">
          <Boards user={this.state.user} boards={this.state.boards} postNewBoard={this.postNewBoard}/>
        </div>
      </div>
    );
  }
}

export default App;
