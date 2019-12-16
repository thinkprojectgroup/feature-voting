import React, { Component } from 'react';
import './App.css';
import FeatureDetailView from './components/FeatureDetailView';
import ProjectDetailView from './components/ProjectDetailView';
import CommentReview from './components/CommentReview';
import Header from './components/Header';
import {BrowserRouter as Router, Route} from 'react-router-dom';

class App extends Component {


  render() {
    return (


      <Router>
        <Header/>
        <Route path={"/"} exact component={ProjectDetailView}>
        </Route>
        <Route path={"/commentreview"} component={CommentReview}/>
        <Route path={"/:featureId"} component={FeatureDetailView}/>
      </Router>
    );
  } 
  }
  
  export default App;
