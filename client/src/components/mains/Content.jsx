import { Component } from 'react'

import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'

import Loading from '../elements/Loading'
import StickyTop from '../elements/StickyTop'
import ExpensesTab from '../tabs/ExpensesTab'
import RemindersTab from '../tabs/RemindersTab'
import TodaysTab from '../tabs/TodaysTab'
import WorksTab from '../tabs/WorksTab'

import plansRequests from '../../functions/requests/planRequests'
import { withRouter } from '../wrappers/withRouter'

export class Content extends Component {
    state = {
        works: [],
        reminders: [],
        expenses: [],
        error: null,
        loaded: false
    }
    setContentState = (values) => {
        this.setState({...values})
    }

    /*
    setData = async _ => {
        try {
            this.setState({ 
                error: null,
                loaded: '0/3'
            })
            const worksData = await (await fetch('http://localhost:4000/works')).json()
            this.setState({loaded: '1/3'})
            const remindersData = await (await fetch('http://localhost:4000/reminders')).json()
            this.setState({loaded: '2/3'})
            const expensesData = await (await fetch('http://localhost:4000/expenses')).json()
            this.setState({ 
                works: worksData,
                reminders: remindersData,
                expenses: expensesData,
                error: null,
                loaded: 'complete'
            })
        } catch (err) {
            this.setState({ 
                error: 'Can not fetch data!',
                loaded: 'complete'
            })
        }
    }
    appendData = async (forTab, data) => {
        try {
            const res = await fetch(`http://localhost:4000/${forTab}`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            this.setState({ error: null })
            return await res.json()
        } catch (error) {
            this.setState({ error: 'Can not fetch data!' })
            return false
        }
    }
    reformData = async (forTab, data) => {
        try {
            const res = await fetch(`http://localhost:4000/${forTab}/${data.id}`, {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            this.setState({ error: null })
            return await res.json()
        } catch (err) {
            this.setState({ error: 'Can not fetch data!' })
            return false
        }
    }
    removeData = async (forTab, id) => {
        try {
            const res = await fetch(`http://localhost:4000/${forTab}/${id}`, {
                method: 'DELETE'
            })
            this.setState({ error: null })
            return await res.json()
        } catch (err) {
            this.setState({ error: 'Can not fetch data!' })
            return false
        }
    }
    */
   
    addPlan = async (forTab, plan) => {
        const {data} = await plansRequests.appendData(forTab, plan, this.setContentState) // this.appendData(forTab, plan)
        data && this.setState(_ => ({
            [forTab]: [...data]
        }))
    }
    updatePlan = async (forTab, plan) => {
        const {data} = await plansRequests.reformData(forTab, plan, this.setContentState) // this.reformData(forTab, plan)
        data && this.setState(_ => ({
            [forTab]: [...data]
        }))
    }
    deletePlan = async (forTab, id) => {
        const {data} = await plansRequests.removeData(forTab, id, this.setContentState) // this.removeData(forTab, id)
        data && this.setState(_ => ({
            [forTab]: [...data]
        }))
    }

    componentDidMount() {
        plansRequests.setData(this.setContentState)
    }
    
    render() {
        if(this.state.loaded === 'complete') 
            return (
                <>
                    <StickyTop error={this.state.error} setData={this.setData} />
                    <Tabs defaultActiveKey='today' className='mb-2'>
                        <Tab eventKey='today' title='Today'>
                            <TodaysTab works={this.state.works} reminders={this.state.reminders}
                            expenses={this.state.expenses} addPlan={this.addPlan} 
                            updatePlan={this.updatePlan} deletePlan={this.deletePlan}/>
                        </Tab>
                        <Tab eventKey='works' title='Works'>
                            <WorksTab plans={this.state.works} addPlan={this.addPlan}
                            updatePlan={this.updatePlan} deletePlan={this.deletePlan} />
                        </Tab>
                        <Tab eventKey='reminders' title='Reminders'>
                            <RemindersTab plans={this.state.reminders} addPlan={this.addPlan}
                            updatePlan={this.updatePlan} deletePlan={this.deletePlan} />
                        </Tab>
                        <Tab eventKey='expenses' title='Expenses'>
                            <ExpensesTab plans={this.state.expenses} addPlan={this.addPlan}
                            updatePlan={this.updatePlan} deletePlan={this.deletePlan} />
                        </Tab>
                    </Tabs>
                </>
            )
        else 
            return (
                <>
                    <StickyTop error={this.state.error} setData={this.setData} />
                    <Loading progress={this.state.loaded}/>
                </>
            )
    }
}

export default withRouter(Content)