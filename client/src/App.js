import React, { Component } from "react";
import "./App.css";
import FeatureDetailView from "./components/FeatureDetailView";
import ProjectDetailView from "./components/ProjectDetailView";
import Header from "./components/Header";
import { BrowserRouter as Router, Route } from "react-router-dom";

class App extends Component {

  state = {
    isAdmin: false
  };

  authAdmin = isAdmin => {
    this.setState({
      isAdmin: isAdmin
    });
  };

  render() {

    return (
      <Router>
        <Header authAdmin={this.authAdmin} />
        <Route path={"/"} exact component={ProjectDetailView}></Route>

        <Route
          path={"/:featureId"}
          render={props => (
            <FeatureDetailView {...props} isAdmin={this.state.isAdmin} />
          )}
        />
      </Router>
    );
  }
}

export default App;
