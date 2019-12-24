import React, { Component } from "react";
import "../../App.css";

class LogoutButton extends Component {
  
  logout = () => {
    var auth2 = window.gapi.auth2.getAuthInstance();
    auth2.signOut().then(() => {
      auth2.disconnect();
      this.setState({
        signedIn: false
      });
    });
    //this.props.isAuthorised(false);
    localStorage.removeItem("token");
  };

  render() {
    return (
      <div id="logoutButton" onClick={this.logout}>
        Logout
      </div>
    );
  }
}

export default LogoutButton;
