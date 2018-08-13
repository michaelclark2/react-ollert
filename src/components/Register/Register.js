import React from 'react';
import {Link} from 'react-router-dom';
import './Register.css';

import users from '../../firebase/users';
import auth from '../../firebase/auth';

class Register extends React.Component {
  state = {
    isError: false,
    errorMsg: '',
    user: {
      email: '',
      username: '',
      password: '',
    },
  }
  onEmail = (e) => {
    const {user} = {...this.state};
    user.email = e.target.value;
    this.setState({user});
  }
  onUserName = (e) => {
    const {user} = {...this.state};
    user.username = e.target.value;
    this.setState({user});
  }
  onPassword = (e) => {
    const {user} = {...this.state};
    user.password = e.target.value;
    this.setState({user});
  }
  onRegisterClick = (e) => {
    e.preventDefault();
    const {user} = this.state;
    // Get all users to check for unique user
    users.getUsers()
      .then(allUsers => {
        const uniqueUsername = allUsers.filter(x => x.username === user.username);
        if (uniqueUsername.length === 0) {
          auth.registerUser(user)
            .then(res => {
              const userObj = {
                displayName: user.username,
                uid: auth.getUid(),
              };
              // Post user to collection
              users
                .postUser(userObj)
                .then(() => {
                  this.props.history.push('/bills');
                })
                .catch(err => {
                  console.error('Error posting user data', err);
                });
            })
            .catch(err => {
              // end registerUser
              this.setState({isError: true, errorMsg: err.message});
            });
        }
        else {
          // If username is not unique, throw error
          throw new Error();
        }
      })
      .catch(err => {
        // end getUsers
        this.setState({isError: true, errorMsg: 'The username "' + user.username + '" is taken.  Please try another'});
      });
  }
  render () {
    return (
      <div className="Register container">
        <div className="col-md-6 col-md-offset-3">
          <div className="panel panel-primary text-center">
            <div className="panel-body">
              <h1>Register</h1>
              {
                this.state.isError ? (
                  <div className="alert alert-danger">
                    {this.state.errorMsg}
                  </div>
                ) : (
                  ''
                )
              }
              <form className="form-horizontal">
                <div className="form-group">
                  <div className="col-sm-12">
                    <input
                      onChange={this.onEmail}
                      value={this.state.user.email}
                      type="email"
                      className="form-control text-center"
                      placeholder="Email"
                    />
                  </div>
                </div>
                <div className="form-group">
                  <div className="col-sm-12">
                    <input
                      onChange={this.onUserName}
                      value={this.state.user.username}
                      type="text"
                      className="form-control text-center"
                      placeholder="Name"
                    />
                  </div>
                </div>
                <div className="form-group">
                  <div className="col-sm-12">
                    <input
                      onChange={this.onPassword}
                      value={this.state.user.password}
                      type="password"
                      className="form-control text-center"
                      placeholder="Password"
                    />
                  </div>
                </div>
                <div className="form-group">
                  <div className="col-sm-12">
                    <button
                      onClick={this.onRegisterClick}
                      type="submit"
                      className="btn btn-default">
                      Create Account
                    </button>
                  </div>
                </div>
                <div className="form-group">
                  <div className="col-sm-12">
                    <Link to='/login'>
                      Already have an account?
                    </Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Register;
