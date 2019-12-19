import React, { Component } from "react";
import "./App.css";
import FeatureDetailView from "./components/FeatureDetailView";
import ProjectDetailView from "./components/ProjectDetailView";
import Header from "./components/Header";
import ProjectOverView from "./components/ProjectOverView";
import { BrowserRouter as Router, Route } from "react-router-dom";
import CommentReview from './components/CommentReview';


class App extends Component {
  render() {
    return (
      <Router>
        <Header />
        <Route path={"/"} exact component={ProjectOverView}></Route>
        <Route path={"/:_id"} exact component={ProjectDetailView}></Route>
        <Route path={"/commentreview"} component={CommentReview}/>
        <Route
          path={"/:_id/:featureId"}
          exact
          component={FeatureDetailView}
        ></Route>
      </Router>
    );
  }
}

export default App;
