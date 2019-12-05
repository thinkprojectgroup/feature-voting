import React, { Component } from "react";
import {BrowserRouter as Router, Link} from 'react-router-dom'

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
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="row"></div>
            <div className="row">{this.state.count}</div>
          </div>
          <div className="col">
            <div className="row">
              <Link to={"/"+this.state.id}><h2>{this.state.title}</h2> </Link>
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

export default FeaturePDV;
