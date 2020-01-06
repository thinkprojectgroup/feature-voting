import React, { Component } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import beispiel from "./img/computer.png";
import axios from "axios";
import { Button } from "reactstrap";
import config from "../config";

//import ReadMoreAndLess from "react-read-more-less";

class FeatureFR extends Component {
  constructor(props) {
    super(props);

    this.state = {
      featureId: this.props.featureId,
      title: this.props.title,
      description: this.props.description,
      projectId: this.props.projectId,
      acceptedStatus: this.props.acceptedStatus,
      deleted: this.props.deleted,
      clicked: false
    };
  }

  handleAccept = () => {
    var self = this;
    axios
      .patch(
        "/api/projects/accept/" +
          this.props.projectId +
          "/" +
          this.state.featureId
      )
      .then(function(response) {
        console.log(response);
        self.setState({
          clicked: true
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  handleDelete = () => {
    var self = this;
    // console.log(comment._id)
    axios
      .delete(
        "/api/projects/" + this.props.projectId + "/" + this.state.featureId
      )
      .then(function(response) {
        console.log(response);
        self.setState({
          clicked: true
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  render() {
    // TODO: Add real imagadata later
    var image = require("./img/computer.png");

    return (
      <div className="container row feature-list-item">
        <div className="col-1 feature-count">
          <Button className="accept" onClick={() => this.handleAccept}>
            <i className="fas fa-check"></i>
          </Button>
          <Button className="decline" onClick={this.handleDelete}>
            <i className="fas fa-times"></i>
          </Button>
        </div>
        <div className="col-8 feature-text">
          <div className="title">
            <h3>{this.state.title}</h3>{" "}
          </div>
          <div className="description">
            <p>{this.state.description}</p>
          </div>
        </div>
        <div
          className="col-3 feature-image"
          style={{ backgroundImage: "url(" + image + ")" }}
        ></div>
      </div>
    );
  }
}
export default FeatureFR;
