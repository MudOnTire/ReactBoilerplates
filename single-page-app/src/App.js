import React, { Component } from 'react';
import './styles/App.css';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { Link, Route, Switch, NavLink } from 'react-router-dom';
import Home from './sences/Home';
import Dashboard from './sences/Dashboard';
import NotFound from './sences/404';

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
              {/* <Link to="/dashboard">Dashboard</Link> */}
              <NavLink to="/dashboard" activeClassName="active">Dashboard</NavLink>
            </NavItem>
          </Nav>
        </Navbar>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/dashboard" component={Dashboard} />
          <Route component={NotFound} />
        </Switch>
      </div>
    );
  }
}

export default App;
