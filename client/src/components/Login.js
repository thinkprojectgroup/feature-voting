import React, { Component } from "react";
import "../App.css";
import axios from "axios";

const googleConfig = {
  clientId:
    "815925924669-cf3cap0n8rbsj0523n4unpof4s767jf0.apps.googleusercontent.com"
};

class Login extends Component {
  state = {
    showLoginBtn: false,
    signedIn: false
  };

  componentDidMount() {
    // Init auth
    if(!this.state.signedIn) {
      window.gapi.load("auth2", () => {
        this.auth2 = window.gapi.auth2.init({
          client_id: googleConfig.clientId,
          scope: "openid",
          fetch_basic_profile: false
          //hosted_domain: 'thinkproject.de' //TODO add allowed domain
        });
  
        var opts = {
          width: 200,
          height: 50,
          onSuccess: this.onSuccess,
          onFailure: this.onFailure
        };
  
        window.gapi.signin2.render("loginButton", opts);
      });
  
      /**
       * button rendering with Google API
       * shows "Signed In" if user is already signed in
       */
      window.gapi.load("signin2", function() {
        var opts = {
          width: 200,
          height: 50
        };
        window.gapi.signin2.render("loginButton", opts);
      });
    }
  }

  onSuccess = async googleUser => {
    var id_token = googleUser.getAuthResponse().id_token;

    if (id_token) {
      axios.post("http://localhost:3000/api/auth/admin", {
          idToken: id_token
        })
        .then(res => {
          if (res.status === 200) {
            this.props.authAdmin(true);
          }
        })
        .catch(error => {
          this.props.authAdmin(false);
        });
    }
  };

  onFailure = () => {
    // TODO: Create "Login Failed" Dialog
    console.log("Login Failed.");
  };

  logout = () => {
    var auth2 = window.gapi.auth2.getAuthInstance();
    auth2.signOut().then(() => {
      auth2.disconnect();
      this.setState({
          signedIn: false
      })
    });
    this.props.authAdmin(false);
  };

  showLoginBtn = () => {
    this.setState({
        showLoginBtn: true,
        signedIn: true
    });
  };

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
            <React.Fragment>
                {/* <a href="#" onClick={this.showLoginBtn}> </a> */}
                
                <a id="loginButton">Sign In</a>
                
                <a href="#" id="logoutButton" onClick={this.logout}>
                        Sign out
                </a>                
            </React.Fragment>
    );
  }
}

export default Login;
