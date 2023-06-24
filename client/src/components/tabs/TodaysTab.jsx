import { Component } from 'react'

import AddBox from '../elements/AddBox'
import PlanBox from '../elements/PlanBox'

export default class TodaysTab extends Component {
    render() {
        return (
            <>
                <div className='row m-0'>
                    <h5><strong className='text-danger'>✬ </strong>Today's Works:</h5>
                    {this.props.works.map(plan => 
                    (new Date(plan.date).toLocaleDateString() === new Date().toLocaleDateString())
                    && <PlanBox key={plan._id} plan={plan} forTab='works' notify={false}
                    deletePlan={this.props.deletePlan} updatePlan={this.props.updatePlan}/>)}
                    <AddBox forTab='works' addPlan={this.props.addPlan}/>
                </div>
                <div className='row m-0 mt-2'>
                    <h5><strong className='text-danger'>✬ </strong>Today's Reminders:</h5>
                    {this.props.reminders.map(plan => 
                    (new Date(plan.date).toLocaleDateString() === new Date().toLocaleDateString())
                    && <PlanBox key={plan._id} plan={plan} forTab='reminders' notify={false}
                    deletePlan={this.props.deletePlan} updatePlan={this.props.updatePlan}/>)}
                    <AddBox forTab='reminders' addPlan={this.props.addPlan}/>
                </div>
                <div className='row m-0 mt-2'>
                    <h5><strong className='text-danger'>✬ </strong>Today's Expenses:</h5>
                    {this.props.expenses.map(plan => 
                    (new Date(plan.date).toLocaleDateString() === new Date().toLocaleDateString())
                    && <PlanBox key={plan._id} plan={plan} forTab='expenses' notify={false}
                    deletePlan={this.props.deletePlan} updatePlan={this.props.updatePlan}/>)}
                    <AddBox forTab='expenses' addPlan={this.props.addPlan}/>
                </div>
            </>
        )
    }
}