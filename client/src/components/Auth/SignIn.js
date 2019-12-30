import React, { Component, Fragment } from "react";
import "../../App.css";
import axios from "axios";

class SignIn extends Component {
  constructor(props) {
    super(props);

    this.role = null;
  }

  componentDidMount() {
    window.gapi.load("auth2", () => {
      var opts = {
        onSuccess: this.onSuccess,
        onFailure: this.onFailure
      };

      window.gapi.signin2.render("loginButton", opts);
    });

    this.renderLoginBtn();
  }

  renderLoginBtn = () => {
    window.gapi.load("signin2", () => {
      var opts = {
        width: 200,
        height: 50
      };
      window.gapi.signin2.render("loginButton", opts);
    });
  };

  onSuccess = googleUser => {
    var idToken = googleUser.getAuthResponse().id_token;
    console.log("Logged In.");

    axios
      .post("http://localhost:3000/api/auth/admin", {
        idToken: idToken
      })
      .then(res => {
        if (res.status === 200) this.role = 'admin'
        if (res.status === 211) this.role = 'employee'
        if (res.status === 212) this.role = 'user'

        this.props.setAuthorisation(this.role, true, idToken);
      })
      .catch(error => {
        this.props.setAuthorisation(null, false, null);
      })
  };

  onFailure = error => {
    // TODO: Create "Login Failed" Dialog
    this.props.setAuthorisation(null, false, null);
    console.log("Login Failed.");
  };

  logout = () => {
    var auth2 = window.gapi.auth2.getAuthInstance();
    auth2.signOut().then(() => {
      this.props.setAuthorisation(null, false, null);
      auth2.disconnect();
      this.setState({
        signedIn: false
      });
    });
  };

  render() {
    return (
      //TODO add Login Dialog Window
      //TODO conditional rendering Login/Logout
      <Fragment>
        <div id="loginButton">Login</div>
        <a href="#" id="logoutButton" onClick={this.logout}>
          Logout
        </a>
      </Fragment>
    );
  }
}

export default SignIn;
