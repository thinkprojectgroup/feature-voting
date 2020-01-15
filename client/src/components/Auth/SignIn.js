import React, { Component, Fragment } from 'react'
//import '../../App.css'
import axios from 'axios'
import config from '../../config'
import { withRouter } from 'react-router-dom'
import { Button } from 'reactstrap'
import AlreadySignedIn from './AlreadySignedIn'

class SignIn extends Component {
  constructor (props) {
    super(props)

    this.role = this.props.role ? this.props.role : null
  }

  componentDidMount () {
    if (this.props.isSignedIn)
      this.props.history.push('/')
      // setTimeout(() => this.redirectTo('/'), 5000)

    window.gapi.load('auth2', () => {
      var opts = {
        onSuccess: this.onSuccess,
        onFailure: this.onFailure
      }

      window.gapi.signin2.render('loginButton', opts)
    })

    window.gapi.load('signin2', () => {
      var opts = {
        width: 200,
        height: 50
      }
      window.gapi.signin2.render('loginButton', opts)
    })
  }

  onSuccess = googleUser => {
    var idToken = googleUser.getAuthResponse().id_token
    console.log('Logged In.')

    axios
      .post(config.url + '/api/auth/', {
        idToken: idToken
      })
      .then(res => {
        switch (res.status) {
          case 200: this.role = 'admin'; break
          case 211: this.role = 'employee'; break

          default: this.role = 'user'
        }
        this.props.setAuthorisation(this.role, true, idToken) // set role, signedIn and idToken in App.js
        axios.defaults.headers.common['token'] = idToken // jwt-token send with every request (users have no idtoken - null)
        setTimeout(() => this.props.history.push('/'), 2000)
      })
      .catch(error => {
        this.props.setAuthorisation(null, false, null)
      })
  }

  onFailure = error => {
    // TODO: Create "Login Failed" Dialog
    this.props.setAuthorisation(null, false, null)
    console.log('Login Failed.')
  }

  logout = () => {
    var auth2 = window.gapi.auth2.getAuthInstance()
    auth2.signOut().then(() => {
      this.props.setAuthorisation(null, false, null)
      auth2.disconnect()
      this.props.history.push('/login')
    })
  }

  render () {
    //if (this.props.isSignedIn) return <AlreadySignedIn logout={this.logout} />

    return (      
      <div className='container'>
        <div id='loginButton'>Login</div>
        <Button href='' id='logoutButton' onClick={this.logout}>
          Logout
        </Button>
      </div>
    )
  }
}

export default withRouter(SignIn)
