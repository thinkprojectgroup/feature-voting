import React, {Component} from 'react';
import {Button} from 'reactstrap';
import axios from 'axios';
import {Link} from "react-router-dom"
import "./css/FeatureDetailView.css";
import "./css/font-awesome-4.7.0/css/font-awesome.min.css";



class FeatureDetailView extends Component{

   constructor(features){
       super(features);

       this.state = {show : true}; 
        this.toggleDivUpvote = this.toggleDivUpvote.bind(this);
        this.toggleDivDownVote = this.toggleDivDownVote.bind(this);

       this.state = {
        features: 
        {
        projectTitle: "Something",
        featureTitle: "Outlook Integration for Calender Events and Meetings",
        description: "You could integrate your Events and Meetings into your existing Outlook Calender with only oneclick. WHen you integrate Outlook and Salesforce, you help your reps spend less time entering data and switching between two applications. You also help sales teams track important email conversations relevant to Salesforce records.",
        image: "",
        upvotes: 159
        }
      }
   }

   componentDidMount() {
    axios.get(`localhost:3000/api/features/1`)
      .then(res => {
        const projects = res.data;
        console.log(projects);
      })
  }

   toggleDivUpvote = () => {
       const{show} = this.state;
       this.setState({show: !show});
       this.state.features.upvotes += 1;
   }

   toggleDivDownVote = () => {
    const{show} = this.state;
    this.setState({show: !show});
    this.state.features.upvotes -= 1;
}




    render(){
        return (

        <div className="feature-detail-container">
            <div className="row feature-detail-header">
                <h1 className="col-8">{this.state.features.projectTitle}</h1>
                <Link to="/projectDetailView"><Button color="primary">Back</Button></Link>
            </div>
            <div className="row feature-detail">
                <div className="col-2 feature-detail-vote">
                    <Button onClick= {this.toggleDivUpvote} className="feature-upvote-button">
                        <i class="fas fa-angle-up"></i>
                    </Button>
                    <p>{this.state.features.upvotes}</p>
                    {this.state.show ? <button onClick={this.toggleDivDownVote} className="feature-downvote-button"> 
                        <i class="fas fa-angle-up"></i> 
                    </button> : null}
                </div>
                <div className="col-7 feature-detail-text">
                    <h4>{this.state.features.featureTitle}</h4>
                    <p>{this.state.features.description}</p>
                </div>
                <div className="col-3 feature-detail-image">
                    <img className="img" src="./img/computer.png" alt="img"></img>
                </div>
            </div>
        </div>
        );  
    }  
    
}


export default FeatureDetailView;