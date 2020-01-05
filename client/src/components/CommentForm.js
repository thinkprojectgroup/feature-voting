import React, { Component } from "react";
import axios from "axios";
import config from '../config';


class CommentForm extends Component {
        constructor(props){
        super(props);
        this.state = {
            featureId: this.props.featureId,
            name: String,
            content: "",
            config: config
        };
      
      }
      onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
        //console.log(this.state)
        
      }  

      onSubmit = (e) => {
        e.preventDefault();
        const { name, content} = this.state;
        // console.log(this.props.projectId);

        const config = {     
            headers: { 
              'Content-Type': 'application/json' }
        }
        
        let data = JSON.stringify({
          name: name,
          content: content
        })

        axios.post(this.state.config.url + "/api/comments/" + this.state.featureId, data, config)
          .then((result) => {
            console.log(result);
          })
          .catch(error => {
            console.log(error);
        });
      }

    render(){
        const {name, content} = this.state;

        return(
            
            <div className="feature-form-container">
                <form onSubmit={this.onSubmit} className="feature-form">

                    <label className="feature-form-label">
                        Name (optional):
                        <input type="text" 
                        name="name" 
                        className="feature-form-input" 
                        value={name} 
                        onChange={this.onChange}/>
                    </label>

                    <label className="feature-form-label">
                        Content: 
                        <input type="text" 
                        name="content" 
                        className="feature-form-input" 
                        value={content} 
                        onChange={this.onChange}/>
                    </label>

                    <button type="submit" value="Submit">Submit</button>
                </form>
            </div>
        );
    }

}

export default CommentForm;