import React, { Component } from 'react'

import {Link} from 'react-router-dom'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/esm/Spinner'

import checkUser from '../../functions/validators/checkUser'
import {signUp} from '../../functions/requests/userRequests'
import {withRouter} from '../wrappers/withRouter'

export class SignUp extends Component {
  
  state = {
    //to check button is pressed or not
    requesting: false
  }

  setRequesting = value => this.setState({requesting: value})

  render() {
    return (
      <div className='col-12 col-md-6 col-lg-5 my-2 my-md-3 my-lg-4 mx-auto rounded border'>
        <Form className='p-3'>
          <h3 className='text-center'>Sign Up</h3>
          <hr className='my-1'/>
          <Form.Group className='mb-2'>
            <Form.Label>Name:</Form.Label>
            <Form.Control type='text' placeholder='Your name' id='name' size='sm'/>
          </Form.Group>
          <Form.Group className='mb-2'>
            <Form.Label>Email:</Form.Label>
            <Form.Control type='text' placeholder='Your email' id='email' size='sm'/>
          </Form.Group>
          <Form.Group className='mb-2'>
            <Form.Label>Password:</Form.Label>
            <Form.Control type='password' placeholder='Your password' id='password' size='sm'/>
          </Form.Group>
          <Form.Group className='mb-2'>
            <Form.Label>Repeat Password:</Form.Label>
            <Form.Control type='password' placeholder='Repeat Your password' id='rePassword' size='sm'/>
          </Form.Group>
          <small id='status' className='text-success'>
            {
              (this.props.location.state && this.props.location.state.navigateMessage) 
                && this.props.location.state.navigateMessage
            }
          </small>
          <hr className='my-3'/> 
          <Form.Group className='text-end'>
            <small className='float-start'>
              <Link to='/signin'>Already have</Link>
            </small>
            <Button className='ms-2' size='sm' onClick={_ => {
              //resetForm()
            }}>Reset</Button>
            <Button className='ms-2' size='sm' disabled={this.state.requesting} onClick={_ => {
              const user = checkUser(this.setRequesting)
              if (user) {
                signUp(user, this.props.navigate, this.setRequesting)
              }
            }}>
              {this.state.requesting && <><Spinner animation="border" variant="light" size='sm'/></>} Sign Up
            </Button>
          </Form.Group>
        </Form>
      </div>
    )
  }
}

export default withRouter(SignUp)