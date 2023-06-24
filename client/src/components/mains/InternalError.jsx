import React, { Component } from 'react'

//import {withRouter} from '../wrappers/withRouter'

export default class NotFound extends Component {

  render() {
    return (
      <div className="p-5 text-dark">
        <h1>Internal Error :(</h1>
          <small className="pb-4">Can <span className='text-danger'>not</span> connect server</small>
          <h4 className="text-end pt-4">
          <u onClick={_ => this.props.checkAuth()} className='link-primary'>Retry</u>
        </h4>
      </div>
    )
  }
}
