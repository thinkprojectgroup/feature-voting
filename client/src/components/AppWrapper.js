import React, { Fragment, Component } from "react";
import axios from 'axios';
import config from "../config";

const CLIENT_ID_1 =
  "596132698210-554c0ihpr0kp9vg13v7irajr55v8m4eq.apps.googleusercontent.com";

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
    //TODO add error handling/logging service
  }

  isAuthInitalized = () => {
    const ready = setInterval(() => {
      if (window.gapi) {
        clearInterval(ready);
        this.initGoogleAuth();
      }
    }, 30);
  };

  initGoogleAuth = () => {
    window.gapi.load("auth2", () => {
      window.gapi.auth2.init({  
        client_id: CLIENT_ID_1,
        scope: "openid email",
        fetch_basic_profile: false 
        //hosted_domain: 'thinkproject.de' //TODO add 'thinkproject.de' as only allowed domain
      })
      .then(authObject => {
        var user = authObject.currentUser.get();
        var idToken = user.getAuthResponse().id_token;
        this.authorise(idToken);
      })
      .catch(error => {
        console.log(error);
      })
    });
  }

  authorise = (idToken) => {
    axios
      .post(config.url + "/api/auth/", {
        idToken: idToken
      })
      .then(res => {
        if (res.status === 200) this.role = 'admin'
        if (res.status === 211) this.role = 'employee'
        if (res.status === 212) this.role = 'user'

        this.props.setAuthorisation(this.role, true, idToken)
      })
      .catch(error => {
        this.props.setAuthorisation(null, false, null)
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
