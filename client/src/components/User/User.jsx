import React, { Component } from "react";
import axios from "axios";
import { Button } from "reactstrap";

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: this.props.email,
      newRole: this.props.newRole,
      clicked: false
    };

    this.handlePromote = this.handlePromote.bind(this);
  }
  handlePromote = () => {
    var self = this;
    const role = this.state.newRole;

    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    this.props.reRender(this.state.email, this.state.newRole);

    let data = JSON.stringify({
      role: role
    });
    axios
      .post("/api/users/" + this.state.email, data, config)
      .then(function(response) {
        console.log(response);
        self.setState({
          clicked: true
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  render() {
    return (
      <div>
        {!this.state.clicked ? (
          <div>
            {this.props.newRole == "admin" ? (
              <div>
                <p>{this.state.email}</p>{" "}
                <button onClick={() => this.handlePromote()} className="Submit">
                  Promote to Admin
                </button>
              </div>
            ) : (
              <div>
                <Button onClick={() => this.handlePromote()}>
                  <i className="fas fa-times"></i>
                </Button>

                <div>
                  <p>{this.state.email}</p>{" "}
                </div>
              </div>
            )}
          </div>
        ) : null}
      </div>
    );
  }
}

export default User;
