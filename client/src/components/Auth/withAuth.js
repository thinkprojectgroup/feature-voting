import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from 'axios';

export default function withAuth(ComponentToProtect) {
  return class extends Component {
    constructor() {
      super();
      this.state = {
        loading: true,
        redirect: false
      };
    }

    componentDidMount() {
      var user = window.gapi.auth2.getAuthResponse();
      console.log("withAuth used!", user)

      axios
        .post("http://localhost:3000/api/auth/admin", {
          //idToken: idToken
        })
        .then(res => {
          if (res.status === 200) {
            this.setState({ loading: false });
          }
        })
        .catch(error => {
          console.log("error auth admin", error);
          this.setState({ loading: false, redirect: true });
        });
    }

    render() {
      const { loading, redirect } = this.state;
      if (loading) {
        return null;
      }
      if (redirect) {
        return <Redirect to="/login" />;
      }
      return <ComponentToProtect {...this.props} />;
    }
  };
}
