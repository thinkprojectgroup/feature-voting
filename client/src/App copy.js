import React, { Component, Fragment } from "react";
import "./App.css";
import FeatureDetailView from "./components/Feature/FeatureDetailView";
import ProjectDetailView from "./components/Project/ProjectDetailView";
import Header from "./components/Header";
import ProjectOverView from "./components/Project/ProjectOverView";
import CommentReview from "./components/Comment/CommentReview";
import SignIn from "./components/Auth/SignIn";
import AdminOnly from "./components/Auth/AdminOnly";
import AppWrapper from "./components/AppWrapper";
import Footer from "./components/Footer";
import FAQ from "./components/FAQ";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useHistory,
  useLocation
} from "react-router-dom";




class App extends Component {
  state = {
    role: "user",
    isSignedIn: false,
    idToken: null,
    authIsLoaded: false
  };

  // executed in <AppWrapper> after Google API and Auth is initalized
  // otherwise problems with async
  isReady = isReady => {
    this.setState({
      authIsLoaded: isReady
    });
  };

  // executed in <AppWrapper> and <SignIn>
  // ->  after User login and/or before App loads (check for signed in User)
  setAuthorisation = (role, isSignedIn, idToken) => {
    this.setState({
      role: role,
      isSignedIn: isSignedIn,
      idToken: idToken
    });
  };

  render() {
    return (
      <AppWrapper
        isReady={this.isReady}
        setAuthorisation={this.setAuthorisation}
      >
        {this.state.authIsLoaded && (
          <Router>
            <Header role={this.state.role} />
            {/* <AdminOnly role={this.state.role} idToken={this.state.idToken}>
              <Route exact path="/">
                <ProjectOverView />
              </Route>

              <Route path="/commentreview">
                <CommentReview />
              </Route>
            </AdminOnly> */}
            <Switch>
              <Route exact path="/">
                <ProjectOverView />
              </Route>

              <Route path="/commentreview">
                <CommentReview />
              </Route>
              
              <Route exact path="/login">
                <SignIn setAuthorisation={this.setAuthorisation} />
              </Route>
              
              <Route exact path="/faq">
                <FAQ />
              </Route>

              <Route path="/:projectId">
                <ProjectDetailView />
              </Route>

              <Route path="/:projectId/:featureId">
                <FeatureDetailView />
              </Route>
              
            </Switch>

            <Footer />
          </Router>
        )}
      </AppWrapper>
    );
  }
}

export default App;
