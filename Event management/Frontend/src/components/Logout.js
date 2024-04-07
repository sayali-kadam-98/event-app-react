import React, { Component } from 'react'
import Navbar from './Navibar'

export default class Logout extends Component {
    render() {
        localStorage.clear();
        return (
            <div>
                <Navbar />
                {this.props.history.push('/login')}
            </div>
        )
    }
}
