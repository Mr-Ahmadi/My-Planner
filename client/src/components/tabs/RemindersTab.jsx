import { Component } from 'react'

import AddBox from '../elements/AddBox'
import PlanBox from '../elements/PlanBox'

export default class RemindersTab extends Component {
  render() {
    return (
      <div className='row m-0'>
        <h5><strong className='text-danger'>✬ </strong>All Reminders:</h5>
        {this.props.plans.map(plan => <PlanBox key={plan._id} 
        plan={plan} forTab='reminders' deletePlan={this.props.deletePlan}
        updatePlan={this.props.updatePlan} notify={true}/>)}
        <AddBox forTab='reminders' addPlan={this.props.addPlan}/>
      </div>
    )
  }
}