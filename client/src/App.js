import React, { Component } from 'react'
import Fingerprint2 from 'fingerprintjs2'
import axios from 'axios'
import './App.css'
import FeatureDetailView from './components/Feature/FeatureDetailView'
import ProjectDetailView from './components/Project/ProjectDetailView'
import Header from './components/Header'
import Breadcrumb from './components/Breadcrumb'
import ProjectOverView from './components/Project/ProjectOverView'
import CommentReview from './components/Comment/CommentReview'
import SignIn from './components/Auth/SignIn'
import AppWrapper from './components/AppWrapper'
import Footer from './components/Footer'
import FAQ from './components/FAQ'
import AdminRights from "./components/User/AdminRights";
import NotFoundPage from './components/ErrorPages/NotFoundPage'
import BadRequestPage from './components/ErrorPages/BadRequestPage'
import InternalServerError from './components/ErrorPages/InternalServerError'
import UnauthorisedPage from './components/ErrorPages/UnauthorisedPage'
import GeneralErrorPage from './components/ErrorPages/GeneralErrorPage'
import AdminRoute from './components/Auth/AdminRoute'
import {
  Route,
  Switch,
  Redirect,
  withRouter
} from 'react-router-dom'
import ScrollToTop from './ScrollToTop'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      role: 'user',
      email: null,
      isSignedIn: false,
      idToken: null,
      authIsLoaded: false,
      featureName: ""
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

  setFeatureName = (featureName) => {
      this.setState({
        featureName: ""
      }, () => this.setState({
              featureName: featureName
              })
      )
  }

  getFeatureName = () => {
    // console.log(this.setFeatureName())
    return this.state.featureName
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

  redirectToErrorPage = (statusCode) => {
    switch(statusCode) {
      case 400:
      case 401:
      case 404:
      case 500: this.props.history.push("/"+statusCode); break;

      default: this.props.history.push("/err");
    }
  }

  setEmail = (email) => {
    this.setState({
      email: email
    })
  }

  render() {

    return (
        <AppWrapper
            isReady={this.isReady}
            setAuthorisation={this.setAuthorisation}
            setEmail={this.setEmail}
        >
          {this.state.authIsLoaded && (
              <>
                <ScrollToTop />
                <Header
                    role={this.state.role}
                    isSignedIn={this.state.isSignedIn}
                    setAuthorisation={this.setAuthorisation}
                />

                <Breadcrumb 
                  role={this.state.role} 
                  getFeatureName={this.getFeatureName}
                />

                <Switch>
                  <AdminRoute exact path='/' role={this.state.role}>
                    <ProjectOverView idToken={this.state.idToken} />
                  </AdminRoute>
                  <AdminRoute exact path='/commentreview' role={this.state.role}>
                    <CommentReview />
                  </AdminRoute>
                  <AdminRoute exact path='/adminrights' role={this.state.role}>
                    <AdminRights />
                  </AdminRoute>
                  <Route //Login
                      exact
                      path={'/login'}
                      render={props => (
                          <SignIn
                              role={this.props.role}
                              isSignedIn={this.state.isSignedIn}
                              setAuthorisation={this.setAuthorisation}
                              setEmail={this.setEmail}
                          />
                      )}
                  />
                  <Route exact path={'/faq'} component={FAQ} />

                  {/* ErrorPages */}
                  <Route exact path={'/400'} component={BadRequestPage} />
                  <Route exact path={'/401'} component={UnauthorisedPage} />
                  <Route exact path={'/404'} component={NotFoundPage} />
                  <Route exact path={'/500'} component={InternalServerError} />
                  <Route exact path={'/err'} component={GeneralErrorPage} />

                  <Route exact path={'/:projectName'}>
                    <ProjectDetailView redirectToErrorPage={this.redirectToErrorPage} role={this.state.role} />
                  </Route>
                  <Route path={'/:projectName/:featureId'}>
                    <FeatureDetailView redirectToErrorPage={this.redirectToErrorPage} 
                    role={this.state.role} 
                    email={this.state.email} 
                    setFeatureName={this.setFeatureName}
                    />
                  </Route>

                  {/* <Route exact
                  path={'/:projectName'}
                  render={(props) => <ProjectDetailView {...props} role={this.state.role}/>}
                />
                <Route
                  path={'/:projectName/:featureId'}
                  render={(props) => <FeatureDetailView {...props} role={this.state.role} email={this.state.email}/>}
                /> */}

                </Switch>
                <Footer />
              </>
          )}
        </AppWrapper>
    )
  }
}

export default withRouter(App);