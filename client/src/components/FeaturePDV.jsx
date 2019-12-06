import React, { Component } from "react";
import {BrowserRouter as Router, Link} from 'react-router-dom';
import {Button} from "reactstrap";

//import ReadMoreAndLess from "react-read-more-less";

class FeaturePDV extends Component {

  state = {
    id: this.props.id,
    count: this.props.count,
    title: this.props.title,
    description: this.props.description,
    commentCount: this.props.commentCount
  };

  render() {

    return (
      <div className="container row">
        <div className="col-2 feature-count">
          <button onClick= {this.toggleDivUpvote} className="upvote-button">
            <i className="fas fa-angle-up"></i>
          </button>
          <p>{this.state.counts}</p>
          {this.state.show ? <button onClick={this.toggleDivDownVote} className="downvote-button">
            <i className="fas fa-angle-up"></i>
          </button> : null}
        </div>
        <div className="col-7 feature-body">
          <div className="title">
            <Link to={"/"+this.state.id}><h3>{this.state.title}</h3> </Link>
          </div>
          <div className="description">
            {this.state.description}
          </div>
          <div className="comment-count">
            {this.state.commentCount} comments
          </div>
        </div>
        <div className="col-3 feature-image">
            <img src={require('./img/computer.png')} />
        </div>
      </div>
    );
  }
}

export default FeaturePDV;
