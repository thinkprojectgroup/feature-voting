import React, { Component } from "react";
import {withRouter, Link } from "react-router-dom";

class Header extends Component {
  
  render() {

    // TODO: Add Real User Role Value
    const isAdmin = this.props.role === 'admin' ? true : false;

    const image = require("./img/logo.png");

    var rootDepth = isAdmin ? 1 : 2;
    const pathname = this.props.location.pathname;
    const pathnameArray = this.props.location.pathname.split('/');

    var backroute = "";
    for (let i = 1; i < pathnameArray.length - 1 ; i++) {
      backroute += "/";
      backroute += pathnameArray[i];
    }

    var rootPath = "/";
    for (let i = 1; i < rootDepth ; i++) {
      rootPath += pathnameArray[i];
    }

    let backButton = (
      <Link to={backroute}>
        <div className="back-button fas fa-arrow-left"></div>
      </Link>
    );

    if(pathname === rootPath){
      backButton = "";
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
          </div>
        </div>
    );
  }
}

export default withRouter(Header);
