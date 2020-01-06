import React, { Component } from "react";
import axios from "axios";

class AdminForm extends Component {
  state = {
    name: "",
    email: "",
    role: "admin"
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
    //console.log(this.state)
  };

  onSubmit = e => {
    e.preventDefault();
    const { name, email, role } = this.state;
    // console.log(this.props.projectId);

    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    let data = JSON.stringify({
      role: role,
      email: email,
      name: name
    });

    axios
      .post("/api/users/" + this.state.email, data, config)
      .then(result => {
        console.log(result);
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    const { role, email, name } = this.state;

    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <label>Name:</label>
          <textarea
            name="name"
            id="name"
            value={name}
            onChange={this.onChange}
            required
          />
          <label>Email:</label>
          <input
            type="text"
            name="email"
            id="email"
            value={email}
            onChange={this.onChange}
            required
          />

          <button type="submit" value="Submit">
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default AdminForm;
