import React from 'react';
import firebase from 'firebase';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';
import './App.css';

import Navbar from '../components/Navbar/Navbar';
import Boards from '../components/Boards/Boards';
import Home from '../components/Home/Home';
import Login from '../components/Login/Login';
import Register from '../components/Register/Register';
import SingleBoard from '../components/SingleBoard/SingleBoard';

import connection from '../firebase/connection';
connection();

const PrivateRoute = ({component: Component, authed, ...rest}) => {
  return (
    <Route
      {...rest}
      render={props =>
        authed === true ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{pathname: '/login', state: {from: props.location}}}
          />
        )

      }
    />
  );
};
const PublicRoute = ({ component: Component, authed, ...rest}) => {
  return (
    <Route
      {...rest}
      render={props =>
        authed === false ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: '/boards', state: {from: props.location}}}
          />
        )
      }
    />
  );
};

class App extends React.Component {
  state = {
    isAuthed: false,
  }
  componentDidMount () {
    this.checkLogin = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        // User is signed in.
        this.setState({
          isAuthed: true,
        });
      } else {
        // No user is signed in.
      }
    });;
  }
  componentWillUnmount () {
    this.checkLogin();
  }
  render () {
    return (
      <div className="App">
        <Navbar isAuthed={this.state.isAuthed}/>
        <div className="container-fluid">
          <BrowserRouter>
            <Switch>
              <Route path='/' exact component={Home} />
              <PublicRoute path='/login' component={Login} authed={this.state.isAuthed} />
              <PublicRoute path='/register' component={Register} authed={this.state.isAuthed} />
              <PrivateRoute path='/boards' component={Boards} authed={this.state.isAuthed} />
              <PrivateRoute path='/board/:id' component={SingleBoard} authed={this.state.isAuthed} />
            </Switch>
          </BrowserRouter>
        </div>
      </div>
    );
  }
}

export default App;
