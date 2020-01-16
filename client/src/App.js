import React, { Component } from 'react'
import Fingerprint2 from 'fingerprintjs2'
import axios from 'axios'
import './App.css'
import FeatureDetailView from './components/Feature/FeatureDetailView'
import ProjectDetailView from './components/Project/ProjectDetailView'
import Header from './components/Header'
import ProjectOverView from './components/Project/ProjectOverView'
import CommentReview from './components/Comment/CommentReview'
import SignIn from './components/Auth/SignIn'
import AppWrapper from './components/AppWrapper'
import Footer from './components/Footer'
import FAQ from './components/FAQ'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  useHistory,
  useLocation
} from 'react-router-dom'

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      role: 'user',
      isSignedIn: false,
      idToken: null,
      authIsLoaded: false,
    }

    this.createFingerPrint()
  }

  // Helper function to await a timeout
  timeout = (ms) => new Promise(resolve => setTimeout(resolve, ms))
  
  createFingerPrint = () => {
    this.timeout(500).then(
      Fingerprint2.get(function (components) {
        // an array of: {key: ..., value: ...} pairs
        // only keep the values
        const values = components.map(component => component.value)
        // hash the values
        const hashedFingerprint = Fingerprint2.x64hash128(values.join(''), 31)
        axios.defaults.headers.common['Hash'] = hashedFingerprint
      })
    )
  }

  // executed in <AppWrapper> after Google API and Auth is initalized
  // otherwise problems with async
  isReady = isReady => {
    this.setState({
      authIsLoaded: isReady
    })
  }

  // executed in <AppWrapper> and <SignIn>
  // ->  after User login and/or before App loads (check for signed in User)
  setAuthorisation = (role, isSignedIn, idToken) => {
    this.setState({
      role: role,
      isSignedIn: isSignedIn,
      idToken: idToken
    })
  }

  render() {
    return (
      <AppWrapper
        isReady={this.isReady}
        setAuthorisation={this.setAuthorisation}
      >
        {this.state.authIsLoaded && (
          <div>
            <Router>
              <Header role={this.state.role} />
              <Switch>
                <Route
                  exact
                  path={'/'}
                  render={props =>
                    this.state.role == 'admin' ? (
                      <ProjectOverView {...props} />
                    ) : (
                        <Redirect to={'/login'} />
                      )
                  }
                />
                <Route
                  exact
                  path={'/commentreview'}
                  render={props =>
                    this.state.role == 'admin' ? (
                      <CommentReview {...props} />
                    ) : (
                        <Redirect to={'/login'} />
                      )
                  }
                />
                <Route
                  exact
                  path={'/login'}
                  render={props => (
                    <SignIn setAuthorisation={this.setAuthorisation} />
                  )}
                />
                <Route exact path={'/faq'} component={FAQ} />
                <Route
                  exact
                  path={'/:projectName'}
                  render={props => <ProjectDetailView {...props} />}
                />
                <Route
                  path={'/:projectName/:featureId'}
                  component={FeatureDetailView}
                />
              </Switch>
              <Footer />
            </Router>
          </div>
        )}
      </AppWrapper>
    )
  }
}

export default App
