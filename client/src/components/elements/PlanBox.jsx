import { Component } from 'react'
import Button from 'react-bootstrap/Button'
import PlanModal from '../modals/PlanModal'
import ViewModal from '../modals/ViewModal'
import PlanStatus from './PlanStatus'

import detailsProgress from '../../functions/detailsProgress'

export default class PlanBox extends Component {
    state = {
        showEditModal: false,
        showViewModal: false
    }

    shouldComponentUpdate(prevProps, prevState) {
        if (prevProps.plan !== this.props.plan 
        || prevState.showEditModal !== this.state.showEditModal 
        || prevState.showViewModal !== this.state.showViewModal) {
            return true
        } else {
            return false
        }
    }

    render() {
        return (
            <>
                <div className='p-4 col-12 col-md-6 col-lg-4 border rounded'>
                    <h5>
                        {this.props.plan.title}
                        <PlanStatus plan={this.props.plan} notify={this.props.notify}/>
                    </h5>
                    <div className='mb-3'>
                        Date: {this.props.plan.date}
                        {this.props.forTab === 'reminders' && <><br/>Time: {this.props.plan.time}</>}
                        {this.props.forTab === 'expenses' && <><br/>Amount: ${this.props.plan.amount}</>}
                        {this.props.forTab === 'works' && 
                            <>
                                <br/>Details:
                                {(this.props.plan.details && this.props.plan.details.length !== 0)
                                ? 
                                <>
                                    {` %${Math.round(detailsProgress(this.props.plan.details))} complete`}
                                </>
                                : <> No Details</>}
                            </>
                        }
                    </div>
                    <div className='text-end'>
                        <Button size='sm' className='me-1' variant='primary' onClick={_ => {
                            this.props.deletePlan(this.props.forTab, this.props.plan._id)
                        }}>Remove</Button>
                        <Button size='sm' className='me-1' variant='primary' onClick={_ => this.setState({showEditModal: true})}>Edit</Button>
                        <Button size='sm' className='me-1' variant='primary' onClick={_ => this.setState({showViewModal: true})}>View</Button>
                    </div>
                </div>
                <PlanModal forTab={this.props.forTab} defaultPlan={this.props.plan} show={this.state.showEditModal}
                onHide={_ => this.setState({showEditModal: false})} doneClick={this.props.updatePlan}/>
                <ViewModal forTab={this.props.forTab} show={this.state.showViewModal} onHide={_ => this.setState({showViewModal: false})}
                plan={this.props.plan} updatePlan={this.props.updatePlan}/>
            </>
        )
    }
}