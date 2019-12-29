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

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAdmin: false,
      idToken: null,
      authIsReady: false
    };
  }

  isReady = isReady => {
    this.setState({
      authIsReady: isReady
    });
  };

  setAuthorisation = (admin, token) => {
    this.setState({
      isAdmin: admin,
      idToken: token
    });
  };

  render() {

    return (
      <AppWrapper isReady={this.isReady} setAuthorisation={this.setAuthorisation}>
        {this.state.authIsReady && (
          <Router>
            {console.log("Router is mounting...")}
            <Header />

            <Switch>
              <Route
                exact
                path={"/login"}
                render={props => (
                  <SignIn setAuthorisation={this.setAuthorisation} /> // clientId={CLIENT_ID}
                )}
              />

              <Route exact path={"/:projectId"} component={ProjectDetailView} />
              <Route
                exact
                path={"/:projectId/:featureId"}
                component={FeatureDetailView}
              />

              <AdminOnly
                isAdmin={this.state.isAdmin}
                idToken={this.state.idToken}
              >
                <Route exact path={"/"} component={ProjectOverView} />
                <Route exact path={"/commentreview"} component={CommentReview} />
              </AdminOnly>
            </Switch>

          </Router>
        )}
      </AppWrapper>
    );
  }
}

export default App;
