import React, { Component } from "react";
import { Button } from "reactstrap";
import axios from "axios";
import "./css/FeatureDetailView.css";
import Comment from '../Comment/Comment';
import config from '../../config';
import CommentForm from '../CommentForm';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

class FeatureDetailView extends Component {
  constructor(props) {
    super(props);

    this.state = { show: true };
    this.toggleDivUpvote = this.toggleDivUpvote.bind(this);
    this.toggleDivDownVote = this.toggleDivDownVote.bind(this);
    this.toggleShowForm = this.toggleShowForm.bind(this);

    this.state = {
      projectTitle: "Test",
      featureTitle: "",
      description: "",
      imageUrls: [],
      upvotes: 0,
      comments: [],
      commentCount: 0,
      showForm: false,
      upvoted: false,
    };
  }

  toggleShowForm = () => {
    this.setState({ showForm: !this.state.showForm });
    //console.log(this.state.showForm);
  }

  componentDidMount() {
    axios.get(config.url + "/api/comments/" + this.props.match.params.featureId)
      .then(res => {
        const comments = res.data;
        this.setState({ comments: comments });
        this.setState({ commentCount: comments.length })
      })
      .catch(error => {
        console.log(error);
      })

    axios
      .get(
        config.url + "/api/features/" +
        this.props.match.params.projectName.toString().split("-").join(" ") +
        "/" +
        this.props.match.params.featureId
      )
      .then(res => {
        const feature = res.data;
        console.log(res);
        
        this.setState({ 
                        imageUrls: feature.imageUrls,
                        featureTitle: feature.headline, 
                        description: feature.description, 
                        upvotes: feature.voteCount,
                        upvoted: feature.upvoted
                      },
                      () => {
                        
                      });
                    })
      .catch(error => {
        console.log(error);
      });

  }

  toggleDivUpvote = () => {
    var self = this;
    axios.patch(config.url + "/api/features/vote/" + self.props.match.params.featureId)
      .then(function (response) {
        console.log(response);
        self.setState({
          upvoted: true,
          upvotes: self.state.upvotes + 1
        });
        //console.log(self.state);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  toggleDivDownVote = () => {
    var self = this;
    axios.patch(config.url + "/api/features/vote/" + self.props.match.params.featureId)
      .then(function (response) {
        console.log(response);
        self.setState({
          upvoted: false,
          upvotes: self.state.upvotes - 1
        });
        // console.log(self.state);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  render() {
    // TODO: Add real imagadata later
    
    return (
      <div className="container row">
        <div className="row feature-detail">
          <div className="col-1 feature-count">

            {this.state.upvoted === false ? (
              <button onClick={this.toggleDivUpvote} className="feature-upvote-button">
                <i className="fas fa-angle-up"></i>
              </button>
            ) : null}

            <p>{this.state.upvotes}</p>

            {this.state.upvoted === true ? (
              <button onClick={this.toggleDivDownVote} className="feature-downvote-button">
                <i className="fas fa-angle-down"></i>
              </button>
            ) : null}

          </div>
          <div className="col-7 feature-text">
            <h3>{this.state.featureTitle}</h3>
            <p>{this.state.description}</p>
          </div>
          <div className="col-4 feature-detail-image">
              {this.state.imageUrls.length > 0 ? 
              <Carousel>
                {this.state.imageUrls.map(imageUrl => (
                  <div>
                  <img src={imageUrl}/>
                  </div>
                ))}
              </Carousel>
              : null
              }
          </div>
        </div>

        <hr />

        <div className="col-1">
          <button onClick={this.toggleShowForm} className="add">
            <i className="fas fa-plus"></i>
          </button>
        </div>

        {this.state.showForm ? (
          <CommentForm featureId={this.props.match.params.featureId}
          />
        ) : null}

        <div className="comment-section">
          <h4 className="comment-count">Comments: {this.state.commentCount}</h4>
          {this.state.comments.map(comment => (
            <Comment
              author={comment.name}
              content={comment.content}
              accepted={comment.accepted}
              deleted={comment.deleted}
              date={comment.dateCreated}
              count={this.state.commentCount}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default FeatureDetailView;
