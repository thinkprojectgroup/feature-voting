import React,{Component} from 'react';
import axios from 'axios';
import {Button} from 'reactstrap';
import {Link} from 'react-router-dom';
import config from '../../config';
import { Carousel } from 'react-responsive-carousel';


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
            featureName: this.props.featureName,
            imageUrls: this.props.imageUrls
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
                self.props.removeComment(self.state.commentId)
            })
            .catch(function (error) {
                console.log(error.response);
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
                self.props.removeComment(self.state.commentId)
            })
            .catch(function (error) {
                console.log(error.response);
            });
    }


    render(){

        let loginName="";

        if(this.state.commentName.includes('@')){
            var emailAddress = this.state.commentName;



            var loginNameArray = (emailAddress.substring(0, emailAddress.indexOf("@"))).split(".");

            for(var i = 0; i < loginNameArray.length; i++){
                loginName += loginNameArray[i].charAt(0).toUpperCase() + loginNameArray[i].slice(1)+" ";
            }
        }

        var images
        if(!this.state.imageUrls){
            images = null;
        }
        else{
            images = this.state.imageUrls
        }
        return(
            <div>

                {!this.state.clicked ?

                    <div className="comment-section-item col-12 row">

                        <div className="comment-section-button col-1">
                            <Button className="accept" onClick={() => this.handleAccept()} title="Accept"><i className="fas fa-check"></i></Button>
                            <Button className="decline" onClick={() => this.handleDelete()} title="Decline"><i className="fas fa-times"></i></Button>
                        </div>
                        {images === null || images === undefined ?(
                                <div className="comment-section-content col-11">
                                    <div className="row">
                                        <p className="comment-author">{loginName != ""? loginName : !this.state.commentName ? "Anonymous" : this.state.commentName}</p>
                                        <p className="comment-project-link" title="Show project">Project: {" "}
                                            <Link to={"/" + this.state.projectName.split(" ").join("-")} >
                                                {" " + this.state.projectName}
                                            </Link>
                                        </p>
                                        <p className="comment-feature-link" title="Show feature"> Feature: {" "}
                                            <Link to={"/" + this.state.projectName.split(" ").join("-") + "/" + this.state.featureId} >
                                                {this.state.featureName}
                                            </Link>
                                        </p>
                                    </div>
                                    <p className="comment-content">{this.state.commentContent}</p>
                                    <p className="comment-date">{this.state.formattedDate}</p>
                                </div>
                            )
                            :(
                                <div  className="row">
                                    <div className="comment-section-content col-8">
                                        <div className="row">
                                            <p className="comment-author">{loginName != ""? loginName : !this.state.commentName ? "Anonymous" : this.state.commentName}</p>
                                            <p className="comment-project-link">Project: {" "}
                                                <Link to={"/" + this.state.projectName.split(" ").join("-")} >
                                                    {" " + this.state.projectName}
                                                </Link>
                                            </p>
                                            <p className="comment-feature-link"> Feature: {" "}
                                                <Link to={"/" + this.state.projectName.split(" ").join("-") + "/" + this.state.featureId} >
                                                    {this.state.featureName}
                                                </Link>
                                            </p>
                                        </div>
                                        <p className="comment-content">{this.state.commentContent}</p>
                                        <p className="comment-date">{this.state.formattedDate}</p>
                                    </div>
                                    <div className="col-3">
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
                    </div>

                    : null}

            </div>
        );
    }
}

export default CommentCR;
