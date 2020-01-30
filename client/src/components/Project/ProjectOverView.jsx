import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import config from "../../config";
import ProjectForm from "./ProjectForm";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css



class ProjectOverView extends Component {
  constructor (props) {
    super(props)
    this.state = {
      projects: [],
      idToken: this.props.idToken,
      show: false,
      featureToDelete :""
    };
    this.toggleShow = this.toggleShow.bind(this);
    this.handleDelete = this.handleDelete.bind(this);

  }


  submit = (id) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
            <div className='modal row'>
              <h1>Delete Project</h1>
              <p>Are you sure you want to delete this project?</p>
              <div className="row">
                <button onClick={onClose} className="col-6 not-confirm-delete">Cancel</button>
                <button className=" col-6 confirm-delete"
                    onClick={() => {
                      this.handleDelete(id);
                      onClose();
                    }}
                >
                  Delete
                </button>
              </div>
            </div>
        );
      }
    });
  };


  toggleShow = () => {
    this.setState({ show: !this.state.show });
    document.getElementById("form-button").classList.toggle("cross");
  };

  componentDidMount () {
    axios
      .get(config.url + `/api/projects/`)
      .then(response => {
        this.setState({
          projects: response.data
        })
      })
      .catch(error => {})
  }

  addProject = (project) => {
    this.setState({
      projects: this.state.projects.concat([project])
    })
  };

  handleDelete = id => {
    var self = this;
    var newState = self.state.projects.filter(project => project._id != id);
    self.setState({
      projects: newState
    });
    
    axios
        .delete("/api/projects/" + id)
        .then(function(response) {})
        .catch(function(error) {});
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
          {this.state.show ? <ProjectForm addProject={this.addProject.bind(this)}/> : null}

        {this.state.projects.map(project => (
            <div>

                <div className="row project-list-item col-12">
                  <Link to={"/" + project.name}>
                    <h3 className="col-11">{project.displayName}</h3>{" "}
                  </Link>
                  <div className="delete">
                    <button onClick={() => this.submit(project._id)} title="Delete project">
                      <i className="fas fa-times"></i>
                    </button>
                  </div>
                </div>
            </div>
        ))}
      </div>
    )
  }
}

export default ProjectOverView
