import React, { Component } from 'react'
import {withRouter, Link } from "react-router-dom";
import axios from "axios";
import config from "../config";
class Breadcrumb extends Component {

    constructor(props) {
        super(props)
        this.state = {
           featureName: ""
        };
    }


    render(){

        var featureName = ""
        featureName = this.props.getFeatureName();

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

                {isAdmin ?
                    <span>
                    {projectName != ""
                        ?
                        <Link to={"/"}>
                            <i className="fas fa-list"></i>
                            <span className="overview-text"> Project Overview </span>
                        </Link>
                        :
                        <span>
                            <i className="fas fa-list"></i>
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

                                 {featureName}
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
                                        <i className="fas fa-list"></i>
                                        {projectName}
                                    </Link>
                                    :
                                    <span>
                                        <i className="fas fa-list"></i>
                                        {projectName}
                                    </span>
                                }
                            </span>

                                {featureId != "" ?
                                    <span>
                                <i className="fa fa-angle-right"></i>

                                        {featureName}
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