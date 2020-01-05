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
              // console.log(files[x].size)
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

      onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
        //console.log(this.state)
        
      }  


      getBaseFile(files) {
        // show the 1st image as example
        var imageData = '';
        if (this.maxSelectFile(files) && this.checkMimeType(files) && this.checkFileSize(files)){
            imageData = files.map(file => file.base64.toString())
        }

        this.setState({
            imageData: imageData
        });

        // console.log(this.state);

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
                           onChange={this.onChange}
                           required
                    />

                    <label>
                        Description:
                    </label>
                    <textarea
                        name="description"
                        id="description"
                        className="description col-12"
                        value={description}
                        onChange={this.onChange}
                        required
                    />

                    <label>Upload Your File </label>
                    <FileBase type="file" multiple={true} onDone={this.getBaseFile.bind(this)} />

                    <button className="submit col-2" type="submit" value="Submit">Submit</button>
                </form>
            </div>





        );
    }

}

export default FeatureForm;