import React, { Component } from "react";
import axios from "axios";
import { BrowserRouter as Router, Link } from "react-router-dom";

class ProjectOverView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: []
    };
  }
  render() {
    return (
      <div className="container">
        <h1>Projects</h1>
        {this.state.projects.map(project => (
          <div className="container row feature-list-item">
            <Link to={"/" + project._id} style={{ textDecoration: "none" }}>
              <h3>{project.name}</h3>{" "}
            </Link>
          </div>
        ))}
      </div>
    );
  }
  async componentDidMount() {
    const promise = await axios.get(`http://localhost:3000/api/projects/`);
    const projects = promise.data;
    //const projects = Object.values(promise);
    console.log(projects);
    this.setState({ projects });
  }
}

export default ProjectOverView;
