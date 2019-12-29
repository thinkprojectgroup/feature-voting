import React, { Component } from "react";
import FeaturePDV from "../Feature/FeaturePDV";
import axios from "axios";
import { Link } from "react-router-dom";

class ProjectDetailView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      features: [],
      name: "",
      comments: "",
      projectId: this.props.match.params.projectId
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
    try {
      const response = await axios.get(
        `http://localhost:3000/api/projects/` + this.state.projectId
      );

      this.setState ({
        features : response.data.features,
        name: response.data.name,
        projectId: response.data._id
      })
    } catch (error) {
      console.log(error);
    }
  }
}
export default ProjectDetailView;
