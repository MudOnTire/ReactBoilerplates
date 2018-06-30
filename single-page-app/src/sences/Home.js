import React, { Component } from 'react';
import logo from '../images/logo.svg';
import Button from '../components/Button';

class Dashboard extends Component {
  handleClick = () => {
    import('../components/ActionHandler')
      .then(({ handleClick }) => {
        handleClick();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
                </p>
        <Button onClick={this.handleClick} title='Click Me' />
      </div>
    )
  }
}

export default Dashboard;