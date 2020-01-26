import React,{Component} from 'react';
import axios from 'axios';
import config from '../../config';
import CommentCR from './CommentCR';
import ReactGA from 'react-ga';


class CommentReview extends Component{
    constructor(props){
        super(props);

        this.state = {
            comments: [],
            projectNames: [],
            filteredProjectNames: [],
            featureNames: [],
            filteredFeatureNames: [],
            outputComments: []
        };
        ReactGA.pageview(window.location.pathname + window.location.search );
    }

    componentDidMount(){
        axios.get(config.url + "/api/comments/")
            .then(res => {
                const comments = res.data;
                this.setState({
                    comments: comments,
                    outputComments: comments
                });
                this.state.comments.map(comment => {
                    this.setState({
                        projectNames: this.state.projectNames.concat(comment.projectName),
                        featureNames: this.state.featureNames.concat(comment.featureName)
                    })
                })
                this.setState({
                    filteredProjectNames: this.removewithfilter(this.state.projectNames),
                    filteredFeatureNames: this.removewithfilter(this.state.featureNames)
                })
            })
            .catch(error =>{
                console.log(error)
            });
    }

    removewithfilter = (arr) => {
        let outputArray = arr.filter(function(v, i, self)
        {
            // It returns the index of the first 
            // instance of each value 
            return i == self.indexOf(v);
        });

        return outputArray;
    }

    removeComment = (id) => {
        let interactedComment = this.state.comments.filter(comment => {
            return comment._id !== id
        })

        this.setState({
            comments: interactedComment
        })
    }

    handleProject = (e) => {
        e.preventDefault()
        let selectedName = e.target.value
        if(selectedName === ""){
            this.setState({
                outputComments: []
            }, () => this.setState({ outputComments: this.state.comments }))
            return;
        }
        let selectedComments = this.state.comments.filter(comment => {
            return comment.projectName === selectedName
        })

        // console.log(selectedComments

        this.setState({
            outputComments: []
        }, () => this.setState({ outputComments: selectedComments }))
    }

    render(){
        // console.log(this.state.outputComments)
        return(
            <div className="comment-section container row">
                <div className="row">
                    <div className="col-9">
                        <h1>Comment Review</h1>
                    </div>
                    <div className="col-3">
                        <form>
                            <select onChange={this.handleProject.bind(this)} title="Select project">
                                <option value="">
                                    Show all
                                </option>
                                {this.state.filteredProjectNames.map(name => (
                                    <option value={name}>
                                        {name}
                                    </option>
                                ))}
                            </select>
                        </form>
                    </div>

                </div>

                    {this.state.outputComments.map(comment => {
                        return ( <CommentCR
                                commentId={comment._id}
                                name={comment.name}
                                content={comment.content}
                                date={comment.dateCreated}
                                featureName={comment.featureName}
                                projectName={comment.projectName}
                                featureId={comment.featureId}
                                imageUrls={comment.imageUrls}
                                removeComment={this.removeComment}
                            />
                        )
                    })}
            </div>
        );
    }
}

export default CommentReview;
