import React, { Component } from "react";
import axios from "axios";
import config from "../../config";
import FeatureFR from "./FeatureFR";

class FeatureReview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            features: [],
            projectId: this.props.projectId,
            projectName: this.props.projectName,
            isEmpty: false
        };
    }

    handleInteraction = (id) => {
        let restFeatures = this.state.features.filter(feature => {
            return feature._id !== id
        })

        this.setState({
            features: restFeatures
        },() => {
            if(this.state.features.length === 0){
                this.setState({
                    isEmpty: true
                })
            }
        })
    }

    render() {
        return (
            <div>
               <div classname="container">
                    <hr />
                    <h2>{"Feature Review:"}</h2>
                    {!this.state.isEmpty ? (
                    <div>
                        {this.state.features.map(feature =>
                                <FeatureFR
                                    featureId={feature._id}
                                    title={feature.headline}
                                    description={feature.description}
                                    projectName={this.props.projectName}
                                    imageUrls={feature.imageUrls}
                                    handleInteraction={this.handleInteraction}
                                />
                        )}
                    </div>
                    ): 
                    <div className="placeholder row">
                        <h3>Great Job! This project has no features, that need to be reviewed.</h3>
                    </div>
                    }
                </div>
            </div>
        );
    }

    componentDidMount() {
        axios
            .get(config.url + `/api/projects/unaccepted/` + this.state.projectName)
            .then(response => {
                if(response.data.features.length === 0){
                    this.setState({
                        isEmpty: true
                    })
                }
                this.setState({
                    features: response.data.features
                });
            });
    }
}

export default FeatureReview;