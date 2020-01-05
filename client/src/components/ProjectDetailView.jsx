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
      showForm: false,
    };

    this.toggleShowForm = this.toggleShowForm.bind(this);
    this.sortByVoteDsc = this.sortByVoteDsc.bind(this);
  }


  toggleShowForm = () => {
    this.setState({showForm: !this.state.showForm});
    // console.log(this.state.showForm);
  }

  sortByVoteDsc=()=>{

    let sortedFeaturesDsc;
    sortedFeaturesDsc = this.state.features.sort((a,b)=>{
       return parseInt(b.voteCount) - parseInt(a.voteCount);
    })

    this.setState({
        features: sortedFeaturesDsc
    })

    console.log(this.state.features);

  }



  componentDidMount() {

    axios.get(
        config.url + `/api/projects/` + this.props.match.params.projectId
    )
        .then(response => {
          console.log(response);
          this.setState({
            features: response.data.features,
            name: response.data.name,
            projectId: response.data._id,
          });
          // console.log(this.state.features);
        })
  }

  render() {
    return (
        <div className="container row">
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

          {this.state.features.sort((a,b) => b.voteCount - a.voteCount)
          .map(feature => (
              <FeaturePDV
                  featureId={feature._id}
                  count={feature.voteCount}
                  title={feature.headline}
                  description={feature.description}
                  commentCount={0}
                  projectId={this.state.projectId}
                  upvoted = {feature.upvoted}
                  reSort = {this.sortByVoteDsc}
              />
              ))}
        </div>
    );
  }

}
export default ProjectDetailView;