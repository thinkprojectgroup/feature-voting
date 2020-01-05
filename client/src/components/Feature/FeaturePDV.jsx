import React, { Component } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import axios from "axios";
import config from '../../config';
//import beispiel from "./img/computer.png";
//import ReadMoreAndLess from "react-read-more-less";

class FeaturePDV extends Component {
  constructor(props){
    super(props);

    this.state = {
      featureId: this.props.featureId,
      count: this.props.count,
      title: this.props.title,
      description: this.props.description,
      commentCount: this.props.commentCount,
      projectId: this.props.projectId,
      upvoted: this.props.upvoted
    };

    this.handleUpVote = this.handleUpVote.bind(this);
    this.handleDownVote = this.handleDownVote.bind(this);
  }
  

  handleUpVote = () => {
    var self = this;
    axios.patch(config.url + "/api/features/vote/" + this.state.featureId)
    .then(function (response) {
      console.log(response);
      self.setState({
        upvoted: true,
        count : self.state.count + 1
      });
      // console.log(self.state);
      })
      .catch(function (error) {
      console.log(error);
      });

  };

  handleDownVote = () => {
    var self = this;
    axios.patch(config.url + "/api/features/vote/" + this.state.featureId)
    .then(function (response) {
      console.log(response);
      self.setState({
        upvoted: false,
        count : self.state.count - 1
      });
     //  console.log(self.state);
      })
      .catch(function (error) {
      console.log(error);
      });

  };



  render() {
    // TODO: Add real imagadata later
    var image = require("../img/computer.png");
   //  console.log(this.props.projectId);

    return (
      <div className="row feature-list-item">
        <div className="col-1 feature-count">

          {this.state.upvoted === false ? 
          <button 
            onClick={this.handleUpVote.bind(this)} 
            className="upvote-button">

            <i className="fas fa-angle-up"></i>

          </button> : null }

          <p>{this.state.count}</p>

          {this.state.upvoted === true ? 
          <button
              onClick={this.handleDownVote.bind(this)}
              className="downvote-button">
            
              <i className="fas fa-angle-down"></i>
            </button> : null}


        </div>
        <Link to={"/" + this.state.projectId + "/" + this.state.featureId}>
          <div className="col-8 feature-text">
            <div className="title">

                <h3>{this.state.title}</h3>{" "}
            </div>
            <div className="description">
              <p>{this.state.description}</p>
            </div>
            <div className="comment-count">
              <p>{this.state.commentCount} comments</p>
            </div>
          </div>

          <div
            className="col-3 feature-image"
            style={{backgroundImage: "url(" + image + ")"}} >

          </div>
        </Link>
      </div>
    );
  }
}

export default FeaturePDV;
