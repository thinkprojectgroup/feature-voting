import React, { Component } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FileBase from "react-file-base64"

class FeatureForm extends Component {
        state = {
            headline: "",
            description: "",
            selectedFile: null,
            loaded: 0,
            baseImage: String,
            loadedImage: String,
            imageData: String
        };
        checkMimeType = (files) => {
          //getting file object
          // let files = files
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
              // event.target.value = null
          }
          return true;
      }
      maxSelectFile = (files) => {
          // let files = files
          if (files.length > 3) {
              const msg = 'Only 3 images can be uploaded at a time'
              // event.target.value = null
              toast.warn(msg)
              return false;
          }
          return true;
      }
      checkFileSize = (files) => {
          // let files = files
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
                //event.target.value = null
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


      getBaseFile(files) {
        // show the 1st image as example
        this.setState({
            baseImage: files[0].base64
        });
        const imageData = files.map(file => file.base64.toString())
        console.log(imageData)


        this.setState({
            imageData: imageData
        });

        console.log(this.state);

    }

      onSubmit = (e) => {
        e.preventDefault();
        //console.log(e);
        //console.log(this.state);
        //console.log(this.props.projectId);

        const config = {     
            headers: { 
              'Content-Type': 'application/json' }
        }

        let data = JSON.stringify({
          headline: this.state.headline,
          description: this.state.description,
          imageData: this.state.imageData
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
                    <FileBase type="file" multiple={true} onDone={this.getBaseFile.bind(this)} />

                    <button type="submit" value="Submit">Submit</button>
                </form>
            </div>
        );
    }

}

export default FeatureForm;