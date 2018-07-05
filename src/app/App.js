import React from 'react';
import './App.css';
import connection from '../firebase/connection';
import Navbar from '../components/Navbar/Navbar';

class App extends React.Component {
  componentDidMount () {
    connection();
  }
  render () {
    return (
      <div className="App">
        <Navbar />
      </div>
    );
  }
}

export default App;
