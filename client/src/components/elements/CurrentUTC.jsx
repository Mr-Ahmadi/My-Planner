import React, { Component } from 'react'

export default class CurrentUTC extends Component {
    state = {
        UTC: new Date().toUTCString()
    }

    componentDidMount(){
        setInterval(_ => this.setState({UTC: new Date().toUTCString()}), 1000)
    }

    render() {
        return (
        <>
            {this.state.UTC}
        </>
        )
    }
}
