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
    render(){

        return(
            <div className className="comment-section col-12 row">
                {this.state.comments.map(comment => (
                    <div className="comment-section-container row col-12">
                        {!comment.deleted ?
                        <div className="comment-section-content col-8">
                            <p>{comment.count}</p>
                            <p>{comment.author}</p>
                            <p>{comment.content}</p>
                            <p>{comment.date}</p>
                        <div className="comment-section-button col-4">
                            <Button>Accept</Button>
                            <Button>Decline</Button>
                        </div>
                        </div> : null}   
                    </div>
                ))}
            </div>                        
        );
    }

}

export default CommentReview