import React, { Component } from 'react';

class NotFound extends Component {
    render() {

        console.log(this.props);

        return (
            <div>
                <h3>
                    {`${this.props.location.pathname} not found!!!`}
                </h3>
            </div>
        )
    }
}

export default NotFound;