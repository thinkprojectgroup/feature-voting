import React, { Component } from "react";
import {withRouter, Link } from "react-router-dom";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

class Header extends Component {

  constructor(props) {
    super(props)
    this.state = {

      counter : 0,

    };
  }



  redirectToLogin = () => {
    this.props.history.push({
      pathname: '/login',
      state: { previousPath: this.props.location.pathname }
    });
  }

  logout = () => {
    var auth2 = window.gapi.auth2.getAuthInstance()
    auth2.signOut().then(() => {
      this.props.setAuthorisation(null, false, null)
      auth2.disconnect()
      window.location.reload();
    })
  }

  submit = () => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
            <div className='modal row'>
              <h1>Logout</h1>
              <p>Are you sure you want to logout?</p>
              <div className="row">
                <button onClick={onClose} className="col-6 not-confirm-delete">Cancel</button>
                <button className=" col-6 confirm-delete"
                    onClick={() => {
                      this.logout();
                      onClose();
                    }}
                >
                  Logout
                </button>
              </div>
            </div>
        );
      }
    });
  };
  
  countUp = () =>{
    this.setState({
      counter: this.state.counter + 1
    })
  }

  render() {

    //Logo Image on the left side
    const image = require("./img/logo.png");


    //check if user is Admin
    const isAdmin = this.props.role === 'admin' ? true : false;


    //* LOGIN /LOGOUT BUTTON*//

    // TODO: Add Real Login/Logout Logic
    const loggedIn = this.props.isSignedIn;

    //initializing LOGIN/LOGOUT Buttons
    let loginButton = "";
    if (loggedIn) {
      loginButton = (
          //TODO: Add Functionality
          <button className="logout-button fas fa-sign-out-alt" onClick={this.submit} title="Logout"></button>
      );
    } else if(!loggedIn){
      loginButton = (
          //TODO: Add Functionality
          <button className="login-button fas fa-sign-in-alt" onClick={this.redirectToLogin} title="Login"></button>
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
            <button className="back-button fas fa-arrow-left"></button>
          </Link>
      );
    }


    //* COMMENT REVIEW BUTTON*//

    //initializing the Comment Review Button and only show it for Admins
    let commentReviewButton = "";
    if(isAdmin && pathname == "/") {
      commentReviewButton = (
          <Link to={"/commentreview"}>
            <button className="comment-review-button fas fa-comments" title="Link to Comment Review Page"></button>
          </Link>
      );
    }


    //* USER SETTINGS BUTTON *//

    let userSettingsButton = "";

    if(isAdmin && pathname == "/"){
      userSettingsButton = (
          <Link to={"/adminrights"}>
            <button className="user-settings-button fas fa-users-cog" title="Link to Admin Rights Page"></button>
          </Link>
      );
    }


    return (
        <div className="row col-12 header">
          <div className="header-container">
            <Link to={rootPath}>
              <div className="logo" title="Home" onClick={this.countUp}>
                <img alt="" src={image} />
              </div>
            </Link>

            {this.state.counter > 15 ? <i className="fas fa-angle-up easter-egg"></i>
                : null}
            {backButton}
            { this.props.location.pathname !== '/login' && loginButton}
            {commentReviewButton}
            {userSettingsButton}
          </div>
        </div>
    );
  }
}

export default withRouter(Header);
