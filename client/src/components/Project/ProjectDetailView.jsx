import React, { Component } from "react";
import { withRouter } from 'react-router-dom'
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
      showSearch: false,
      searchTerm: "",
      role: this.props.role,
      outputFeatures: [],
      empty : false
    };

    this.toggleShowForm = this.toggleShowForm.bind(this);
    this.sortByVoteDsc = this.sortByVoteDsc.bind(this);
  }


  toggleShowForm = () => {
    this.setState({showForm: !this.state.showForm});
    document.getElementById("form-button").classList.toggle("cross");
    // console.log(this.state.showForm);
  }

  toggleShowSearch = () => {
    this.setState({showSearch: !this.state.showSearch});
  }

  sortByVoteDsc = () => {
    let sortedFeaturesDsc;
    sortedFeaturesDsc = this.state.features.sort((a,b)=>{
       return parseInt(b.voteCount) - parseInt(a.voteCount);
    })

    this.setState({
        features: sortedFeaturesDsc
    })

    // console.log(this.state.features);

  }

  handleSearch = (e) => {
    // console.log(e.target.value)
    const searchTerm = e.target.value.split(" ").join("").trim().toLowerCase()
    const features = this.state.features
    var searchedFeatures = []
    if(searchTerm.length >= 3){
          for(var z = 0; z < features.length; z++){
            if(features[z].headline.split(" ").join("").toLowerCase().includes(searchTerm)){
                searchedFeatures.push(features[z])
            }
          }
    }
    else{
      this.setState({
        outputFeatures: []},
        () => this.setState({outputFeatures: features})
        )
      return;
    }
    
    this.setState({
      outputFeatures: []},
      () => this.setState({outputFeatures: searchedFeatures})
      )
  }

  componentDidMount () {

    axios
      .get(config.url + `/api/projects/name/` + this.props.match.params.projectName.toString().split("-").join(" "))
      .then(response => {
        console.log(response);
        if (response.data.features.length == 0) {
          this.setState({
            empty: true
          });
        }
        this.setState({
          features: response.data.features,
          outputFeatures: response.data.features,
          name: response.data.name,
          projectId: response.data._id,
        });
      })
      .catch(error => {
        console.log(error.response);
        this.props.redirectToErrorPage(error.response.status);
      });
  }

  render() {
    // console.log(this.state.outputFeatures);
    return (
        <div className="container row">
          <div className="row">
            {this.state.showSearch?
                <div className="col-6 project-name" id="project-name">
                  <h1>{this.state.name}</h1>
                </div>
                :
                <div className="col-10 project-name" id="project-name">
                  <h1>{this.state.name}</h1>
                </div>}
            {!this.state.empty && this.state.showSearch?(
                <div className="feature-search">
                  <input
                      type="text"
                      onChange={this.handleSearch}
                      name="searchField"
                      placeholder="Search"
                      className="col-4"
                  ></input>
                </div>) : null}
            <div className="col-1 search-button">
              <button onClick={this.toggleShowSearch} className="search">
                <i className="fas fa-search"></i>
              </button>
            </div>

            <div className="col-1 add-button" id="form-button" title="Propose new feature">
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
        {!this.state.empty ?(
          <div>
          {this.state.outputFeatures.sort((a,b) => b.voteCount - a.voteCount)
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
                  employeeVoteCount = {feature.employeeVoteCount}
                  userVoteCount = {feature.userVoteCount}
              />
              ))}
              </div>):(
                <div>
                 {!this.state.showForm ?
                <div className="placeholder">
                <h3 className="">
                   This project is still empty
                </h3>


                <button className="propose" onClick={this.toggleShowForm} >
                    Propose the first feature 
                </button>
            </div> :null}
            </div>
              )}


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
export default withRouter(ProjectDetailView);
