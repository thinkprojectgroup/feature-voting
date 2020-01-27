import React, { Component } from "react";
import axios from "axios";

class ProjectForm extends Component {
    state = {
        headline: "",
        errorMessage: "",
        error: false,
        submited: false,
        empty : true
    };

    onChange = e => {
        this.setState({ errorMessage: "" })
        var test = /^[ /\w|\-|\s/]+$/.test(e.target.value )
        
        console.log(test)
        if(!test) {
            this.setState({ error: true })
        }else{
            this.setState({ error: false })
           
        }
        if(e.target.value != "" ){
            this.setState({ empty: false })
        }else{
            this.setState({ error: false })
            this.setState({ empty: true })
        }
        this.setState({ [e.target.name]: e.target.value })        
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
                this.props.reRender(this.state.headline);
                console.log(result);
                this.setState({ submited: true });
            })
            .catch(error => {
                console.log(error.response.data);
                this.setState({ errorMessage: error.response.data });
            });

        document.getElementById("form-button").classList.remove("cross");
    };

    render() {
        const { headline, description } = this.state;

        return (
            <div>
                {!this.state.submited ? (
                    <div className="project-form-container col-12">
                        <form onSubmit={this.onSubmit} className="form">
                            <h5 className="col-12">Create new a Project:</h5>
                            <div className="row">

                                <div className="name col-10">
                                    <label>Title:</label>
                                    <input
                                        type="text"
                                        name="headline"
                                        id="headline"
                                        className="headline"
                                        value={headline}
                                        onChange={this.onChange}
                                        required
                                    />
                                    {this.state.error ?
                                        <p className="error">*You are only allowed to use letters and dashes in the
                                            title!</p> : null}
                                    {this.state.errorMessage != "" ?
                                        <p className="error">{this.state.errorMessage}. Please choose a different
                                            one!</p> : null}
                                </div>

                                <button className="submit col-2" disabled={this.state.error || this.state.empty}
                                        type="submit" value="Submit">
                                    Submit
                                </button>
                            </div>
                          
                        </form>
                        
                    </div>
                ) : null}
            </div>
        );
    }
}

export default ProjectForm;