import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './sences/Home';
import Dashboard from './sences/Dashboard';
import NotFound from './sences/404';

export default class extends Component {
    render() {
        return (
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/dashboard" component={Dashboard} />
                <Route component={NotFound} />
            </Switch>
        );
    }
}