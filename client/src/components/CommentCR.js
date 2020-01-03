import React,{Component} from 'react';
import axios from 'axios';
import {Button} from 'reactstrap';



class CommentCR extends Component{
    constructor(props){
    super(props);

    this.state = {
        commentId: this.props.commentId,
        commentName: this.props.name,
        commentContent: this.props.content,
        commentDate: this.props.date
    };
    console.log("Hello");
    }
   
    

    

    handleAccept = (comment) => {
        var self = this; 
        axios.patch("/api/comments/" + this.state.commentId)
        .then(function (response) {
        console.log(response);
        })
        .catch(function (error) {
        console.log(error);
        });
    }

    handleDelete = (comment) => {
        var self = this; 
         // console.log(comment._id)
        axios.delete("/api/comments/" + this.state.commentId)
        .then(function (response) {
            console.log(response);
          })
        .catch(function (error) {
            console.log(error);
          });
    }


    render(){
        console.log(this.state.commentId);
        return(
            <div className className="comment-section container row">

                    <div className="comment-section-item col-12">

                        <div className="comment-section-button col-1">
                            <Button className="accept" onClick={() => this.handleAccept()}><i className="fas fa-check"></i></Button>
                            <Button className="decline" onClick={() => this.handleDelete()}><i className="fas fa-times"></i></Button>
                        </div>

                        <div className="comment-section-content col-11">
                            <p className="comment-author">{!this.state.commentName ? "Anonymous" : this.state.commentName}</p>
                            <p className="comment-content">{this.state.commentContent}</p>
                            <p  className="comment-date">{this.state.date}</p>
                        </div>

                    </div>
            </div>                        
        );
    }
}

export default CommentCR;