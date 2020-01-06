import React, { Component } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import beispiel from "./img/computer.png";
import axios from "axios";
import config from "../config";

//import ReadMoreAndLess from "react-read-more-less";

class FeaturePDV extends Component {
  constructor(props) {
    super(props);

    this.state = { show: true };
    this.toggleDivUpvote = this.toggleDivUpvote.bind(this);
    this.toggleDivDownVote = this.toggleDivDownVote.bind(this);

    this.state = {
      featureId: this.props.featureId,
      count: this.props.count,
      title: this.props.title,
      description: this.props.description,
      commentCount: this.props.commentCount,
      projectId: this.props.projectId,
      acceptedStatus: this.props.acceptedStatus,
      deleted: this.props.deleted
    };
  }

  toggleDivUpvote = () => {
    const { show } = this.state;
    this.setState({ show: !show });
    this.setState({ count: this.state.count + 1 });
  };

  toggleDivDownVote = () => {
    const { show } = this.state;
    this.setState({ show: !show });
    this.setState({ count: this.state.count - 1 });
  };

  render() {
    // TODO: Add real imagadata later
    var image = require("./img/computer.png");

    return (
      <div className="container row feature-list-item">
        <div className="col-1 feature-count">
          <button onClick={this.toggleDivUpvote} className="upvote-button">
            <i className="fas fa-angle-up"></i>
          </button>
          <p>{this.state.count}</p>
          {this.state.show ? (
            <button
              onClick={this.toggleDivDownVote}
              className="feature-downvote-button"
            >
              <i className="fas fa-angle-down"></i>
            </button>
          ) : null}
        </div>
        <Link to={"/" + this.props.projectId + "/" + this.state.featureId}>
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
            style={{ backgroundImage: "url(" + image + ")" }}
          ></div>
        </Link>
      </div>
    );
  }

  componentDidMount() {
    axios
      .get(config.url + `/api/comments/` + this.props.featureId)
      .then(response => {
        this.setState({
          commentCount: response.data.length
        });
      });
    console.log(this.state.commentCount);
  }
}
export default FeaturePDV;
