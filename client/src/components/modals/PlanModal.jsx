import { Component } from 'react'

import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Alert from 'react-bootstrap/Alert'
import Spinner from 'react-bootstrap/Spinner'

export default class PlanModal extends Component {
    state = {
        notValidated: false,
        requesting: false
    }
    
    resetModal = _ => {
        this.setState({notValidated: false})
        this.props.onHide()
    }
    capitalizeFirstLetter = string => {
        return string.charAt(0)
        .toUpperCase() + string.slice(1)
    }
    checkValue = el => {
        if (el) {
            if (el.value) 
                return el.value
            else 
                return null
        } else {
            return false
        }
    }
    
    render() {
        return (
            <Modal show={this.props.show} onHide={this.resetModal}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {this.props.defaultPlan ? 'Edit from' : 'Add to'} {this.props.forTab}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {this.state.notValidated && <Alert>{this.state.notValidated} is not field!</Alert>}
                    <Form.Group className='mb-3'>
                        <Form.Label>Title:</Form.Label>
                        <Form.Control type='text' placeholder='Plan Title' id='title'
                        defaultValue={this.props.defaultPlan && this.props.defaultPlan.title}/>
                    </Form.Group>
                    <Form.Group className='mb-3'>
                        <Form.Label>Date:</Form.Label>
                        <Form.Control type="date" id='date' defaultValue={this.props.defaultPlan && this.props.defaultPlan.date}/>
                    </Form.Group>
                    {this.props.forTab === 'reminders' && 
                        <Form.Group className='mb-3'>
                            <Form.Label>Time:</Form.Label>
                            <Form.Control type='Time' id='time' defaultValue={this.props.defaultPlan && this.props.defaultPlan.time}/>
                        </Form.Group>
                    }
                    {this.props.forTab === 'expenses' && 
                        <Form.Group className='mb-3'>
                            <Form.Label>Amount:</Form.Label>
                            <div className="input-group">
                                <span className="input-group-text">$</span>
                                <Form.Control type='number' placeholder='Amount Of Expense' id='amount'
                                defaultValue={this.props.defaultPlan && this.props.defaultPlan.amount}/>
                            </div>
                        </Form.Group>
                    }
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={this.resetModal}>
                        Close
                    </Button>
                    <Button variant='primary' disabled={this.state.requesting} onClick={async _ => {
                        this.setState({requesting: true})
                        const title = this.checkValue(document.getElementById('title'))
                        const date = this.checkValue(document.getElementById('date'))
                        const time = this.checkValue(document.getElementById('time'))
                        const amount = this.checkValue(document.getElementById('amount'))
                        let plan = this.props.defaultPlan 
                        ? {...this.props.defaultPlan ,title, date, time, amount} 
                        : {title, date, time, amount}
                        Object.keys(plan).forEach((k) => plan[k] === false && delete plan[k])
                        for (const attribute in plan) {
                            if (plan[attribute] === null) {
                                this.setState({
                                    notValidated: this.capitalizeFirstLetter(attribute),
                                    requesting: false
                                })
                                return
                            }
                        }
                        await this.props.doneClick(this.props.forTab, plan)
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