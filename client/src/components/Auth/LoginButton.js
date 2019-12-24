import React, { Component } from "react";
import "../../App.css";
import axios from "axios";

const googleConfig = {
  clientId:
    "815925924669-cf3cap0n8rbsj0523n4unpof4s767jf0.apps.googleusercontent.com"
};

class LoginButton extends Component {
  componentDidMount() {
    this.initAuth();
    this.renderLoginBtn();
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
        onFailure: this.onFailure,
        width: 200,
        height: 50
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

  onSuccess = async googleUser => {
    var idToken = googleUser.getAuthResponse().id_token;
    console.log("Logged In.");

    if (idToken) {
      axios
        .post("http://localhost:3000/api/auth/admin", {
          idToken: idToken
        })
        .then(res => {
          if (res.status === 200) {
            //this.props.isAuthorised(true);
            localStorage.setItem("token", idToken);
          }
        })
        .catch(error => {
          console.log("error auth admin", error);
          localStorage.removeItem("token");
          //this.props.isAuthorised(false);
        });
    }
  };

  onFailure = error => {
    // TODO: Create "Login Failed" Dialog
    console.log("Login Failed.");
    console.log(error);
  };

  render() {
    return (
      <div id="loginButton">
        Login
      </div>
    );
  }
}

export default LoginButton;
