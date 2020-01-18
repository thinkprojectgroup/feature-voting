import React, { Component } from "react";
import axios from "axios";
import { BrowserRouter as Router, Link } from "react-router-dom";
import config from "../../config";

import User from "./User";
import { Button } from "reactstrap";

class AdminRights extends Component {
  constructor(props) {
    super(props);
    this.state = {
      employees: [],
      admins: []
    };
  }

  reRender = (email, role) => {
    if (role == "admin") {
      var newUser = this.state.employees.filter(
        employee => employee.email == email
      );
      this.setState({
        admins: this.state.admins.concat(newUser)
      });
    }

    if (role == "employee") {
      var newUser = this.state.admins.filter(admin => admin.email == email);
      this.setState({
        employees: this.state.employees.concat(newUser)
      });
    }
  };

  render() {

    return (
      <div className="container">


          <div className="row">
            <h1>Admin Rights</h1>
          </div>


        <div>

          {this.state.employees.map(employee => (

            <User
              email={employee.email}
              newRole="admin"
              reRender={this.reRender.bind(this)}
            />
          ))}
        </div>

        <div className="container">
          <h3>{"Admins"}</h3>

          {this.state.admins.map(admin => (
            <User
              email={admin.email}
              newRole="employee"
              reRender={this.reRender.bind(this)}
            />
          ))}
        </div>
      </div>
    );
  }

  componentDidMount() {
    axios.get(config.url + `/api/users/`).then(response => {
      const admins = response.data.filter(user => user.role == "admin");
      const employees = response.data.filter(user => user.role == "employee");
      this.setState({ admins, employees });
    });
  }
}

export default AdminRights;