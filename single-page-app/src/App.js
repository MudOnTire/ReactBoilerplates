import React, { Component } from 'react';
import './styles/App.css';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { Link, Route } from 'react-router-dom';
import Home from './sences/Home';
import Dashboard from './sences/Dashboard';

class App extends Component {

  render() {
    return (
      <div className="App">
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/home">React SPA</Link>
            </Navbar.Brand>
          </Navbar.Header>
          <Nav>
            <NavItem eventKey={1} href="#">
              <Link to="/dashboard">Dashboard</Link>
            </NavItem>
          </Nav>
        </Navbar>
        <div>
          <Route path="/home" component={Home} />
          <Route path="/dashboard" component={Dashboard} />
        </div>
      </div>
    );
  }
}

export default App;
