import React, { Fragment, Component } from "react";
import axios from 'axios';

const CLIENT_ID =
  "815925924669-cf3cap0n8rbsj0523n4unpof4s767jf0.apps.googleusercontent.com";

class AppWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
      hasError: false
    };
    this.isAuthInitalized();
  }

  componentDidCatch(error, info) {
    this.setState({ hasError: true });
    //TODO add error handling
  }

  isAuthInitalized = () => {
    const ready = setInterval(() => {
      if (window.gapi) {
        clearInterval(ready);
        this.initGoogleAuth();
      }
    }, 90);
  };

  initGoogleAuth = () => {
    //var sessionStorage = sessionStorage;

    window.gapi.load("auth2", () => {
      window.gapi.auth2.init({  
        client_id: CLIENT_ID,
        scope: "openid email",
        fetch_basic_profile: false 
        //hosted_domain: 'thinkproject.de' //TODO add allowed domain
      })
      .then(authObject => {
        var user = authObject.currentUser.get();
        var idToken = user.getAuthResponse().id_token;
        console.log("authUser", user);
        console.log("authresponse", user.getAuthResponse().id_token)
        
        this.isAdmin(idToken);
      })
      .catch(error => {
        console.log(error);
      })
    });
  }

  isAdmin = (idToken) => {
    axios
      .post("http://localhost:3000/api/auth/admin", {
        idToken: idToken
      })
      .then(res => {
        console.log("APPWRAPPER", res)
        if (res.status === 200) {
          this.props.setAuthorisation(true, idToken);
        }
      })
      .catch(error => {
        console.log("error auth admin", error);
        this.props.setAuthorisation(false, null);
      })
      .finally(() => {
        this.props.isReady(true);
      });
  }

  render() {
    return (
      <Fragment>
        {this.props.children}
      </Fragment>
    );
  }
}

export default AppWrapper;
