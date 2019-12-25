import React, { Component } from "react";
import {withRouter, Link } from "react-router-dom";

class Header extends Component {
  
  
  render() {

    // TODO: Add Real User Role Value
    var isAdmin = true;

    const image = require("./img/logo.png");

    var rootDepth = isAdmin ? 1 : 2;
    const pathname = this.props.location.pathname;
    const pathnameArray = this.props.location.pathname.split('/');

    var backroute = "";
    for (var i = 1; i < pathnameArray.length - 1 ; i++) {
      backroute += "/";
      backroute += pathnameArray[i];
    }

    var rootPath = "/";
    for (var i = 1; i < rootDepth ; i++) {
      rootPath += pathnameArray[i];
    }

    let backButton = (
      <Link to={backroute}>
        <div className="back-button fas fa-arrow-left"></div>
      </Link>
    );

    if(pathname == rootPath){
      backButton = "";
    }

    return (
      <div className="row col-12 header">
        
        <div className="header-container">
          <div className="logo">
            <img src={image} />
          </div>

          {backButton}
        </div>
      </div>
    );
  }
}

export default withRouter(Header);
