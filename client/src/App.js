import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import FeatureDetailView from './components/FeatureDetailView';
import {BrowserRouter as Router, Route} from "react-router-dom";

class App extends Component {

render(){
  return (
    <Router>
      <FeatureDetailView />
      <Route path="/featuredetailview" Component={FeatureDetailView}/>
    </Router>
  );
} 
}

export default App;
