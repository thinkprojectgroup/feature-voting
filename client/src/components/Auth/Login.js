import React, { Component, Fragment } from "react";
import "../../App.css";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";

class Login extends Component {
  state = {
    showLoginBtn: false,
    signedIn: false,
    token: localStorage.getItem("token")
  };
/*
  componentDidMount() {
    if (!this.state.token) {
      this.initAuth();
      this.renderLoginBtn();
    }
  }

  initAuth = () => {
    window.gapi.load("auth2", () => {
      this.auth2 = window.gapi.auth2.init({
        client_id: googleConfig.clientId,
        scope: "openid email",
        fetch_basic_profile: false //hosted_domain: 'thinkproject.de' //TODO add allowed domain
      });

      var opts = {
        onSuccess: this.onSuccess,
        onFailure: this.onFailure
      };

      window.gapi.signin2.render("loginButton", opts);
    });
  };

  renderLoginBtn = () => {
    // button rendered via google-api - shows "Signed In" after successfull login
    window.gapi.load("signin2", function() {
      var opts = {
        width: 200,
        height: 50
      };
      window.gapi.signin2.render("loginButton", opts);
    });
  };

  logout = () => {
    var auth2 = window.gapi.auth2.getAuthInstance();
    auth2.signOut().then(() => {
      auth2.disconnect();
      this.setState({
        signedIn: false
      });
    });
    this.props.isAuthorised(false);
    localStorage.removeItem("token");
  };

  showLoginBtn = () => {
    this.setState({
      showLoginBtn: true,
      signedIn: true
    });
  };*/

  /**
   * Conditional Rendering Login/Logout-Button
   * 
   * {!this.state.showLoginBtn && <a href="#" onClick={this.showLoginBtn}>Login</a> }
                
            {(this.state.showLoginBtn && this.state.signedIn) && 
                <a id="loginButton">Sign In</a>
            }
            {(this.state.showLoginBtn && !this.state.signedIn) && 
                <a href="#" id="logoutButton" onClick={this.logout}>
                    Sign out
                </a>
            }     
   */

  render() {
    return (
      <Fragment>
        <LoginButton />
        <LogoutButton />
      </Fragment>
    );
  }
}

export default Login;
