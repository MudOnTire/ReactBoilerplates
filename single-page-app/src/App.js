import React, { Component } from 'react';
import './styles/App.css';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { Link, Route, Switch } from 'react-router-dom';
import Routes from '../src/routes';

class App extends Component {
  
  render() {
    return (
      <div className="App">
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/">React SPA</Link>
            </Navbar.Brand>
          </Navbar.Header>
          <Nav>
            <NavItem eventKey={1} href="#">
              <Link to="/dashboard">Dashboard</Link>
            </NavItem>
          </Nav>
        </Navbar>
        <Routes />
      </div>
    );
  }
}

export default App;
