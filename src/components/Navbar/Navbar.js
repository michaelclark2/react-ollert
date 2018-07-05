import React from 'react';
import './Navbar.css';

class Navbar extends React.Component {
  render () {
    return (
      <nav className='navbar navbar-inverse navbar-static-top'>
        <div className='container-fluid'>
          <div className='navbar-header'>
            <span className="navbar-brand">Ollert</span>
          </div>
        </div>
      </nav>
    );
  }
}
export default Navbar;
