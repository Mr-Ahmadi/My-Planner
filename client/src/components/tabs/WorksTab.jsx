import { Component } from 'react'

import AddBox from '../elements/AddBox'
import PlanBox from '../elements/PlanBox'

export default class WorksTab extends Component {
  render() {
    return (
      <div className='row m-0'>
        <h5><strong className='text-danger'>✬ </strong>All Works:</h5>
        {this.props.plans.map(plan => <PlanBox key={plan._id} 
        plan={plan} forTab='works' deletePlan={this.props.deletePlan}
        updatePlan={this.props.updatePlan} notify={false}/>)}
        <AddBox forTab='works' addPlan={this.props.addPlan}/>
      </div>
    )
  }
}