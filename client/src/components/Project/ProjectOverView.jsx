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
                <button onClick={onClose} className="col-6 not-confirm-delete">No</button>
                <button className=" col-6 confirm-delete"
                    onClick={() => {
                      this.handleDelete(id);
                      onClose();
                    }}
                >
                  Yes!
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
  reRender = (name) => {
    var self = this;
    var duplicate = this.state.projects.pop()
    var back = JSON.parse(JSON.stringify((duplicate)))
    this.state.projects.push(back)
    duplicate.name = name
    duplicate._id = ""
    self.setState({
      projects: this.state.projects.concat(duplicate)
    });
    console.log(self.state.projects.length);
    console.log(duplicate);
     
  };
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
          {this.state.show ? <ProjectForm reRender={this.reRender.bind(this)}/> : null}

        {this.state.projects.map(project => (
            <div>

                <div className="row project-list-item col-12">
                  <Link to={"/" + project.name.toString().split(" ").join("-")}>
                    <h3 className="col-11">{project.name}</h3>{" "}
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
