import { Component } from 'react'

import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import ProgressBar from 'react-bootstrap/ProgressBar'

import AddDetailItem from '../elements/AddDetailItem'
import DescriptionArea from '../elements/DescriptionArea'
import DetailItem from '../elements/DetailItem'
import DetailModal from './DetailModal'
import PlanStatus from '../elements/PlanStatus'

import detailsProgress from '../../functions/detailsProgress'

export default class ViewModal extends Component {
    state = {showDetailModal: false}

    resetModal = _ => this.props.onHide()

    render() {
        return (
            <>
                <Modal show={this.props.show} onHide={this.resetModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            {this.props.plan.title} <PlanStatus plan={this.props.plan}/>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Date: {this.props.plan.date}
                        {this.props.forTab === 'reminders' && <><br/>Time: {this.props.plan.time}</>}
                        {this.props.forTab === 'expenses' && <><br/>Amount: ${this.props.plan.amount}</>}
                        {this.props.forTab === 'works'
                        ? 
                            <>
                                <br/>Details:
                                {(this.props.plan.details && this.props.plan.details.length !== 0)
                                ? 
                                    <div className='px-2'>
                                        {this.props.plan.details.map(detail => <DetailItem key={detail._id} detail={detail} plan={this.props.plan} updatePlan={this.props.updatePlan}/>)}
                                        <AddDetailItem onClick={_ => this.setState({showDetailModal: true})}/>
                                        <ProgressBar striped variant="info" now={detailsProgress(this.props.plan.details)} />
                                    </div>
                                : 
                                    <> No Details
                                        <div className='ps-2'>
                                            <AddDetailItem onClick={_ => this.setState({showDetailModal: true})}/>
                                        </div>
                                    </>
                                }

                            </>  
                        :
                            <><br/>Description: <div className='px-1'><DescriptionArea plan={this.props.plan} forTab={this.props.forTab} updatePlan={this.props.updatePlan}/></div></>
                        }         
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant='secondary' onClick={this.resetModal}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
                {this.props.forTab === 'works' && <DetailModal plan={this.props.plan} show={this.state.showDetailModal}
                onHide={_ => this.setState({showDetailModal: false})} doneClick={this.props.updatePlan}/>}
            </>
        )
    }
}