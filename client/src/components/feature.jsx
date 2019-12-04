import React, { Component } from "react";

//import ReadMoreAndLess from "react-read-more-less";

class Feature extends Component {
  state = {
    count: this.props.count,
    title: this.props.title,
    description: this.props.description,
    commentCount: this.props.commentCount
  };
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="row"></div>
            <div className="row">{this.state.count}</div>
          </div>
          <div className="col">
            <div className="row">
              <h2>{this.state.title}</h2>
            </div>
            <div className="row">{this.state.description}</div>
            <div className="row">{this.state.commentCount} comments</div>
          </div>
          <div className="col">Picture</div>
        </div>
      </div>
    );
  }
}

export default Feature;
