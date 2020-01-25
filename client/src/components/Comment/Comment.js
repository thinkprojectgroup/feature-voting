import React,{Component} from 'react';
import { Carousel } from 'react-responsive-carousel';
import axios from "axios";

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
        showResponse: false,
        role: this.props.role
    };
    //console.log(this.state.date);
    //console.log(this.state);
}

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
    // console.log(this.state);
    }

    handleDelete = () => {
        var self = this;
        // console.log(comment._id)
        axios
          .delete(
            "/api/comments/" + this.state.commentId
          )
          .then(function(response) {
            console.log(response);
            self.setState({
              deleted: true
            });
            self.setState({ showResponse: false })
          })
          .catch(function(error) {
            console.log(error);
          });
      };
      openDialog  = () => {
        var self = this;
        self.setState({ showResponse: true } );
     }
      handleClose = () => this.setState({ showResponse: false })

    render(){
        let images
        if(!this.state.imageUrls){
            images = null;
        }
        else{
            images = this.state.imageUrls
        }
        return(

            <div className="comment-container col-12 row">
                {!this.state.deleted ?(
                    <div>
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
                                        <Carousel showThumbs={false}>
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
                            <button onClick={() => this.openDialog()} >
                                <i className="fas fa-times"></i>
                            </button>
                        </div>: null}

                        {this.state.showResponse ?
                            <div className="form-response">
                                <p className="col-10">
                                    Are you sure you want to delete the comment
                                </p>
                                <button className="submit-small col-2" onClick={() => this.handleDelete()}>
                                    Yes
                                </button>
                                <button className="submit-small col-2" onClick={() => this.handleClose()}>
                                    No
                                </button>
                            </div>:null}
                    </div>
                ) :null}
            </div>

        );
    }

}

export default Comment