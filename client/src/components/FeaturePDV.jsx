import React, { Component } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
//import beispiel from "./img/computer.png";
//import ReadMoreAndLess from "react-read-more-less";

class FeaturePDV extends Component {
  state = {
    featureId: this.props.featureId,
    count: this.props.count,
    title: this.props.title,
    description: this.props.description,
    commentCount: this.props.commentCount,
    projectId: this.props.projectId
  };

  render() {
    // TODO: Add real imagadata later
    var image = require("./img/computer.png");
    console.log(this.props.projectId);

    return (
      <div className="row feature-list-item">
        <div className="col-1 feature-count">
          <button onClick={this.toggleDivUpvote} className="upvote-button">
            <i className="fas fa-angle-up"></i>
          </button>
          <p>{this.state.count}</p>
          {this.state.show ? (
            <button
              onClick={this.toggleDivDownVote}
              className="downvote-button"
            >
              <i className="fas fa-angle-up"></i>
            </button>
          ) : null}
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
