import React, { Component } from "react";
import FeaturePDV from "./FeaturePDV";
import FeatureForm from "./FeatureForm";
import axios from "axios";
import { BrowserRouter as Router, Link } from "react-router-dom";
import config from '../config';
import { Button } from "reactstrap";

class ProjectDetailView extends Component {
  constructor(props) {
    super(props);
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
    const {showForm} = this.state.showForm;
    this.setState({showForm: !showForm});
    console.log(this.state.showForm);
  }


  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-11">
            <h1>{this.state.name}</h1>
          </div>
          <div className="col-1">
            <button onClick={this.toggleShowForm} className="add">
              <i className="fas fa-plus"></i>
            </button>
          </div>
        </div>

        {this.state.showForm ? (
          <FeatureForm projectId={this.state.projectId} />
          ): null}
        

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
    const promise = await axios.get(
      config.url + `/api/projects/` + this.props.match.params._id
    );
    const features = promise.data.features;
    const name = promise.data.name;
    const _id = promise.data._id;
    this.setState({ features });
    this.setState({ name });
    this.setState({ projectId: _id});
    console.log(this.state.projectId);
  }
}
export default ProjectDetailView;
