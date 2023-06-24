import { Component } from 'react'

import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Spinner from 'react-bootstrap/esm/Spinner'
import {editPassword} from '../../functions/requests/userRequests'

export default class EditPasswordModal extends Component {
    state = {
        requesting: false
    }

    setRequesting = value => this.setState({requesting: value})

    resetModal = _ => {
        this.props.onHide()
    }
    
    render() {
        return (
            <Modal show={this.props.show} onHide={this.resetModal}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Change Password
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className='mb-3'>
                        <Form.Label>Old password:</Form.Label>
                        <Form.Control type='password' id='oldPass' placeholder='Enter your current password'/>
                    </Form.Group>
                    <Form.Group className='mb-3'>
                        <Form.Label>New password:</Form.Label>
                        <Form.Control type="password" id='newPass' placeholder='Enter your current password'/>
                    </Form.Group>
                    <Form.Group className='mb-3'>
                        <Form.Label>Repeat New password:</Form.Label>
                        <Form.Control type="password" id='reNewPass' placeholder='Enter your current password'/>
                    </Form.Group>
                    <small id='status' className='text-danger'></small>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={this.resetModal}>
                        Close
                    </Button>
                    <Button variant='primary' disabled={this.state.requesting} onClick={async _ => {
                        editPassword(this.resetModal, this.setRequesting);
                    }}>
                        {this.state.requesting && <><Spinner animation="border" variant="light" size='sm'/></>} Done
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }
}