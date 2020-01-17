import React,{Component} from 'react';
import axios from 'axios';
import {Button} from 'reactstrap';
import {Link} from 'react-router-dom';
import config from '../../config';



class CommentCR extends Component{
    constructor(props){
    super(props);

    this.state = {
        commentId: this.props.commentId,
        commentName: this.props.name,
        commentContent: this.props.content,
        commentDate: this.props.date,
        clicked: false,
        formattedDate: '',
        featureId: this.props.featureId,
        projectName: this.props.projectName,
        featureName: this.props.featureName
    };
    }
   
    componentDidMount = () => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(this.state.commentDate).toLocaleDateString('de-DE', options);
    this.setState({
       formattedDate: date
    });
    }
    
    handleAccept = () => {
        var self = this; 
        axios.patch("/api/comments/" + this.state.commentId)
        .then(function (response) {
        console.log(response);
        self.setState({
            clicked: true
        })
        })
        .catch(function (error) {
        console.log(error);
        });
    }

    handleDelete = () => {
        var self = this; 
         // console.log(comment._id)
        axios.delete("/api/comments/" + this.state.commentId)
        .then(function (response) {
            console.log(response);
            self.setState({
                clicked: true
            })
          })
        .catch(function (error) {
            console.log(error);
          });
    }


    render(){
        return( 
            <div>

                {!this.state.clicked ?

                    <div className="comment-section-item col-12"> 

                        <div className="comment-section-button col-1">
                            <Button className="accept" onClick={() => this.handleAccept()}><i className="fas fa-check"></i></Button>
                            <Button className="decline" onClick={() => this.handleDelete()}><i className="fas fa-times"></i></Button>
                        </div>

                        <div className="comment-section-content col-11">
                            <p className="comment-author">{!this.state.commentName ? "Anonymous" : this.state.commentName}</p>
                            <p className="comment-content">{this.state.commentContent}</p>
                            <p className="comment-date">{this.state.formattedDate}</p>
                            <Link to={"/" + this.state.projectName.split(" ").join("-")}>
                                <p className="comment-project-link">Projekt: {this.state.projectName}</p>
                            </Link>
                            <Link to={"/" + this.state.projectName.split(" ").join("-") + "/" + this.state.featureId}>
                                <p className="comment-feature-link">Feature: {this.state.featureName}</p>
                            </Link>
                        </div>

                    </div> 

                : null}

            </div>                    
        );
    }
}

export default CommentCR;