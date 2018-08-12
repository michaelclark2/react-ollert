import React from 'react';
import './Navbar.css';
import firebase from 'firebase';

class Navbar extends React.Component {
  login = (e) => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
      .then(res => {
      });
  }
  logout = (e) => {
    firebase.auth().signOut();
  }
  render () {
    const {isAuthed} = this.props;
    return (
      <nav className='navbar navbar-inverse navbar-static-top'>
        <div className='container-fluid'>
          <div className='navbar-header'>
            <span className="navbar-brand">Ollert</span>
          </div>
          <ul className="nav navbar-nav">
            <li>{isAuthed ? <button onClick={this.logout} className='btn btn-default navbar-btn'>Log Out</button> : <button onClick={this.login} className='btn btn-default navbar-btn'>Log In</button>}</li>
          </ul>

        </div>
      </nav>
    );
  }
}
export default Navbar;
