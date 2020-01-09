import React, { Component } from "react";
import axios from "axios";
import config from '../config';
import FileBase from "react-file-base64"


class CommentForm extends Component {
        constructor(props){
        super(props);
        this.state = {
            featureId: this.props.featureId,
            name: String,
            content: "",
            config: config,
            imageData: String
        };
      
      }

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
            alert("Wrong Datatype!");
            //event.target.value = null
            return false;
        }
        return true;
    }
    maxSelectFile = (files) => {
        // let files = files
        if (files.length > 3) {
            const msg = 'Only 3 images can be uploaded at a time'
            // event.target.value = null
            alert("Too many files!");
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
            alert("Your files are too big!");
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
            imageData = files.map(file => file.base64.toString());

            this.setState({
              imageData: imageData
          });

          // TODO: FileBase Component needs to be cleared when check fails
        }

        // console.log(this.state);

    }


      onSubmit = (e) => {
        e.preventDefault();

        const config = {     
            headers: {
              'Content-Type': 'application/json' }
        }
        
        let data = JSON.stringify({
          content: this.state.content,
          name: this.state.name,
          imageData: this.state.imageData
        })

        console.log(data);

        axios.post(this.state.config.url + "/api/comments/" + this.state.featureId, data, config)
          .then((result) => {
            console.log(result);
          })
          .catch(error => {
            console.log(error);
            console.log(error.response.data.message);
        });
      }

    render(){
        const {name, content} = this.state;

        return(
            
            <div>
                <form onSubmit={this.onSubmit} className="feature-form">

                    <h5 className="col-12">Create a new comment:</h5>
                    <div className="col-6 name">
                        <label>
                            Name (optional):
                        </label>
                        <input type="text"
                               name="name"
                               className="headline"
                               value={name}
                               onChange={this.onChange}/>
                    </div>

                    <div className="col-6 filepicker">
                        <label>Upload Your Images </label>
                        <FileBase type="file" multiple={true} onDone={this.getBaseFile.bind(this)} />
                    </div>

                    <div className="col-12 content">
                    <label>
                        Content:
                    </label>
                    <input type="text"
                           name="content"
                           className="description"
                           value={content}
                           onChange={this.onChange}/>
                    </div>


                    <button className="submit col-2" type="submit" value="Submit">Submit</button>
                </form>
            </div>
        );
    }

}

export default CommentForm;
