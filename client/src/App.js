import React, { Component } from "react";
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
  Redirect,
  useHistory,
  useLocation
} from "react-router-dom";
import AdminRights from "./components/User/AdminRights";

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
          <div>
            <Router>
              <Header role={this.state.role} />
              <Switch>
                <Route
                  exact
                  path={"/"}
                  render={props =>
                    this.state.role == "admin" ? (
                      <ProjectOverView {...props} />
                    ) : (
                      <Redirect to={"/login"} />
                    )
                  }
                />
                <Route
                  exact
                  path={"/commentreview"}
                  render={props =>
                    this.state.role == "admin" ? (
                      <CommentReview {...props} />
                    ) : (
                      <Redirect to={"/login"} />
                    )
                  }
                />
                <Route
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
                <Route
                  exact
                  path={"/login"}
                  render={props => (
                    <SignIn setAuthorisation={this.setAuthorisation} />
                  )}
                />

                <Route exact path={"/faq"} component={FAQ} />

                <Route
                  exact
                  path={"/:projectName"}
                  render={props => <ProjectDetailView {...props} />}
                />
                <Route
                  path={"/:projectName/:featureId"}
                  component={FeatureDetailView}
                />
              </Switch>
              <Footer />
            </Router>
          </div>
        )}
      </AppWrapper>
    );
  }
}

export default App;
