import React, { Component } from "react";
import FeaturePDV from "../Feature/FeaturePDV";
import FeatureForm from "../FeatureForm";
import axios from "axios";
import config from "../../config";
import { Button } from "reactstrap";

class ProjectDetailView extends Component {
  constructor(props) {
    super(props);

    console.log("props", this.props);

    this.state = {
      features: [],
      name: "",
      comments: "",
      projectId: "",
      showForm: false
    };

    this.toggleShowForm = this.toggleShowForm.bind(this);
  }

  toggleShowForm = () => {
    this.setState({ showForm: !this.state.showForm });
    console.log(this.state.showForm);

    document.getElementById("form-button").classList.toggle("cross");
  };

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

  render() {
    return (
      <div className="container row">
        <div className="row">
          <div className="col-11">
            <h1>{this.state.name}</h1>
          </div>
          <div className="col-1">
            <button onClick={this.toggleShowForm} className="add" id="form-button" title="create a new feature">
              <i className="fas fa-plus"></i>
            </button>
          </div>
        </div>
        {this.state.showForm ? (
          <FeatureForm projectId={this.state.projectId} />
        ) : null}

        {this.state.features.map(feature => (
          <FeaturePDV
            featureId={feature._id}
            count={feature.voteCount}
            title={feature.headline}
            description={feature.description}
            commentCount={0}
            projectId={this.state.projectId}
            upvoted = {feature.upvoted}
          />
        ))}
      </div>
    );
  }
}
export default ProjectDetailView;
