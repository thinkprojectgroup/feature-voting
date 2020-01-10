import React, { Component } from "react";
import {withRouter, Link } from "react-router-dom";
import axios from "axios";
import config from "../config";

class Header extends Component {


  
  render() {


    //Logo Image on the left side
    const image = require("./img/logo.png");


    //check if user is Admin
    const isAdmin = this.props.role === 'admin' ? true : false;


    //* LOGIN /LOGOUT BUTTON*//

    // TODO: Add Real Login/Logout Logic
    const loggedIn = false;

    //initializing LOGIN/LOGOUT Buttons
    let loginButton = "";
    if(loggedIn){
      loginButton = (
          //TODO: Add Functionality
          <button className="logout-button fas fa-sign-out-alt"></button>
      );
    } else if(!loggedIn){
      loginButton = (
          //TODO: Add Functionality
          <button className="login-button fas fa-sign-in-alt" ></button>
      );
    }


    //* COMMENT REVIEW BUTTON*//

    //initializing the Comment Review Button and only show it for Admins
    let commentReviewButton = "";
    if(isAdmin){
      commentReviewButton = (
          <Link to={"/commentreview"}>
            <div className="comment-review-button fas fa-comments"></div>
          </Link>
      );
    }


    //* BACK BUTTON*//

    //Different root depths for Admins/Employees and regular users
    var rootDepth = isAdmin ? 1 : 2;
    //Get the current pathname
    const pathname = this.props.location.pathname;
    //Split the Path by "/"
    const pathnameArray = this.props.location.pathname.split('/');

    //initialize backroute
    var backroute = "";
    //backroute is current path without the last part
    for (let i = 1; i < pathnameArray.length - 1 ; i++) {
      backroute += "/";
      backroute += pathnameArray[i];
    }

    var rootPath = "/";
    for (let i = 1; i < rootDepth ; i++) {
      rootPath += pathnameArray[i];
    }

    let backButton = "";
    //check if backroute is deeper than rootpath, if then don't show backbutton
    if(!(pathname === rootPath)){
      backButton = (
        <Link to={backroute}>
        <div className="back-button fas fa-arrow-left"></div>
      </Link>
    );
    }




    return (
        <div className="row col-12 header">
          <div className="header-container">
            <Link to={rootPath}>
              <div className="logo">
                <img alt="" src={image} />
              </div>
            </Link>
            {backButton}
            {loginButton}
            {commentReviewButton}
          </div>
        </div>
    );
  }
}

export default withRouter(Header);
