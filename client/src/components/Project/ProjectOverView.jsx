import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import config from "../../config";

class ProjectOverView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: []
    };
  }

  componentDidMount() {
    //TODO add idToken to Request-Body
    axios.get(config.url + `/api/projects/`).then(response => {
      this.setState({
        projects: response.data
      })
    })
    .catch(error => console.log(error));
  }

  render() {
    return (
      <div className="container">
        <h1>Projects</h1>
        {this.state.projects.map(project => (
          <Link to={"/" + project._id} >
            <div className="row project-list-item">
                <h3>{project.name}</h3>{" "}
            </div>
          </Link>
        ))}
      </div>
    );
  }
}

export default ProjectOverView;
