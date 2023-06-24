import { Component } from 'react'

import AboutModal from '../modals/AboutModal'

export default class Footer extends Component {
  state = {
    show: false
  }
  render() {
    return (
      <>
        <footer className='footer bg-primary text-white text-center rounded p-3 my-2'>
            <label onClick={_ => this.setState({show: true})}>
                © 2022 My Planner
            </label>
        </footer>
        <AboutModal show={this.state.show} onHide={_ => this.setState({show: false})}/>
      </>
    )
  }
}
