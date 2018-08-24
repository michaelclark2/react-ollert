import React from 'react';
import './Home.css';

class Home extends React.Component {
  render () {
    return (
      <div className="Home">
        <h1 className="page-header text-center">Welcome to Ollert!<br/>
          <small>
            It's Trello, but reverse-engineered and not as useful!
          </small>
        </h1>
        <div className="home-container">
          <figure>
            <img src="https://pbs.twimg.com/profile_images/558768949220081664/ivEt-WKY_400x400.jpeg" alt="Burrito"/>
            <figcaption>Meet Burrito, the mascot doge.</figcaption>
          </figure>
          <ul className="features">
            <li>Register an account!</li>
            <li>Create boards!</li>
            <li>Create columns!</li>
            <li>Create cards!</li>
            <li>Drag and Drop!</li>
          </ul>
        </div>
        <footer>
          Created using React, Bootstrap, and Firebase
        </footer>
      </div>
    );
  }
};

export default Home;
