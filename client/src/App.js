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
import AdminRights from "./components/User/AdminRights";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
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
          <>
            <Router>
              <Header 
                role={this.state.role} 
                isSignedIn={this.state.isSignedIn}
                setAuthorisation={this.setAuthorisation}
              />
              <Switch>
                <Route //Admin - ProjectOverview
                  exact
                  path={'/'}
                  render={props =>
                    this.state.role == 'admin' ? (
                      <ProjectOverView idToken={this.state.idToken} {...props} />
                    ) : (
                        <Redirect to={'/login'} />
                      )
                  }
                />
                <Route //Admin - CommentReview
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
                <Route //Admin - AdminRights
                    exact
                    path={"/adminrights"}
                    render={props =>
                        this.state.role == "admin" ? (
                            <AdminRights {...props} />
                        ) : (
                            <Redirect to={"/login"} />
                        )
                    }
                />
                <Route //Login
                  exact
                  path={'/login'}
                  render={props => (
                    <SignIn 
                      role={this.props.role}
                      isSignedIn={this.state.isSignedIn} 
                      setAuthorisation={this.setAuthorisation} />
                  )}
                />
                <Route exact path={'/faq'} component={FAQ} />
                <Route exact path={'/:projectName'} component={ProjectDetailView} />
                <Route path={'/:projectName/:featureId'} component={FeatureDetailView} />
              </Switch>
              <Footer />
            </Router>
          </>
        )}
      </AppWrapper>
    )
  }
}

export default App
