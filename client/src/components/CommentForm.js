import React, { Component } from "react";
import axios from "axios";


class CommentForm extends Component {
        state = {
            headline: "",
            description: "",
        };
      

      onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
        //console.log(this.state)
        
      }  

      onSubmit = (e) => {
        e.preventDefault();
        const { headline, description} = this.state;
        console.log(this.props.projectId);

        const config = {     
            headers: { 
              'Content-Type': 'application/json' }
        }
        
        let data = JSON.stringify({
          headline: headline,
          description: description
        })

        axios.post('/api/features/' + this.props.projectId , data, config)
          .then((result) => {
            console.log(result);
          })
          .catch(error => {
            console.log(error);
        });
      }

    render(){
        const {headline, description } = this.state;

        return(
            
            <div className="feature-form-container">
                <form onSubmit={this.onSubmit} className="feature-form">

                    <label className="feature-form-label">
                        Title:
                        <input type="text" 
                        name="headline" 
                        className="feature-form-input" 
                        value={headline} 
                        onChange={this.onChange}/>
                    </label>

                    <label className="feature-form-label">
                        Description: 
                        <input type="text" 
                        name="description" 
                        className="feature-form-input" 
                        value={description} 
                        onChange={this.onChange}/>
                    </label>

                    <button type="submit" value="Submit">Submit</button>
                </form>
            </div>
        );
    }

}

export default CommentForm;