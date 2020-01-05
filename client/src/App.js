import React, { Component } from "react";
import "./App.css";
import FeatureDetailView from "./components/FeatureDetailView";
import ProjectDetailView from "./components/ProjectDetailView";
import Header from "./components/Header";
import Footer from "./components/Footer";
import FAQ from "./components/FAQ";
import ProjectOverView from "./components/ProjectOverView";
import { BrowserRouter as Router, Route,  Switch} from "react-router-dom";
import CommentReview from './components/CommentReview';
import FeatureForm from './components/FeatureForm';


class App extends Component {
  render() {
    return (
      <Router>
        <Header />

        <Switch>
          <Route
            exact
            path={"/"}
            render={props => <ProjectOverView {...props} />}
          />
          <Route path={"/faq"} component={FAQ} />
          <Route path={"/commentreview"} component={CommentReview} />
          <Route
            exact
            path={"/:projectId"}
            render={props => <ProjectDetailView {...props} />}
          />
          <Route path={"/:projectId/:featureId"} component={FeatureDetailView} />
                
        </Switch>
        <Footer />
      </Router>
    );
  }
}

export default App;
