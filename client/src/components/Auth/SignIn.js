import React, { Component, Fragment } from 'react'
//import '../../App.css'
import axios from 'axios'
import config from '../../config'
import { withRouter } from 'react-router-dom'
import { Button } from 'reactstrap'
import { GoogleLogin, GoogleLogout } from 'react-google-login';

class SignIn extends Component {
  constructor (props) {
    super(props)

    const role = this.props.role ? this.props.role : null
    const locationState = this.props.history.location.state

    this.state = {
      role: role,
      previousPath: locationState ? locationState.previousPath : '/',
      signInSucesss: false,
    }
  }

  redirectAfterLogin = () => {
      this.props.history.push(this.state.previousPath)
  }

  onSuccess = googleUser => {
    var idToken = googleUser.tokenId;
    
    axios
      .post(config.url + '/api/auth/', {
        idToken: idToken
      })
      .then(res => {
        var userProfile = googleUser.getBasicProfile();

        switch (res.status) {
          case 200: this.role = 'admin'; break
          case 211: this.role = 'employee'; break

          default: this.role = 'user'
        }
        
        if (userProfile)
          this.props.setEmail(userProfile.getEmail())
        // set auth and redirect
        this.props.setAuthorisation(this.role, true, idToken) // set role, signedIn and idToken in App.js
        axios.defaults.headers.common['token'] = idToken // jwt-token send with every request (users have no idtoken - null)
        setTimeout(() => this.redirectAfterLogin(), 200)
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
    console.log(this.props.isSignedIn);
    return (      
      <div className='container'>

        {!this.props.isSignedIn ? (
          <div className="login-field">
            <GoogleLogin
              clientId="596132698210-554c0ihpr0kp9vg13v7irajr55v8m4eq.apps.googleusercontent.com"
              buttonText="Login"
              scope="openid email"
              className="google-login-btn"
              onSuccess={this.onSuccess}
              onFailure={this.onFailure}
              cookiePolicy={'single_host_origin'}
            />
          </div>
          
        ) : (
          <GoogleLogout 
            clientId="596132698210-554c0ihpr0kp9vg13v7irajr55v8m4eq.apps.googleusercontent.com"
            onLogoutSuccess={this.logout}
          />
        )}
      </div>
    )
  }
}

export default withRouter(SignIn)
