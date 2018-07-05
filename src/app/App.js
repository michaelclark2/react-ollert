import React from 'react';
import './App.css';
import firebase from 'firebase';
import connection from '../firebase/connection';
import Navbar from '../components/Navbar/Navbar';

class App extends React.Component {
  state = {
    username: '',
    user: null,
  }
  updateUser = (user) => {
    this.setState({user});
  }
  checkLogin () {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        // User is signed in.
        this.setState({
          user,
          username: user.displayName,
        });
      } else {
        // No user is signed in.
      }
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
      </div>
    );
  }
}

export default App;
