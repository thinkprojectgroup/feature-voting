import React, { Component } from "react";
import { Button } from "reactstrap";
import axios from "axios";
import "../css/FeatureDetailView.css";
import Comment from '../Comment/Comment';


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
      comments: [],
      commentCount: 0
    };
  }

  componentDidMount() {
    
    axios.get("http://localhost:3000/api/comments/" + this.props.match.params.featureId)
      .then(res => {
        const comments = res.data;
        this.setState({ comments: comments });
        this.setState({ commentCount: comments.count })
        console.log(this.state.comments[0].author);
      })

    axios
      .get(
        "http://localhost:3000/api/features/" +
        this.props.match.params._id +
        "/" +
        this.props.match.params.featureId
      )
      .then(res => {
        const feature = res.data;

        this.setState({ featureTitle: feature.headline });
        this.setState({ description: feature.description });
        this.setState({ upvotes: feature.voteCount });
        console.log(feature);
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
    var image = require("../img/computer.png");

    return (
      <div className="feature-detail-container container">
        <div className="row feature-detail">
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
          <div className="col-7 feature-text">
            <h3>{this.state.featureTitle}</h3>
            <p>{this.state.description}</p>
          </div>
          <div className="col-3 feature-detail-image">
            <img src={image} />
          </div>
          <div className="comment-section">
            {this.state.comments.map(comment => (
              <Comment
                author={comment.author}
                content={comment.content}
                accepted={comment.accepted}
                deleted={comment.deleted}
                date={comment.dateCreated}
                count={this.state.commentCount}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default FeatureDetailView;
