import React, { Fragment, Component } from 'react'
import axios from 'axios'
import config from '../config'

const CLIENT_ID_1 = config.CLIENT_ID

class AppWrapper extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isReady: false,
      hasError: false
    }
    this.isAuthInitalized()
  }

  componentDidCatch (error, info) {
    this.setState({ hasError: true })
    //TODO add error handling/logging service
  }

  isAuthInitalized = () => {
    const ready = setInterval(() => {
      if (window.gapi) {
        clearInterval(ready)
        this.initGoogleAuth()
      }
    }, 30)
  }

  initGoogleAuth = () => {
    window.gapi.load('auth2', () => {
      window.gapi.auth2
        .init({
          client_id: CLIENT_ID_1,
          scope: 'openid email',
          fetch_basic_profile: false
          //hosted_domain: 'thinkproject.de' //TODO add 'thinkproject.de' as only allowed domain
        })
        .then(authObject => {
          var user = authObject.currentUser.get()
          var userProfile = user.getBasicProfile()
          if (userProfile) this.props.setEmail(userProfile.getEmail())
          
          var idToken = user.getAuthResponse().id_token
          this.authorise(idToken)
        })
        .catch(error => {
          console.log(CLIENT_ID_1)
          console.log(error.response)
        })
    })
  }

  authorise = idToken => {
    axios
      .post(config.url + '/api/auth/', {
        idToken: idToken
      })
      .then(res => {
        switch (res.status) {
          case 200:
            this.role = 'admin'
            break
          case 211:
            this.role = 'employee'
            break

          default:
            this.role = null
        }

        this.props.setAuthorisation(this.role, true, idToken)
        axios.defaults.headers.common['token'] = idToken
      })
      .catch(error => {
        this.props.setAuthorisation(null, false, null)
      })
      .finally(() => {
        this.props.isReady(true)
      })
  }

  render () {
    return <Fragment>{this.props.children}</Fragment>
  }
}

export default AppWrapper
