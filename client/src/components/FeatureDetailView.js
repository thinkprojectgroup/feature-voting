import React, { Component } from "react";
import { Button } from "reactstrap";
import axios from "axios";
import "./css/FeatureDetailView.css";

class FeatureDetailView extends Component {
  constructor(props) {
    super(props);

    this.state = { show: true };
    this.toggleDivUpvote = this.toggleDivUpvote.bind(this);
    this.toggleDivDownVote = this.toggleDivDownVote.bind(this);

    this.state = {
      projectTitle: "Test",
      featureTitle: "",
      description: "",
      image: "",
      upvotes: 0,
      isAdmin: this.props.isAdmin
    };
  }

  componentDidMount() {

    axios.get(
        "http://localhost:3000/api/features/5debb2971c768b066eb9bca0/5debb36377223b06ede65c48" // this.params.feature.featureId
      )
      .then(res => {
        const feature = res.data;

        this.setState({
          featureTitle: feature.headline,
          description: feature.description,
          upvotes: feature.voteCount
        });
      });
  }

  toggleDivUpvote = () => {
    const { show } = this.state;
    this.setState({ show: !show });
    this.setState({ upvotes: this.state.upvotes + 1 });
  };

  toggleDivDownVote = () => {
    const { show } = this.state;
    this.setState({ show: !show });
    this.setState({ upvotes: this.state.upvotes - 1 });
  };

  render() {
    // TODO: Add real imagadata later
    var image = require("./img/computer.png");

    return (
      <React.Fragment>
        {this.props.isAdmin && (
          <div className="feature-detail-container container row feature-detail">
            <div className="col-1 feature-count">
              <Button
                onClick={this.toggleDivUpvote}
                className="feature-upvote-button"
              >
                <i className="fas fa-angle-up"></i>
              </Button>
              <p>{this.state.upvotes}</p>
              {this.state.show ? (
                <button
                  onClick={this.toggleDivDownVote}
                  className="feature-downvote-button"
                >
                  <i className="fas fa-angle-down"></i>
                </button>
              ) : null}
            </div>
            <div className="col-8 feature-text">
              <h3>{this.state.featureTitle}</h3>
              <p>{this.state.description}</p>
            </div>
            <div className="col-3 feature-detail-image">
              <img src={image} />
            </div>
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default FeatureDetailView;
