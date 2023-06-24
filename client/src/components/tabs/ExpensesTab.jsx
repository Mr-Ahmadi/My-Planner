import { Component } from 'react'

import AddBox from '../elements/AddBox'
import PlanBox from '../elements/PlanBox'

import expensesSum from '../../functions/expensesSum'

export default class ExpensesTab extends Component {
  render() {
    return (
      <>
        <div className='row m-0'>
        <h5><strong className='text-danger'>✬ </strong>All Expenses:</h5>
          {this.props.plans.map(plan => <PlanBox key={plan._id} 
          plan={plan} forTab='expenses' deletePlan={this.props.deletePlan}
          updatePlan={this.props.updatePlan} notify={false}/>)}
          <AddBox forTab='expenses' addPlan={this.props.addPlan}/>
          <h5 className='mt-2 mb-0'><strong className='text-warning'>✬ </strong>
          Total Expenses: ${expensesSum(this.props.plans)}</h5>
        </div>
      </>
    )
  }
}