import React, { Component, Fragment } from "react";
import "../../App.css";
import axios from "axios";

// const CLIENT_ID =
//   "815925924669-cf3cap0n8rbsj0523n4unpof4s767jf0.apps.googleusercontent.com";

class SignIn extends Component {

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

  componentDidMount() {
    //this.initAuth();
    //this.renderLoginBtn();

    window.gapi.load("auth2", () => {
      // this.auth2 = window.gapi.auth2.init({
      //   client_id: CLIENT_ID,
      //   scope: "openid email",
      //   fetch_basic_profile: false //hosted_domain: 'thinkproject.de' //TODO add allowed domain
      // });

      var opts = {
        onSuccess: this.onSuccess,
        onFailure: this.onFailure,
      };

      window.gapi.signin2.render("loginButton", opts);
    });

    //shows "Signed In" after successfull login
    window.gapi.load("signin2", () => {
      var opts = {
        width: 200,
        height: 50
      };
      window.gapi.signin2.render("loginButton", opts);
    });
  }

  initAuth = () => {
    // #region alternative auth
    // var auth2 = window.gapi.auth2.getAuthInstance();
    // var opts = {
    //   scope: "openid email"
    // };

    // auth2
    //   .signIn(opts)
    //   .then(authResponse => authResponse.getAuthResponse().id_token)
    //   .then(idToken => {
    //     console.log("logged in.")
    //     this.props.setAuthorisation(true, idToken)
    //     this.onSuccess();
    //   })
    //   .catch(error => console.log("signin err", error));
    // #endregion
  };

  renderLoginBtn = () => {

  };

  onSuccess = (googleUser) => {
    var idToken = googleUser.getAuthResponse().id_token;
    //var idToken = window.gapi.auth2.getAuthResponse().id_token;
    console.log("Logged In.");

    axios
      .post("http://localhost:3000/api/auth/admin", {
        idToken: idToken
      })
      .then(res => {
        if (res.status === 200) {
          this.props.setAuthorisation(true, idToken);
        }
      })
      .catch(error => {
        console.log("error auth admin", error);
        this.props.setAuthorisation(false, null);
      });
  };

  onFailure = error => {
    // TODO: Create "Login Failed" Dialog
    this.props.setAuthorisation(false, null);
    console.log("Login Failed.");
    console.log(error);
  };

  logout = () => {
    var auth2 = window.gapi.auth2.getAuthInstance();
    auth2.signOut().then(() => {
      this.props.setAuthorisation(false, null);
      auth2.disconnect();
      this.setState({
        signedIn: false
      });
    });
    
  };

  render() {
    return (
      <Fragment>
        <div id="loginButton" >
          Login
        </div>
        <a href="#" id="logoutButton" onClick={this.logout}>
          Logout
        </a>
      </Fragment>
    );
  }
}

export default SignIn;
