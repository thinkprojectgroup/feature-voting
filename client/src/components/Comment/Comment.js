import React,{Component} from 'react';
import { Carousel } from 'react-responsive-carousel';
import axios from "axios";
import {confirmAlert} from "react-confirm-alert";
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

class Comment extends Component{
    constructor(props){
    super(props);
    this.state = {
        author: this.props.author,
        content : this.props.content,
        accepted: this.props.accepted,
        deleted: this.props.deleted,
        date: this.props.date,
        count: this.props.count,
        formattedDate: '',
        imageUrls: this.props.imageUrls,
        commentId: this.props.commentId,
        role: this.props.role

    };
}



    submit = () => {
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <div className='modal row'>
                        <h1>Delete Comment</h1>
                        <p>Are you sure you want to delete this comment?</p>
                        <div className="row">
                            <button onClick={onClose} className="col-6 not-confirm-delete">Cancel</button>
                            <button className=" col-6 confirm-delete"
                                    onClick={() => {
                                        this.handleDelete();
                                        onClose();
                                    }}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                );
            }
        });
    };

    componentDidMount = () => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(this.state.date).toLocaleDateString('de-DE', options);
    this.setState({
       formattedDate: date
    });

    if(!this.state.author){
        this.setState({
            author: "Anonymous"
        })
    };
    }

    handleDelete = () => {
        var self = this;
        axios
          .delete(
            "/api/comments/" + this.state.commentId
          )
          .then(function(response) {
            self.setState({
              deleted: true
            });
          })
          .catch(function(error) {});
      };

    render(){
        let images
        if(!this.state.imageUrls){
            images = null;
        }
        else{
            images = this.state.imageUrls
        }
        return(


            <div >
                {!this.state.deleted ?(
                    <div className="comment-container col-12 row">
                        {images === null
                            ? (
                                <div>
                                    <div className="col-9">
                                        <p className="comment-author">{this.state.author}</p>
                                        <p className="comment-content">{this.state.content}</p>
                                        <p  className="comment-date">
                                            {this.state.formattedDate}
                                        </p>
                                    </div>
                                </div>)

                            :(
                                <div>
                                    <div className="col-9">
                                        <p className="comment-author">{this.state.author}</p>
                                        <p className="comment-content">{this.state.content}</p>
                                        <p  className="comment-date">
                                            {this.state.formattedDate}
                                        </p>
                                    </div>
                                    <div className="comment-images col-3">
                                        <Carousel showThumbs={false} dynamicHeight={true}>
                                            {images.map(imageUrl => (
                                                <div>
                                                    <img src={imageUrl}/>
                                                </div>
                                            ))}
                                        </Carousel>
                                    </div>
                                </div>
                            )}
                        
                        {this.state.role === "admin" ?  
                        <div className="delete">
                        <button onClick={() => this.submit()} title="Delete comment">
                            <i className="fas fa-times"></i>
                        </button>
                        </div>
                        :null}
                </div>
                ) :null}
            </div>

        );
    }

}

export default Comment
