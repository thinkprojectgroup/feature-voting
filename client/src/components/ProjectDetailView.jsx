import React, { Component } from "react";
import FeaturePDV from "./FeaturePDV";
import axios from "axios";

class ProjectDetailView extends Component {
  state = {
    features: [],
    name: "",
    comments: ""
  };
  render() {
    return (
      <div className="container">
        <h1>{this.state.name}</h1>
        {this.state.features.map(feature => (
          <FeaturePDV
            id={feature._id}
            count={feature.voteCount}
            title={feature.headline}
            description={feature.description}
            commentCount={0}
          />
        ))}
      </div>
    );
  }
  async componentDidMount() {
    const promise = await axios.get(
      `http://localhost:3000/api/projects/5debb2971c768b066eb9bca0`
      
    );
    const features = promise.data.features;
    const name = promise.data.name;
    this.setState({ features });
    this.setState({ name });
  }
}
export default ProjectDetailView;
