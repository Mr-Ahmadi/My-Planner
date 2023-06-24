import React, { Component } from 'react'

import {Link} from 'react-router-dom'
//import {withRouter} from '../wrappers/withRouter'

export default class NotFound extends Component {

  render() {
    return (
      <div className="p-5 text-dark">
          <h1>Page Not Found :(</h1>
          <small className="pb-4">You {this.props.auth ? <span className='text-success'>are</span> : <span className='text-danger'>aren't</span>} already authenicated</small>
          <h4 className="text-end pt-4">
              {this.props.auth ? <Link to='/'>Main Page</Link>
              : <Link to='/signin'>Login</Link>}
          </h4>
      </div>
    )
  }
}
