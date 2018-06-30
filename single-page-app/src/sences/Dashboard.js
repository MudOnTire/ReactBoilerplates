import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import Tacos from './Tacos';

class Dashboard extends Component {
    render() {
        return (
            <div>
                <h3>
                    This is dashboard
                </h3>
                <Route
                    path={this.props.match.url + '/tacos'}
                    component={Tacos}
                />
            </div>
        )
    }
}

export default Dashboard;