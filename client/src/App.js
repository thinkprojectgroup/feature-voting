import React, { Component } from "react";
import "./App.css";
import FeatureDetailView from "./components/Feature/FeatureDetailView";
import ProjectDetailView from "./components/Project/ProjectDetailView";
import Header from "./components/Header";
import ProjectOverView from "./components/Project/ProjectOverView";
import { BrowserRouter as Router, Route, useHistory, useLocation } from "react-router-dom";
import CommentReview from "./components/Comment/CommentReview";
import Login from "./components/Auth/Login";
import AdminOnly from "./components/Auth/AdminOnly";

const googleConfig = {
  clientId:
    "815925924669-cf3cap0n8rbsj0523n4unpof4s767jf0.apps.googleusercontent.com"
};

class App extends Component {
  state = {
    isAdmin: false,
    idToken: null
  };

  isAuthorised = admin => {
    this.setState({
      isAdmin: admin,
      idToken: null
    });
  };

  componentWillMount() {
    const token = localStorage.getItem("token");
    if (token) {
      this.setState({
        isAdmin: true,
        idToken: token
      });
    }
    console.log(window.gapi.load("auth2", () => console.log(this.auth2)));
  }

  componentDidUpdate() {
    console.log("isAdmin: ", this.state.isAdmin);
  }

  render() {
    //let history = useHistory();
    window.gapi.load("auth2", () => {
    var auth2 = window.gapi.auth2.init({
      client_id: googleConfig.clientId
    });
    console.log("auth2", this.auth2);
  })

    return (
      <Router>
        <Header />

        <Route path={"/login"}> 
          <Login isAuthorised={this.isAuthorised} />
        </Route>

        <AdminOnly isAdmin={this.state.isAdmin} idToken={this.state.idToken}>
          <Route path={"/"} exact component={ProjectOverView} />
          <Route path={"/commentreview"} component={CommentReview} />
        </AdminOnly>

        <Route path={"/:_id"} exact component={ProjectDetailView} />
        <Route path={"/:_id/:featureId"} exact component={FeatureDetailView} />
      </Router>
    );
  }
}

export default App;
