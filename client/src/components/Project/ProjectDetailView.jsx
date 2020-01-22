import React, { Component } from "react";
import FeaturePDV from "../Feature/FeaturePDV";
import FeatureForm from "../FeatureForm";
import axios from "axios";
import config from '../../config';
import FeatureReview from "../Feature/FeatureReview";

class ProjectDetailView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      features: [],
      name: "",
      comments: "",
      projectId: "",
      showForm: false,
      role: this.props.role
    };

    this.toggleShowForm = this.toggleShowForm.bind(this);
    this.sortByVoteDsc = this.sortByVoteDsc.bind(this);
  }


  toggleShowForm = () => {
    this.setState({showForm: !this.state.showForm});
    document.getElementById("form-button").classList.toggle("cross");
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

    // console.log(this.state.features);

  }



  componentDidMount() {
    //console.log(this.props.match.params);
    axios
      .get(config.url + `/api/projects/name/` + this.props.match.params.projectName.toString().split("-").join(" "))
      .then(response => {
        console.log(response);
        this.setState({
          features: response.data.features,
          name: response.data.name,
          projectId: response.data._id
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    // console.log(this.state);
    return (
        <div className="container row">
          <div className="row">
            <div className="col-11 project-name">
              <h1>{this.state.name}</h1>
            </div>
            <div className="col-1 add-button" id="form-button" title="Add feature">
              <button onClick={this.toggleShowForm} className="add">
                <i className="fas fa-plus"></i>
              </button>
            </div>
          </div>
          {this.state.showForm ? (
              <FeatureForm 
              projectName={this.props.match.params.projectName.toString().split("-").join(" ")} 
              toggleShowForm={this.toggleShowForm}
              />
          ): null}

          {this.state.features.sort((a,b) => b.voteCount - a.voteCount)
          .map((feature, index) => (
              <FeaturePDV
                  featureId={feature._id}
                  count={feature.voteCount}
                  title={feature.headline}
                  description={feature.description}
                  commentCount={feature.commentCount}
                  projectId={this.state.projectId}
                  upvoted = {feature.upvoted}
                  projectName = {this.props.match.params.projectName.toString().split("-").join(" ")}
                  imageUrls = {feature.imageUrls}
                  role = {this.state.role}
              />
              ))}


          < hr/>
          {this.state.role === "admin" ? 
          <FeatureReview
              projectName={this.props.match.params.projectName
                  .toString()
                  .split("-")
                  .join(" ")}
              projectId={this.state.projectId}
          />
          :null}
        </div>
    );
  }

}
export default ProjectDetailView;