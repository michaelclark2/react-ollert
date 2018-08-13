import React from 'react';
import {NavLink, Link} from 'react-router-dom';
import './Navbar.css';
import auth from '../../firebase/auth';

class Navbar extends React.Component {
  logout = (e) => {
    auth.signOut().then(() => {
      this.props.logOff();
    });
  }
  render () {
    const {isAuthed} = this.props;
    return (
      <nav className='navbar navbar-inverse navbar-static-top'>
        <div className='container-fluid'>
          <div className='navbar-header'>
            <Link to="/" className="navbar-brand">Ollert</Link>
          </div>
          {
            isAuthed ? (
              <ul className="nav navbar-nav">
                <li>
                  <NavLink to="/boards">My Boards</NavLink>
                </li>
                <li>
                  <button onClick={this.logout} className='btn btn-default navbar-btn'>Log Out</button>
                </li>
              </ul>
            ) : (
              <Link to="/login" className='btn btn-default navbar-btn'>Log In</Link>
            )
          }
        </div>
      </nav>
    );
  }
}
export default Navbar;
