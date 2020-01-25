import React, { Component } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import axios from "axios";
import config from '../../config';
//import beispiel from "./img/computer.png";
import ReadMoreAndLess from 'react-read-more-less';


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
      showResponse: false,
      role: this.props.role,
      employeeVoteCount: this.props.employeeVoteCount,
      userVoteCount: this.props.userVoteCount

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
              count: self.state.count + 1
            });

            if(self.state.role === "admin"){
              self.setState({
                employeeVoteCount: self.state.employeeVoteCount + 1
              })
            }
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

  openDialog  = () => {
    var self = this;
    self.setState({ showResponse: true } );
  }
  handleClose = () => this.setState({ showResponse: false })

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
          console.log(error);
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

                  <p>{this.state.count}</p>
                    {this.state.role === "admin" ?
                      <div >
                        <p>Uservotes: {this.state.userVoteCount}</p>
                        <p>Employeevotes: {this.state.employeeVoteCount}</p>
                      </div> : null}

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
                  <button onClick={() => this.openDialog()} >
                    <i className="fas fa-times"></i>
                  </button>
                </div> : null }
                {this.state.showResponse ?
                    <div className="form-response-delete">
                      <p className="col-10">
                        Are you sure you want to delete the feature
                      </p>
                      <button className="submit col-2" onClick={() => this.handleDelete()}>
                        Yes
                      </button>
                      <button className="submit col-2" onClick={() => this.handleClose()}>
                        No
                      </button>




                    </div>:null

                }
              </div>
          ):null}

        </div>
    );
  }

}

export default FeaturePDV;