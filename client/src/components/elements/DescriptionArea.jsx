import { Component } from 'react'

export default class DescriptionArea extends Component {
  state = {descriptionChanged: false}
  
  render() {
    return (
      <>
        <textarea className='form-control' onChange={e => (e.target.value !== this.props.plan.description) 
        ? this.setState({descriptionChanged: true}) : this.setState({descriptionChanged: false})} id='description'
        defaultValue={this.props.plan.description && this.props.plan.description}></textarea>
        {this.state.descriptionChanged && <div className='text-end text-end m-1'>
          <small className='link-danger' onClick={async e => {
            const description = document.getElementById('description').value
            let plan = {...this.props.plan, description}
            await this.props.updatePlan(this.props.forTab, plan)
            this.setState({descriptionChanged: false})
          }}>
            Save changes...
          </small>
        </div>}
      </>
    )
  }
}