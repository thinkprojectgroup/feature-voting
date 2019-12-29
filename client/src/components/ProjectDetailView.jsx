import React, { Component } from "react";
import FeaturePDV from "./FeaturePDV";
import FeatureForm from "./FeatureForm";
import axios from "axios";
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
        <Button
              onClick={this.toggleShowForm}
              className="show-feature-form-button"
        > Add Feature</Button>
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

}
export default ProjectDetailView;
