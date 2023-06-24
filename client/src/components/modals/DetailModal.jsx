import { Component } from 'react'

import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Alert from 'react-bootstrap/Alert'
import Spinner from 'react-bootstrap/Spinner'


export default class DetailModal extends Component {
    state = {
        requesting: false,
        notValidated: false
    }

    resetModal = _ => {
        this.setState({notValidated: false})
        this.props.onHide()
    }
    
    render() {
        return (
            <Modal show={this.props.show} onHide={this.resetModal}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {this.props.defaultDetail ? <>Edit detail from</> : <>Add detail to</>} {this.props.plan.title}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {this.state.notValidated && <Alert>{this.state.notValidated} is not field!</Alert>}
                    <Form.Group className='mb-3'>
                        <Form.Label>Title:</Form.Label>
                        <Form.Control type='text' placeholder='Detail Title' id='title' 
                        defaultValue={this.props.defaultDetail && this.props.defaultDetail.title}/>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={this.resetModal}>
                        Close
                    </Button>
                    <Button variant='primary' disabled={this.state.requesting} onClick={async _ => { 
                        this.setState({requesting: true})
                        const title = document.getElementById('title').value
                        let details
                        (this.props.defaultDetail)
                            ?(details = this.props.plan.details.map(detail => detail._id === this.props.defaultDetail._id 
                                ? {...detail, title} : detail))
                            :((this.props.plan.details)
                                ? details = [...this.props.plan.details, {title, completed: false}]
                                : details = [{title, completed: false}])
                        let plan = {...this.props.plan, details}
                        console.log(plan)
                        if (!title) {
                            this.setState({
                                notValidated: 'Title'
                            })
                            this.setState({requesting: false})
                            return
                        }
                        await this.props.doneClick('works', plan)
                        this.setState({requesting: false})
                        this.resetModal()
                    }}>
                        {this.state.requesting && <><Spinner animation="border" variant="light" size='sm'/></>} Done
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }
}