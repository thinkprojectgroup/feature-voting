import React, { Component } from "react";
import axios from "axios";
import { BrowserRouter as Router, Link } from "react-router-dom";
import config from "../config";
import { Button } from "reactstrap";
import FeatureFR from "./FeatureFR";

class FeatureReview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      features: [],
      projectId: this.props.projectId
    };
  }

  render() {
    var image = require("./img/computer.png");

    return (
      <div>
        <h1>{"Accept or decline Features"}</h1>
        {this.state.features.map(feature =>
          !feature.acceptedStatus && !feature.deleted ? (
            <FeatureFR
              featureId={feature._id}
              title={feature.headline}
              acceptedStatus={feature.acceptedStatus}
              deleted={feature.deleted}
              description={feature.description}
              projectId={this.state.projectId}
            />
          ) : null
        )}
      </div>
    );
  }

  componentDidMount() {
    axios
      .get(config.url + `/api/projects/` + this.props.projectId)
      .then(response => {
        this.setState({
          features: response.data.features
        });
      });
  }
}

export default FeatureReview;
