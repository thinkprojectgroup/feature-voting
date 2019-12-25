import React, { Component } from "react";
import FeaturePDV from "../Feature/FeaturePDV";
import axios from "axios";
import { BrowserRouter as Router, Link } from "react-router-dom";
import config from '../config';

class ProjectDetailView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      features: [],
      name: "",
      comments: "",
      projectId: ""
    };
  }
  render() {
    return (
      <div className="container">
        <h1>{this.state.name}</h1>
        {this.state.features.map(feature => (
          <FeaturePDV
            featureId={feature._id}
            count={feature.voteCount}
            title={feature.headline}
            description={feature.description}
            commentCount={0}
            projectId={this.state.projectId}
          />
        ))}
      </div>
    );
  }
  async componentDidMount() {
    
    await axios.get(
      `http://localhost:3000/api/projects/` + this.props.match.params._id
    )
    .then(response => response.data)
    .then(data => {
      this.setState ({
        features : data.features,
        name: data.name,
        projectId: data._id
      })
    })
  }
}
export default ProjectDetailView;
