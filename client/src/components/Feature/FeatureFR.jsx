import React, { Component } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import axios from "axios";
import { Button } from "reactstrap";
import config from "../../config";
import { Carousel } from 'react-responsive-carousel';

class FeatureFR extends Component {
    constructor(props) {
        super(props);

        this.state = {
            featureId: this.props.featureId,
            title: this.props.title,
            description: this.props.description,
            projectName: this.props.projectName,
            clicked: false,
            imageUrls: this.props.imageUrls
        };
    }

    handleAccept = () => {
        var self = this;
        //this.props.reRender(this.state.title, this.state.description);
        axios
            .patch("/api/features/accept/" + this.state.featureId)
            .then(function (response) {
                console.log(response);
                self.setState({
                    clicked: true
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    handleDelete = () => {
        var self = this;
        // console.log(comment._id)
        axios
            .delete(
                "/api/features/" + this.state.projectName + "/" + this.state.featureId
            )
            .then(function (response) {
                console.log(response);
                self.setState({
                    clicked: true
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    render() {

        return (
            <div>
                {!this.state.clicked ? (
                    <div className="row feature-list-item">
                        <div className="comment-section-button col-1">
                            <Button className="accept" onClick={() => this.handleAccept()}><i className="fas fa-check"></i></Button>
                            <Button className="decline" onClick={() => this.handleDelete()}><i className="fas fa-times"></i></Button>
                        </div>

                        {this.state.imageUrls[0] != null || this.state.imageUrls[0] != undefined
                        ?
                            <div>
                                <div className="col-8 feature-text">
                                <div className="title">
                                    <h3>{this.state.title}</h3>{" "}
                                </div>
                                <div className="description">
                                    <p>{this.state.description}</p>
                                </div>
                            </div>
                                <div
                                    className="col-3 feature-image"
                                    //style={{ backgroundImage: "url(" + this.state.imageUrls[0] + ")" }}
                                >
                                    <Carousel showThumbs={false}>
                                        {this.state.imageUrls.map(imageUrl => (
                                            <div>
                                                <img src={imageUrl} />
                                            </div>
                                        ))}
                                    </Carousel>
                                </div>
                            </div>
                        :    <div className="col-8 feature-text">
                                <div className="title">
                                <h3>{this.state.title}</h3>{" "}
                                </div>
                                <div className="description">
                                <p>{this.state.description}</p>
                                </div>
                            </div>
                        }
                    </div>
                ) : null}
            </div>
        );
    }
}
export default FeatureFR;