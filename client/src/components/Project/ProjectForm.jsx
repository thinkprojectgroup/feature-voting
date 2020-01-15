import React, { Component } from "react";
import axios from "axios";

class ProjectForm extends Component {
  state = {
    headline: "",
    errorMessage: "",
    error: false,
    submited: false
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
    //console.log(this.state)
  };
  onSubmit = e => {
    e.preventDefault();

    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    let data = JSON.stringify({
      name: this.state.headline
    });

    axios
      .post("/api/projects/", data, config)
      .then(result => {
        console.log(result);
        this.setState({ submited: true });
      })
      .catch(error => {
        console.log(error);
        this.setState({ errorMessage: error.value }, { error: true });
      });
  };

  render() {
    const { headline, description } = this.state;

    return (
      <div>
        {!this.state.submited ? (
          <div className="feature-form-container row col-12">
            <form onSubmit={this.onSubmit} className="feature-form">
              <label>Title:</label>
              <input
                type="text"
                name="headline"
                id="headline"
                className="headline col-12"
                value={headline}
                onChange={this.onChange}
                required
              />

              <button className="submit col-2" type="submit" value="Submit">
                Submit
              </button>
            </form>
            <div>
              {this.state.error ? <p>this.state.errorMessage</p> : null}
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

export default ProjectForm;
