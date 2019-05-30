import React from 'react';
import '../App.css';
import Login from './Login'
import Student from './Student'
import Teacher from './Teacher'
import Director from './Director'
import Admin from './Admin'
import {login as slogin} from '../server'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.login = this.login.bind(this)
    this.state = {
      user: null
    }
  }

  async componentDidMount() {
    console.log('did mount')
  }

  async login(login, password) {
    if (login == 'admin' && password == 'admin') {
      const user = {
        role: 0
      }
      this.setState({
        user: user
      })
    } else {
      const user = await slogin(login, password)
      console.log(user)
      this.setState({
        user: user
      })
    }
  }

  render() {
    if (this.state.user === null) {
      return <Login onLogin={this.login}/>
    }

    if (this.state.user.role === 1) {
      return <Student user={this.state.user}/>
    }
    else if (this.state.user.role === 2) {
      return <Teacher user={this.state.user}/>
    }
    else if (this.state.user.role === 3) {
      return <Director user={this.state.user}/>
    }
    else if (this.state.user.role === 0) {
      return <Admin user={this.state.user}/>
    }
  }
}

export default App;
