import { Component } from 'react'
import Button from 'react-bootstrap/Button'
import PlanModal from '../modals/PlanModal'

export default class AddBox extends Component {
  state = {
    showPlanModal: false,
  }
  
  render() {
    return (
      <>
        <div className='d-table p-4 col-12 col-md-6 col-lg-4 border rounded bg-light text-muted' onClick={_ => this.setState({showPlanModal: true})}>
          <h5>Add to {this.props.forTab}</h5>
          <div className='mb-3'>Click to add a plan <br/>to {this.props.forTab} for future</div>
          <div className='text-end'>
            <Button disabled variant='secondary' size='sm'>Comming Soon</Button>
          </div>
        </div>
        <PlanModal forTab={this.props.forTab} show={this.state.showPlanModal} onHide={_ => this.setState({showPlanModal: false})} doneClick={this.props.addPlan}/>
      </>
    )
  }
}