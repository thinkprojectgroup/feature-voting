import React, { Component } from "react";
import Feature from "./feature";
import axios from "axios";

class FeatureList extends Component {
  state = {
    features: [],
    name: "",
    comments: ""
  };
  render() {
    return (
      <div className="container-fluid">
        <h1>{this.state.name}</h1>
        {this.state.features.map(feature => (
          <Feature
            key={feature.id}
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
      `http://localhost:3000/api/projects/5dd5696adce5622e749805c9`
    );
    const features = promise.data.features;
    const name = promise.data.name;
    this.setState({ features });
    this.setState({ name });
  }
}
export default FeatureList;
