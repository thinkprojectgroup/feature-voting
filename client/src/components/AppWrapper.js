import React, { Fragment, Component } from "react";
import axios from 'axios';

const CLIENT_ID_1 =
  "815925924669-cf3cap0n8rbsj0523n4unpof4s767jf0.apps.googleusercontent.com";

const CLIENT_ID_2 = "815925924669-ej19n6nq6gh5504pgos1dne996kstsil.apps.googleusercontent.com"

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
        client_id: CLIENT_ID_2,
        scope: "openid email",
        //fetch_basic_profile: false 
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
      .post("http://localhost:3000/api/auth/", {
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
