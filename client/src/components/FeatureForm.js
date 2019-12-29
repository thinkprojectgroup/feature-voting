import React, { Component } from "react";
import axios from "axios";


class FeatureForm extends Component {
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
            
            <div className="feature-form-container row col-12">
                <form onSubmit={this.onSubmit} className="feature-form">
                    <label>
                        Title:
                    </label>
                    <input type="text"
                           name="headline"
                           id="headline"
                           className="headline col-12"
                           value={headline}
                           onChange={this.onChange}/>

                    <label>
                    Description:
                    </label>
                    <input type="text"
                           name="description"
                           id="description"
                           className="description col-12"
                           value={description}
                           onChange={this.onChange}/>

                   <button className="submit col-2" type="submit" value="Submit">Submit</button>
                </form>
            </div>
        );
    }

}

export default FeatureForm;