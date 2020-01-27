import React, { Component } from "react";
import axios from "axios";

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
                console.log(error.response);
            });
    };

    render() {
        return (
            <div className="user-item row">
                {!this.state.clicked ? (
                    <div>
                        {this.props.newRole == "admin" ? (
                            <div>
                                <div className="col-1 add-button">
                                    <button className="accept" onClick={() => this.handlePromote()} title="Promote to admin"><i className="fas fa-plus"></i></button>
                                </div>
                                <div className="col-11 user-name">
                                    <p>{this.state.email}</p>{" "}
                                </div>
                            </div>
                        ) : (
                            <div>
                                <div className="col-1 decline-admin-button">
                                    <button className="decline" onClick={() => this.handlePromote()} title="Downgrade to regular user"><i className="fas fa-times"></i></button>
                                </div>
                                <div className="col-11 user-name">
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
