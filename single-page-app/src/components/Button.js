import React, { Component } from 'react';
import '../styles/Button.css';

class Button extends Component {
    render() {
        return (
            <button onClick={this.props.onClick} className="Button">
                {this.props.title}
            </button>
        )
    }
}

export default Button;