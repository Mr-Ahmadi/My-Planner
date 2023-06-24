import { Component } from 'react'

import Spinner from 'react-bootstrap/Spinner'

export default class Loading extends Component {
  render() {
    return (
      <div className="text-center my-5 py-4">
        <Spinner animation="border" variant="primary" />
        <h5 className='text-primary mt-2'>{this.props.progress}</h5>
      </div>
    )
  }
}