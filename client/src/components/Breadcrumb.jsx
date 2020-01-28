import React, { Component } from 'react'
import {withRouter, Link } from "react-router-dom";
import axios from "axios";
import config from "../config";
class Breadcrumb extends Component {

    constructor(props) {
        super(props)
        this.state = {

            featureName : "",

        };
    }

    componentDidMount() {

        const pathnameArray = this.props.location.pathname.split('/');

        let projectName ="";
        let featureId="";

        if(pathnameArray.length > 1) {
            projectName = pathnameArray[1];
        }

        if(pathnameArray.length > 2) {

            featureId = pathnameArray[2];
        }

        axios
            .get(config.url + "/api/features/" +
                projectName.toString().split("-").join(" ") +
                "/" +
                featureId
            )
            .then(res => {
                const feature = res.data;
                this.setState({
                        featureName: feature.headline,
                    },
                    () => {

                    });
            })

    }

    render(){


        const pathnameArray = this.props.location.pathname.split('/');

        const isAdmin = this.props.role === 'admin' ? true : false;

        let projectName ="";
        let featureId="";


        if(pathnameArray.length > 1) {
            projectName = pathnameArray[1];

           if(projectName === "commentreview"){
               projectName = "Comment Review";
           } else if(projectName === "adminrights"){
               projectName = "Admin Rights"
           }else if(projectName === "login"){
               projectName = "Login"
           }
        }

        if(pathnameArray.length > 2) {

            featureId = pathnameArray[2];
        }


        return(
            <div className="breadcrumb">
                <i className="fas fa-list"></i>
                {isAdmin ?
                    <span>
                    {projectName != ""
                        ?
                        <Link to={"/"}>
                            <span className="overview-text"> Project Overview </span>
                        </Link>
                        :
                        <span>
                             <span className="overview-text"> Project Overview </span>
                        </span>
                        }
                    {projectName != "" ?
                        <span>
                            <span>
                                <i className="fa fa-angle-right"></i>
                                {featureId != ""
                                    ?
                                    <Link to={"/" + projectName}>
                                        {projectName}
                                    </Link>
                                    :
                                    <span>
                                        {projectName}
                                    </span>
                                }
                            </span>
                        {featureId != "" ?
                            <span>
                                <i className="fa fa-angle-right"></i>

                                 {this.state.featureName}
                            </span>
                            : null}
                        </span>
                    : null}
                    </span>




                    :



                    <span>
                        {projectName != "" ?
                        <span>
                            <span>
                                {featureId != ""
                                    ?
                                    <Link to={"/" + projectName}>
                                        {projectName}
                                    </Link>
                                    :
                                    <span>
                                        {projectName}
                                    </span>
                                }
                            </span>

                                {featureId != "" ?
                                    <span>
                                <i className="fa fa-angle-right"></i>

                                        {this.state.featureName}
                            </span>
                                    : null}
                        </span>
                            : null}
                    </span>



                    }
            </div>
        );
    }
}
export default withRouter(Breadcrumb);