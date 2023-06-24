import { Component } from 'react'

import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

export default class AboutModal extends Component {
    resetModal = _ => this.props.onHide()
    render() {
        return (
            <Modal show={this.props.show} onHide={this.resetModal}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        About My Planner
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <strong>My Planner</strong> is created for you for managing your daily activities and not forgetting something important while doing your works.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={this.resetModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }
}