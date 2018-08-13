import React from 'react';
import {Link} from 'react-router-dom';
import './Login.css';
import auth from '../../firebase/auth';

class Login extends React.Component {
  state = {
    isError: false,
    errorMsg: '',
    user: {
      email: '',
      password: '',
    },
  }
  onSignInClick = (e) => {
    e.preventDefault();
    const {user} = this.state;
    auth
      .signIn(user)
      .then(user => {
        this.props.history.push('/boards');
      })
      .catch(err => {
        this.setState({isError: true, errorMsg: err.message});
        console.error('There was an error logging in', err);
      });
  }
  signInGoogle = (e) => {
    e.preventDefault();
    auth.signInGoogle()
      .then(() => {
        this.props.history.push('/boards');
      });
  }
  onInputChange = (e) => {
    const {user} = {...this.state};
    user[e.target.type] = e.target.value;
    this.setState({user});
  }
  render () {
    return (
      <div className="Login container">
        <div className="col-md-6 col-md-offset-3">
          <div className="panel panel-primary text-center">
            <div className="panel-body">
              <h1>Login</h1>
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
                      onChange={this.onInputChange}
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
                      onChange={this.onInputChange}
                      value={this.state.user.password}
                      type="password"
                      className="form-control text-center"
                      placeholder="Password"
                    />
                  </div>
                </div>
                <div className="form-group">
                  <div className="col-sm-12">
                    <div className="col-sm-6">
                      <button
                        onClick={this.onSignInClick}
                        type="submit"
                        className="btn btn-default">
                        Sign in
                      </button>
                    </div>
                    <div className="col-sm-6">
                      <button
                        onClick={this.signInGoogle}
                        type="submit"
                        className="btn btn-default">
                        Sign in with Google
                      </button>
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <div className="col-sm-12">
                    <Link to="/register">Don't have an account?</Link>
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

export default Login;
