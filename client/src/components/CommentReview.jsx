import React,{Component} from 'react';
import axios from 'axios';
import config from '../config';
import CommentCR from './CommentCR';


class CommentReview extends Component{
    constructor(props){
    super(props);

    this.state = {
        comments: [],
    };
    }


    componentDidMount(){
    axios.get(config.url + "/api/comments/")
    .then(res => {
        const comments = res.data; 
        this.setState({comments: comments});
        console.log(this.state)
    })
    .catch(error =>{
        console.log(error)
    });

    }


    render(){
        console.log(this.state.comments);
        return(
                <div className="comment-section container row">
                    {this.state.comments.map(comment => (
                    <CommentCR 
                        commentId={comment._id}
                        name={comment.name}
                        content={comment.content}
                        date={comment.date}
                    />
                    ))} 
                </div>                     
        );
    }
}

export default CommentReview;