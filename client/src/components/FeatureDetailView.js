import React, {Component} from 'react';
import {Button} from 'reactstrap';
import axios from 'axios';
import "./css/FeatureDetailView.css";
import "./css/font-awesome-4.7.0/css/font-awesome.min.css";



class FeatureDetailView extends Component{

   constructor(props){
       super(props);

       this.state = {show : true}; 
        this.toggleDivUpvote = this.toggleDivUpvote.bind(this);
        this.toggleDivDownVote = this.toggleDivDownVote.bind(this);

       this.state = {
        projectTitle: "",
        featureTitle: "",
        description: "",
        image: "",
        upvotes: 0
      }
   }

   componentDidMount() {
    /*
    axios.get(`https://jsonplaceholder.typicode.com/users`)
      .then(res => {
        const persons = res.data;
        console.log(persons);
        this.setState({ persons });
      })
      */

    

    axios.get("http://localhost:3000/api/features/5dd5696adce5622e749805c9/" + this.props.match.params.featureId)
    .then(res => {
      const feature = res.data;
      
      this.setState({featureTitle: feature.headline});
      this.setState({description: feature.description});
      this.setState({upvotes: feature.voteCount});
      console.log(feature);
    })

     

  }

   toggleDivUpvote = () => {
       const{show} = this.state;
       this.setState({show: !show});
       this.setState({upvotes: this.state.upvotes + 1});
   }

   toggleDivDownVote = () => {
    const{show} = this.state;
    this.setState({show: !show});
    this.setState({upvotes: this.state.upvotes - 1});
}




    render(){
        return (

        <div className="feature-detail-container container">
            <div className="row feature-detail-header">
                <h1 className="col-8">{this.state.projectTitle}</h1>
                <Button className="col-4" color="primary">Back</Button>
            </div>
            <div className="row feature-detail">
                <div className="col-2 feature-detail-vote">
                    <Button onClick= {this.toggleDivUpvote} className="feature-upvote-button">
                        <i className="fas fa-angle-up"></i>
                    </Button>
                    <p>{this.state.upvotes}</p>
                    {this.state.show ? <button onClick={this.toggleDivDownVote} className="feature-downvote-button"> 
                        <i className="fas fa-angle-up"></i> 
                    </button> : null}
                </div>
                <div className="col-7 feature-detail-text">
                    <h4>{this.state.featureTitle}</h4>
                    <p>{this.state.description}</p>
                </div>
                <div className="col-3 feature-detail-image">
                    
                </div>
            </div>
        </div>
        );  
    }  
    
}


export default FeatureDetailView;