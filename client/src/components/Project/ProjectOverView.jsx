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
      show: false,
      showResponse: false,
      featureToDelete :""
    };
    this.toggleShow = this.toggleShow.bind(this);
    this.handleDelete = this.handleDelete.bind(this);

  }
  openDialog  = id => {
     var self = this;
     self.setState({ showResponse: true } );
     self.setState({ featureToDelete: id } )
     console.log(self.state.featureToDelete)
  }
  handleClose = () => this.setState({ showResponse: false })

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
    self.setState({ showResponse: true })
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
    this.handleClose();
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
                    <button onClick={() => this.openDialog(project._id)} title="Delete project">
                      <i className="fas fa-times"></i>
                    </button>
                  </div>
                </div>

              {this.state.showResponse && this.state.featureToDelete == project._id?
                <div className="form-response-delete">
                 <p className="col-10">
                            Are you sure you want to delete the project
                        </p>
                         <button className="submit col-2" onClick={() => this.handleDelete(this.state.featureToDelete)}>
                            Yes
                        </button>
                        <button className="submit col-2" onClick={() => this.handleClose()}>
                            No
                        </button>




                </div>:null

            }
            </div>
        ))}
      </div>
    )
  }
}

export default ProjectOverView
