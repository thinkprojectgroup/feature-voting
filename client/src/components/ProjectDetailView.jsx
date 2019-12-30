import React, { Component } from "react";
import FeaturePDV from "./FeaturePDV";
import axios from "axios";
import config from '../config';

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
  
  componentDidMount() {
    axios.get(
      config.url + `/api/projects/` + this.state.projectId
    )
    .then(response => {
      this.setState({ 
        features: response.data.features,
        name: response.data.name,
        projectId: response.data._id});
    })
  }

  render() {
    return (
      <div className="container row">
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
}
export default ProjectDetailView;
