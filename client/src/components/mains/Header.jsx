import {Component} from 'react'
import {signOut, deleteAccount} from '../../functions/requests/userRequests'
import {withRouter} from '../wrappers/withRouter'
import EditPasswordModal from '../modals/EditPasswordModal'
import Dropdown from 'react-bootstrap/Dropdown'

export class Header extends Component {
  state = {
    show: false
  }

  render() {
    return (
      <>
        <header className='bg-primary text-white rounded p-4 mt-2'>
            <h1>My Planner</h1>
            <div className='d-flex justify-content-between'>
              <label>A goal without a plan is just a wish!</label>
              {this.props.auth && <Dropdown>
                <Dropdown.Toggle size='sm bg-success border-0'>
                  {this.props.user.name} <i className='fa fa-user text-light'></i>
                </Dropdown.Toggle>
                <Dropdown.Menu style={{zIndex: 5000}}>
                  <Dropdown.Item onClick={_ => {this.setState({show: true})}}><small>Change Password</small></Dropdown.Item>
                  <Dropdown.Item onClick={_ => {deleteAccount(this.props.navigate, this.props.setAppState)}}><small>Delete Account</small></Dropdown.Item>
                  <Dropdown.Divider/>
                  <Dropdown.Item onClick={_ => {signOut(this.props.navigate, this.props.setAppState)}}><small>Sign Out</small></Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>}
            </div>
        </header>
        <EditPasswordModal show={this.state.show} onHide={_ => this.setState({show: false})}/>
      </>
    )
  }
}

export default withRouter(Header);