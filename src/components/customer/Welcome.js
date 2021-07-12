import React, { Component } from 'react';

class Welcome extends Component {
    render() {
        return (
            <div>
                <h1>Welcome to e-bug tracker</h1>
                <h1>  {this.props.location.state.data}</h1>
            </div>
        );
    }
}

export default Welcome;