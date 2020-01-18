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
            projectName: this.props.projectName
        };
    }

    render() {
        return (

            <div classname="container">
                <h2>{"Feature Review:"}</h2>
                {this.state.features.map(feature =>
                    !feature.deleted ? (
                        <FeatureFR
                            featureId={feature._id}
                            title={feature.headline}
                            description={feature.description}
                            projectName={this.props.projectName}
                            projectId ={this.state.projectId}
                        />
                    ) : null
                )}
            </div>
        );
    }

    componentDidMount() {
        axios
            .get(config.url + `/api/projects/unaccepted/` + this.state.projectName)
            .then(response => {
                this.setState({
                    features: response.data.features
                });
            });
    }
}

export default FeatureReview;