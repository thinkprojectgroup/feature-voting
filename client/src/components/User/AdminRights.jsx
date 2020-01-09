import React, { Component } from "react";
import axios from "axios";
import { BrowserRouter as Router, Link } from "react-router-dom";
import config from "../../config";

import AdminForm from "./AdminForm";
import { Button } from "reactstrap";

class AdminRights extends Component {
  constructor(props) {
    super(props);
    this.state = {
      admins: []
    };
  }

  render() {
    var image = require("../img/computer.png");

    return (
      <div>
        <h1>{"Admins"}</h1>
        <div>
          <AdminForm />
        </div>
        {this.state.admins.map(admin =>
          !admin.deleted && !admin.banned && admin.email ? (
            <div>
              <Button className="decline">
                <i className="fas fa-times"></i>
              </Button>
              <p>{admin.email}</p>{" "}
            </div>
          ) : null
        )}
      </div>
    );
  }

  componentDidMount() {
    axios.get(config.url + `/api/users/`).then(response => {
      const result = response.data.filter(admin => admin.role == "admin");
      this.setState({
        admins: result
      });
    });
    console.log(this.state.admins);
  }
}

export default AdminRights;
