import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import axios from 'axios';

class App extends Component {


  componentDidMount() {
    /*
    axios.get(`https://jsonplaceholder.typicode.com/users`)
      .then(res => {
        const persons = res.data;
        console.log(persons);
        this.setState({ persons });
      })
      */

    axios.get(`http://localhost:3000/api/projects/`)
    .then(res => {
      const projects = res.data;
      console.log(projects);
    })

  }

  render() {
    return (
      <div>
        TEST
      </div>
    );
  } 
  }
  
  export default App;
