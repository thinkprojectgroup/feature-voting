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
            .patch(config.url + "/api/features/accept/" + this.state.featureId)
            .then((response) => {
                console.log(response);
                self.setState({
                    clicked: true
                })
                self.props.handleInteraction(this.state.featureId)
            })
            .catch((error) => {
                console.log(error.response);
            });
    };

    handleDelete = () => {
        var self = this;
        // console.log(comment._id)
        axios
            .delete(
                config.url + "/api/features/" + this.state.projectName + "/" + this.state.featureId
            )
            .then((response) => {
                console.log(response);
                self.setState({
                    clicked: true
                })
                self.props.handleInteraction(this.state.featureId)
            })
            .catch((error) =>  {
                console.log(error.response);
            });
    };

    render() {

        return (
            <div>
                {!this.state.clicked ? (
                    <div className="row feature-list-item">
                        <div className="feature-section-button col-1">
                            <Button className="accept" onClick={() => this.handleAccept()}><i className="fas fa-check"></i></Button>
                            <Button className="decline" onClick={() => this.handleDelete()}><i className="fas fa-times"></i></Button>
                        </div>

                        {this.state.imageUrls[0] != null || this.state.imageUrls[0] != undefined
                        ?
                            <div>
                                <div className="col-8 feature-review-text">
                                <div className="title">
                                    <h3>{this.state.title}</h3>{" "}
                                </div>
                                <div className="description">
                                    <p>{this.state.description}</p>
                                </div>
                            </div>
                                <div
                                    className="col-3 feature-review-image"
                                    //style={{ backgroundImage: "url(" + this.state.imageUrls[0] + ")" }}
                                >
                                    <Carousel showThumbs={false} dynamicHeight={true}>
                                        {this.state.imageUrls.map(imageUrl => (
                                            <div>
                                                <img src={imageUrl} />
                                            </div>
                                        ))}
                                    </Carousel>
                                </div>
                            </div>
                        :    <div className="col-8 feature-review-text">
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