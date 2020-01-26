import React, { Component } from "react";
import { Button } from "reactstrap";
import { withRouter } from 'react-router-dom'
import axios from "axios";
import "./css/FeatureDetailView.css";
import Comment from '../Comment/Comment';
import config from '../../config';
import { Carousel } from 'react-responsive-carousel';
import CommentForm from '../CommentForm';

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
      role: this.props.role,
      email: this.props.email,
      employeeVoteCount: 0,
      userVoteCount: 0
    };
    // console.log(this.state)
  }

  toggleShowForm = () => {
    this.setState({ showForm: !this.state.showForm });
      document.getElementById("form-button").classList.toggle("cross");
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
        this.props.redirectToErrorPage(error.response.status)
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
                        upvoted: feature.upvoted,
                        employeeVoteCount: feature.employeeVoteCount,
                        userVoteCount: feature.userVoteCount
                      },
                      () => {
                        
                      });
                    })
      .catch(error => {
        this.props.redirectToErrorPage(error.response.status);
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

        if(self.state.role === "admin"){
          self.setState({
            employeeVoteCount: self.state.employeeVoteCount + 1
          })
        }
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

        if(self.state.role === "admin"){
          self.setState({
            employeeVoteCount: self.state.employeeVoteCount - 1
          })
        }
        // console.log(self.state);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  render() {
    var comment;
    if(this.state.commentCount === 1){
      comment = "Comment"
    }
    else{
      comment = "Comments"
    }
    
    return (
      <div className="container row">
        <div className="row feature-detail">
          <div className="col-1 feature-count">

            {this.state.upvoted === false ? (
            <button onClick={this.toggleDivUpvote}  title="upvote">
              <i className="fas fa-angle-up"></i>
            </button>
            ):
                <button className="inactive">
                  <i className="fas fa-angle-up"></i>
                </button>
            }

              {this.state.role === "admin" ?
                  <div >
                      <span class="user-vote" title="User Votes">{this.state.userVoteCount}</span>
                      <p class="admin-vote">{this.state.upvotes}</p>
                      <span class="employee-vote" title="Employee Votes">{this.state.employeeVoteCount}</span>
                  </div> :
                  <p>{this.state.upvotes}</p>
              }

            {this.state.upvoted === true ? (
              <button onClick={this.toggleDivDownVote} title="downvote">
                <i className="fas fa-angle-down"></i>
              </button>
            ) :
                <button className="inactive">
                  <i className="fas fa-angle-down"></i>
                </button>
            }

          </div>
          <div className="col-7 feature-text">
            <h3>{this.state.featureTitle}</h3>
            <p>{this.state.description}</p>
          </div>
            {this.state.imageUrls.length > 0 ?
                    <div className="col-4 feature-detail-image">
                      <Carousel>
                        {this.state.imageUrls.map(imageUrl => (
                          <div>
                          <img src={imageUrl}/>
                          </div>
                        ))}
                      </Carousel>
                    </div>
              : null
              }
        </div>

        <hr />

        <div className="comment-section">

            <div className="row">
                <div className="col-11 FDV-comment-count">
                    <h4 className="comment-count">{comment}: {this.state.commentCount}</h4>
                </div>
                <div className="col-1 add-button"  id="form-button" >
                    <button onClick={this.toggleShowForm} className="add"title="Add comment">
                        <i className="fas fa-plus"></i>
                    </button>
                </div>
            </div>
            {this.state.showForm ? (
                <CommentForm 
                featureId={this.props.match.params.featureId}
                toggleShowForm={this.toggleShowForm}
                role={this.state.role}
                email={this.state.email}
                />
            ): null}

          {this.state.comments.map(comment => (
            <Comment
              author={comment.name}
              content={comment.content}
              accepted={comment.accepted}
              deleted={comment.deleted}
              date={comment.dateCreated}
              count={this.state.commentCount}
              imageUrls={comment.imageUrls}
              commentId={comment._id}
              role={this.state.role}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default withRouter(FeatureDetailView);
