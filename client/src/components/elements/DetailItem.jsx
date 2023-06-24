import { Component } from 'react'

import Form from 'react-bootstrap/Form'

import DetailModal from '../modals/DetailModal'

export default class DetailItem extends Component {
    state = {showDetailModal: false}

    render() {
        return (
            <>
                <Form.Check type='checkbox' label={
                    <>
                        <abbr>{this.props.detail.title}</abbr> <abbr className='link-info' onClick={async _ => {
                            this.setState({showDetailModal: true})
                        }}> E</abbr> <abbr className='link-danger' onClick={async _ => {
                            let details = this.props.plan.details
                            .filter(detail => detail._id !== this.props.detail._id)
                            let plan = {...this.props.plan, details}
                            await this.props.updatePlan('works', plan)
                        }}> R</abbr>
                    </>
                } defaultChecked={this.props.detail.completed} onChange={async _ => {
                    let details = this.props.plan.details
                    details.forEach(detail => {
                        (detail._id === this.props.detail._id) && 
                        (detail.completed = !(detail.completed))
                    })
                    let plan = {...this.props.plan, details}
                    await this.props.updatePlan('works', plan)
                }}/>
                <DetailModal defaultDetail={this.props.detail} plan={this.props.plan}
                show={this.state.showDetailModal} onHide={_ => this.setState({showDetailModal: false})}
                doneClick={this.props.updatePlan}/>
            </>
        )
    }
}