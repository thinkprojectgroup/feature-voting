import React, { Component } from "react";
import "./App.css";
import FeatureDetailView from "./components/FeatureDetailView";
import ProjectDetailView from "./components/ProjectDetailView";
import Header from "./components/Header";
import Footer from "./components/Footer";
import FAQ from "./components/FAQ";
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
        <Route path={"/commentreview"} component={CommentReview}></Route>
        <Route path={"/:_id/:featureId"} exact component={FeatureDetailView}></Route>
        <Route path={"/faq"} component={FAQ}></Route>
        <Footer />
      </Router>
    );
  }
}

export default App;
