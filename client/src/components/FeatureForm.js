import React, { Component } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Progress } from 'reactstrap';

class FeatureForm extends Component {
        state = {
            headline: "",
            description: "",
            selectedFile: null,
            loaded: 0
        };
        checkMimeType = (event) => {
          //getting file object
          let files = event.target.files
          //define message container
          let err = []
          // list allow mime type
          const types = ['image/png', 'image/jpeg']
          // loop access array
          for (var x = 0; x < files.length; x++) {
              // compare file type find doesn't matach
              if (types.every(type => files[x].type !== type)) {
                  // create error message and assign to container   
                  err[x] = files[x].type + ' is not a supported format\n';
              }
          };
          for (var z = 0; z < err.length; z++) {// if message not same old that mean has error 
              // discard selected file
              toast.error(err[z])
              event.target.value = null
          }
          return true;
      }
      maxSelectFile = (event) => {
          let files = event.target.files
          if (files.length > 3) {
              const msg = 'Only 3 images can be uploaded at a time'
              event.target.value = null
              toast.warn(msg)
              return false;
          }
          return true;
      }
      checkFileSize = (event) => {
          let files = event.target.files
          let size = 2000000 //2MB
          let err = [];
          for (var x = 0; x < files.length; x++) {
              console.log(files[x].size)
              if (files[x].size > size) {
                  err[x] = files[x].type + 'is too large, please pick a smaller file\n';
              }
          };
          for (var z = 0; z < err.length; z++) {// if message not same old that mean has error 
              // discard selected file
              toast.error(err[z])
              event.target.value = null
          }
          return true;
      }
      onChangeHandler = (event) => {
          var files = event.target.files
          if (this.maxSelectFile(event) && this.checkMimeType(event) && this.checkFileSize(event)) {
              // if return true allow to setState
              console.log(files);
              this.setState({
                  selectedFile: files[0],
                  loaded: 0
              })
              console.log(this.state);
          }
      }

      onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
        //console.log(this.state)
        
      }  

      onSubmit = (e) => {
        e.preventDefault();
        if (!this.state.selectedFile) { //Check if selected file exists
              // alert("nofiletoupload")
            toast.info("No file to upload")
            return
        }
        console.log(this.props.projectId);

        const config = {     
            headers: { 
              'Content-Type': 'application/json' }
        }
        
        const stateData = this.state;

        let data = JSON.stringify({
          headline: this.state.headline,
          description: this.state.description,
          file: this.state.selectedFile
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

                    <label>Upload Your File </label>
                    <input type="file" class="form-control" multiple onChange={this.onChangeHandler} />

                    <button type="submit" value="Submit">Submit</button>
                </form>
            </div>
        );
    }

}

export default FeatureForm;