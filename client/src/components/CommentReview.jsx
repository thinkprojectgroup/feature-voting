import React,{Component} from 'react';
import axios from 'axios';
import {Button} from 'reactstrap';
import config from '../config';


class CommentReview extends Component{
    state = {
        comments: [],
        commentCount: 0
    };


    componentDidMount(){
    axios.get(config.url + "/api/comments/")
    .then(res => {
        const comments = res.data; 
        this.setState({comments: comments});
        this.setState({commentCount: comments.count})
    });
    }

    handleAccept = (comment) => {
        console.log(config.url + "/api/comments/" + comment._id);
        axios.patch(config.url + "/api/comments/" + comment._id)
        .then(function (response) {
        console.log(response);
        })
        .catch(function (error) {
        console.log(error);
        });
    }

    handleDelete = (comment) => {
        console.log(comment._id)
        axios.delete(config.url + "/api/comments/" + comment._id)
        .then(function (response) {
            console.log(response);
          })
        .catch(function (error) {
            console.log(error);
          });
    }


    render(){
        return(
            <div className className="comment-section container row">
                {this.state.comments.map(comment => (
                     !comment.deleted ?
                    <div className="comment-section-item col-12">

                        <div className="comment-section-button col-1">
                            <Button className="accept" onClick={() => this.handleAccept(comment)}><i className="fas fa-check"></i></Button>
                            <Button className="decline" onClick={() => this.handleDelete(comment)}><i className="fas fa-times"></i></Button>
                        </div>

                        <div className="comment-section-content col-11">
                            <p>{comment.count}</p>
                            <p className="comment-author">{comment.author}</p>
                            <p className="comment-content">{comment.content}</p>
                            <p  className="comment-date">{comment.date}</p>
                        </div>

                    </div>
                    : null))}
            </div>                        
        );
    }
}

export default CommentReview;