import React, { Component } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import axios from "axios";
import config from '../../config';
//import beispiel from "./img/computer.png";
import ReadMoreAndLess from 'react-read-more-less';
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css';


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
      upvoted: this.props.upvoted,
      projectName: this.props.projectName,
      imageUrls: this.props.imageUrls,
      deleted: false,      
      role: this.props.role,
      employeeVoteCount: this.props.employeeVoteCount,
      userVoteCount: this.props.userVoteCount


        };


    this.handleUpVote = this.handleUpVote.bind(this);
    this.handleDownVote = this.handleDownVote.bind(this);
  }
  
  submit = () => {
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <div className='modal row'>
                        <h1>Delete Feature</h1>
                        <p>Are you sure you want to delete this feature?</p>
                        <div className="row">
                            <button onClick={onClose} className="col-6 not-confirm-delete">No</button>
                            <button className=" col-6 confirm-delete"
                                    onClick={() => {
                                        this.handleDelete();
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
      console.log(error.response);
      });



  handleDownVote = () => {
    var self = this;
    axios.patch(config.url + "/api/features/vote/" + this.state.featureId)
        .then(function (response) {
          console.log(response);
          self.setState({
            upvoted: false,
            count: self.state.count - 1
          });

          if(self.state.role === "admin"){
            self.setState({
              employeeVoteCount: self.state.employeeVoteCount - 1
            })
          }
          //  console.log(self.state);
        })
        .catch(function (error) {
          console.log(error);
        });

  };

 

  handleDelete = () => {
    var self = this;
    // console.log(comment._id)
    axios
        .delete(
            "/api/features/" + this.state.projectName + "/" + this.state.featureId
        )
        .then(function(response) {
          console.log(response);
          self.setState({
            deleted: true
          });
        })
        .catch(function(error) {
          console.log(error.response);
        });
  };

    render() {
        // TODO: Add real imagadata later
        let image;
        if(!this.state.imageUrls){
            image = null;
        }
        else{
            image = this.state.imageUrls[0];
        }
        //  console.log(this.props.projectId);
        var comment;
        if(this.state.commentCount === 1){
            comment = "comment"
        }
        else{
            comment = "comments"
        }

        let description = this.state.description;

        return (
            <div>
                {this.state.deleted === false ? (
                    <div className="row feature-list-item">
                        <div className="col-1 feature-count">

                            {this.state.upvoted === false ?
                                <button
                                    onClick={this.handleUpVote.bind(this)} title="upvote">

                                    <i className="fas fa-angle-up"></i>

                                </button>
                                :
                                <button className="inactive">
                                    <i className="fas fa-angle-up"></i>
                                </button>
                            }

                            {this.state.role === "admin" ?
                                <div >
                                    <span class="user-vote" title="User Votes">{this.state.userVoteCount}</span>
                                    <p class="admin-vote">{this.state.count}</p>
                                    <span class="employee-vote" title="Employee Votes">{this.state.employeeVoteCount}</span>
                                </div> :
                                <p>{this.state.count}</p>
                            }

                            {this.state.upvoted === true ?
                                <button
                                    onClick={this.handleDownVote.bind(this)} title="downvote">

                                    <i className="fas fa-angle-down"></i>
                                </button>
                                :
                                <button className="inactive">
                                    <i className="fas fa-angle-down"></i>
                                </button>
                            }
                        </div>

                        {image === null || image === undefined

                            ?(
                                <div className="col-8 feature-text">
                                    <Link to={"/" + this.state.projectName.split(" ").join("-") + "/" + this.state.featureId}>
                                        <div className="title">

                                            <h3>{this.state.title}</h3>{" "}
                                        </div>
                                    </Link>
                                    <div className="description">

                                        <ReadMoreAndLess
                                            ref={this.ReadMore}
                                            className="read-more-content"
                                            charLimit={160}
                                            readMoreText="Read more"
                                            readLessText="Read less"
                                        >
                                            {description}
                                        </ReadMoreAndLess>
                                    </div>
                                    <Link to={"/" + this.state.projectName.split(" ").join("-") + "/" + this.state.featureId}>
                                        <div className="comment-count">
                                            <p>{this.state.commentCount} comments</p>
                                        </div>
                                    </Link>
                                </div>)

                            :(
                                <div >
                                    <div className="col-8 feature-text">
                                        <Link to={"/" + this.state.projectName.split(" ").join("-") + "/" + this.state.featureId}>
                                            <div className="title">

                                                <h3>{this.state.title}</h3>{" "}
                                            </div>
                                        </Link>
                                        <div className="description">

                                            <ReadMoreAndLess
                                                ref={this.ReadMore}
                                                className="read-more-content"
                                                charLimit={160}
                                                readMoreText="Read more"
                                                readLessText="Read less"
                                            >
                                                {description}
                                            </ReadMoreAndLess>
                                        </div>

                                        <Link to={"/" + this.state.projectName.split(" ").join("-") + "/" + this.state.featureId}>
                                            <div className="comment-count">
                                                <p>{this.state.commentCount} {comment}</p>
                                            </div>
                                        </Link>
                                    </div>
                                    <Link to={"/" + this.state.projectName.split(" ").join("-") + "/" + this.state.featureId}>
                                        <div
                                            className="col-3 feature-image"
                                            style={{backgroundImage: "url(" + image + ")"}} >
                                        </div>
                                    </Link>

                                </div>

                    )}
                  {this.state.role === "admin" ?
                    <div className="delete">
                      <button onClick={() => this.submit()} title="Delete feature">
                          <i className="fas fa-times"></i>
                      </button>
                   </div> : null }
              </div>
          ):null}
            </div>
    );
                }}

export default FeaturePDV;