import React, { Component } from 'react'

export default class PlanStatus extends Component {
    state = {secondsLeft: null}

    checkPassed() {
        this.intervalID = setInterval(_ => { 
            let secondsLeft = this.props.plan.hasOwnProperty('time') 
            ? Math.round((new Date(`${this.props.plan.date} ${this.props.plan.time}`) - new Date()) / 1000) 
            : Math.round((new Date(`${this.props.plan.date}`) - new Date() + 86400000) / 1000) 
            if (secondsLeft >= 0) {
                ((secondsLeft === 0) && this.props.notify) && this.notify(this.props.plan)
                this.setState({secondsLeft: secondsLeft})
            } else {
                this.setState({secondsLeft: secondsLeft})
                clearInterval(this.intervalID)
            }
        }, 1000)
    }
    divideSecs(secs) {
        const mins = (secs - (secs % 60)) / 60
        const hours = (mins - (mins % 60)) / 60
        const days = (hours - (hours % 24)) / 24
        return `${days}:${hours % 24}:${mins % 60}:${secs % 60}`
    }
    notify = plan => {
        Notification.requestPermission(permission => {
            if(permission === 'granted') {
                new Notification(plan.title, {
                body: `At: ${plan.date} ${plan.time}`,
                    icon: './favicon.ico'
                })
            }
        })
    }

    shouldComponentUpdate(prevProps, prevState) {
        if (prevProps.plan.date !== this.props.plan.date
        || prevProps.plan.time !== this.props.plan.time
        || prevState.secondsLeft !== this.state.secondsLeft) {
            return true
        } else {
            return false
        }
    }
    componentDidMount() {
        this.checkPassed()
    }
    componentDidUpdate(prevProps) {
        if (prevProps.plan !== this.props.plan) {
            clearInterval(this.intervalID)
            this.setState({secondsLeft: null})
            this.checkPassed()
        }
    }
    componentWillUnmount() {
        clearInterval(this.intervalID)
    }

    render() {
        return (
            <>
                {this.state.secondsLeft === null && <small className='text-warning'> Callculating...</small>}
                {(this.state.secondsLeft >= 0 && this.state.secondsLeft !== null) && <small className='text-info'>{` (${this.divideSecs(this.state.secondsLeft)})`}</small>}
                {(!(this.state.secondsLeft >= 0)) && <small className='text-danger'> (Passed)</small>}  
            </>
        )
    }
}
