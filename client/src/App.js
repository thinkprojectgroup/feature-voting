import React, { Component } from "react";
import "./App.css";
import FeatureDetailView from "./components/Feature/FeatureDetailView";
import ProjectDetailView from "./components/Project/ProjectDetailView";
import Header from "./components/Header";
import ProjectOverView from "./components/Project/ProjectOverView";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useHistory,
  useLocation
} from "react-router-dom";
import CommentReview from "./components/Comment/CommentReview";
import SignIn from "./components/Auth/SignIn";
import AdminOnly from "./components/Auth/AdminOnly";
import AppWrapper from "./components/AppWrapper";
import Footer from "./components/Footer";
import FAQ from "./components/FAQ";
import ProjectOverView from "./components/ProjectOverView";
import { BrowserRouter as Router, Route,  Switch} from "react-router-dom";
import CommentReview from './components/CommentReview';
import FeatureForm from './components/FeatureForm';


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
            {console.log("Router is mounting...")}
            <Header role={this.state.role} />

            <Switch>
              
              <Route
                exact
                path={"/login"}
                render={props => (
                  <SignIn setAuthorisation={this.setAuthorisation} />
                )}
              />

              {/* Routes only if logged in and authorised as admin  */}
              <AdminOnly role={this.state.role} idToken={this.state.idToken}>
                <Route
                  exact
                  path={"/"}
                  render={props => <ProjectOverView {...props} />}
                />
                <Route
                  exact
                  path={"/commentreview"}
                  component={CommentReview}
                />
              </AdminOnly>
              
              <Route exact path={"/faq"} component={FAQ} />
              <Route
                path={"/:projectId"}
                render={props => <ProjectDetailView {...props} />}
              />
              <Route
                path={"/:projectId/:featureId"}
                component={FeatureDetailView}
              />
            </Switch>

            <Footer />
          </Router>
        )}
      </AppWrapper>
    );
  }
}

export default App;
