import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import config from "../../config";
import ProjectForm from "./ProjectForm";

class ProjectOverView extends Component {
  constructor (props) {
    super(props)
    this.state = {
      projects: [],
      idToken: this.props.idToken,
      show: false
    };
    this.toggleShow = this.toggleShow.bind(this);
    this.handleDelete = this.handleDelete.bind(this);

  }
  toggleShow = () => {
    this.setState({ show: !this.state.show });
    document.getElementById("form-button").classList.toggle("cross");
    // console.log(this.state.show);
  };

  componentDidMount () {
    axios
      .get(config.url + `/api/projects/`)
      .then(response => {
        this.setState({
          projects: response.data
        })
      })
      .catch(error => {
        console.log(error)
      })
  }

  handleDelete = id => {
    var self = this;
    var newState = self.state.projects.filter(project => project._id != id);
    self.setState({
      projects: newState
    });
    // console.log(comment._id)
    axios
        .delete("/api/projects/" + id)
        .then(function(response) {
          console.log(response);
        })
        .catch(function(error) {
          console.log(error);
        });
  };




  render () {
    return (
        <div className="container row">
          <div className="row">
            <div className="col-11 project-name">
              <h1>Projects</h1>
            </div>
            <div className="col-1 add-button">
              <button onClick={this.toggleShow} className="add" id="form-button" title="Add project">
                <i className="fas fa-plus"></i>
              </button>
            </div>
          </div>
          {this.state.show ? <ProjectForm /> : null}
        {this.state.projects.map(project => (
            <div>
              <Link to={"/" + project.name.toString().split(" ").join("-")}>
                <div className="row project-list-item col-11">
                  <h3>{project.name}</h3>{" "}
                </div>
              </Link>
              <div className="col-1 delete-project">
                <button onClick={() => this.handleDelete(project._id)} className="decline" title="Delete project">
                  <i className="fas fa-times"></i>
                </button>
              </div>
            </div>
        ))}
      </div>
    )
  }
}

export default ProjectOverView
