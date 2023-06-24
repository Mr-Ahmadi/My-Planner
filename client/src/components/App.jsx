import { Component } from 'react'

import Container from 'react-bootstrap/Container'
import {Routes, Route} from 'react-router-dom'
import Content from './mains/Content'
import Footer from './mains/Footer'
import Header from './mains/Header'
import SignUp from './mains/SignUp'
import SignIn from './mains/SignIn'
import Loading from './elements/Loading'
import {checkAuth} from '../functions/requests/userRequests'
import NotFound from './mains/NotFound'
import InternalError from './mains/InternalError'

export class App extends Component {
  state = {
    auth: null, 
    user: null
  }

  setAppState = (values) => {
    this.setState({...values})
  }

  componentDidMount(){
    checkAuth(this.setAppState)
  }

  render() {
    return(
      <Container>
        <Header auth={this.state.auth} user={this.state.user} setAppState={this.setAppState}/>
        <Routes>
          {this.state.auth === null && <Route path='*' element={<Loading/>}/>}
          {this.state.auth === undefined && <Route path='*' element={<InternalError checkAuth={_ => checkAuth(this.setAppState)}/>}/>}
          {this.state.auth === true && <Route path='/' element={<Content/>}/>}
          {this.state.auth === false &&
            <>
              <Route path='/signin' element={<SignIn setAppState={this.setAppState}/>}/>
              <Route path='/signup' element={<SignUp/>}/>
            </>
          }
          <Route path='*' element={<NotFound auth={this.state.auth}/>}/>
        </Routes>
        <Footer/>
      </Container>
    )
  }
}

export default App