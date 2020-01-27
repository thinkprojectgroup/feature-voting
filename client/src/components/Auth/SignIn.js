import React, { Component, Fragment } from 'react'
//import '../../App.css'
import axios from 'axios'
import config from '../../config'
import { withRouter, Link } from 'react-router-dom'
import { Button } from 'reactstrap'
import { GoogleLogin, GoogleLogout } from 'react-google-login';

class SignIn extends Component {
  constructor (props) {
    super(props)

    this.role = this.props.role ? this.props.role : null
    this.state = {
      signInSucesss: false
    }
  }

  onSuccess = googleUser => {
    var idToken = googleUser.tokenId;
    

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
        var userProfile = googleUser.getBasicProfile();
        if (userProfile) this.props.setEmail(userProfile.getEmail())
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

    console.log(this.props.isSignedIn);
    return (      
      <div className='container'>
        <div className="row welcome">
          <div className="col-8">
            <h1>Welcome to Feature Voting</h1>
            <p className="">Feature voting is a login-less web-application that makes it possible for customers and employees of <b><a href="thinkproject.com">thinkproject</a></b> to vote for new features and modifications for their software-
              solutions. This way, customers‘ wishes and desires can be determined and implemented.
            </p>
            <p>
              For questions visit our <Link to={"/faq"}><b>FAQ-Page</b></Link>
            </p>
          </div>

          <div className="col-4 login">

            <h2>Login</h2>
            <p>
              If you're an employee of thinkproject you can login with your thinkproject-email:
            </p>


          {!this.props.isSignedIn ? (
            <GoogleLogin
              clientId="596132698210-554c0ihpr0kp9vg13v7irajr55v8m4eq.apps.googleusercontent.com"
              buttonText="Login"
              scope="openid email"
              onSuccess={this.onSuccess}
              onFailure={this.onFailure}
              cookiePolicy={'single_host_origin'}
              className="col-12"
            />
          ) : (
            <GoogleLogout
              clientId="596132698210-554c0ihpr0kp9vg13v7irajr55v8m4eq.apps.googleusercontent.com"
              onLogoutSuccess={this.logout}
              className="col-12"
            />
          )}
          </div>

        </div>
      </div>
    )
  }
}

export default withRouter(SignIn)
