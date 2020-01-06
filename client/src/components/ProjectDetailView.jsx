import React, { Component } from "react";
import FeaturePDV from "./FeaturePDV";
import axios from "axios";
import { BrowserRouter as Router, Link } from "react-router-dom";
import config from "../config";
import FeatureReview from "./FeatureReview";
import AdminRights from "./AdminRights";

class ProjectDetailView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      features: [],
      name: "",
      projectId: "",
      commentCount: ""
    };
  }
  render() {
    return (
      <div>
        <div className="container">
          <h1>{this.state.name}</h1>
          {this.state.features.map(feature =>
            feature.acceptedStatus && !feature.deleted ? (
              <FeaturePDV
                featureId={feature._id}
                count={feature.voteCount}
                title={feature.headline}
                acceptedStatus={feature.acceptedStatus}
                deleted={feature.deleted}
                description={feature.description}
                projectId={this.state.projectId}
              />
            ) : null
          )}
        </div>
      </div>
    );
  }
  componentDidMount() {
    axios
      .get(config.url + `/api/projects/` + this.props.match.params.projectId)
      .then(response => {
        this.setState({
          features: response.data.features,
          name: response.data.name,
          projectId: response.data._id
        });
      });
  }
}
export default ProjectDetailView;
