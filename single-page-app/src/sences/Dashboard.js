import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Tacos from './Tacos';

class Dashboard extends Component {

    buttonClick = () => {
        alert('clicked');
    }

    render() {
        return (
            <div>
                <h3>
                    This is dashboard
                </h3>
                <button onClick={this.buttonClick}>Click Me</button>
                <Route
                    path={this.props.match.url + '/tacos'}
                    component={Tacos}
                />
            </div>
        )
    }
}

export default Dashboard;