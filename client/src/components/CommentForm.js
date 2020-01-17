import React, { Component } from "react";
import axios from "axios";
import FileBase from "react-file-base64"
import { storage } from '../firebase-config';
import config from '../config'

class CommentForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            content: "",
            firebaseUrls: [],
            currentImageName: [],
            images: [],
            featureId: this.props.featureId
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
            if (files[x].size > size) {
                err[x] = files[x].type + 'is too large, please pick a smaller file\n';
            }
        };
        for (var z = 0; z < err.length; z++) {// if message not same old that mean has error 
            // discard selected file
            alert("Your files are too big!");
            //event.target.value = null
            return false;
        }
        return true;
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    onChangeImage = (e) => {
        const files = e.target.files
        if(this.checkFileSize(files) && this.checkMimeType(files) && this.maxSelectFile(files)){
            this.setState({
                images: files
            })
        }
    }


    uploadImage = () => {
        return Promise.all(Array.from(this.state.images).map(file =>
            new Promise((resolve, reject) => {
                let currentImageName = "firebase-image-" + Date.now();
                storage.ref(`images/${currentImageName}`)
                    .put(file)
                    .on('state_changed',
                        (snapshot) => { },
                        (error) => {
                            reject(error)
                        },
                        () => {
                            storage.ref('images')
                                .child(currentImageName)
                                .getDownloadURL()
                                .then(url => {
                                    resolve(url)
                                })
                        })
            })))
    }


    onSubmit = async (e) => {
        e.preventDefault();

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }


        const imageUrls = await this.uploadImage()


        let data = JSON.stringify({
            name: this.state.name,
            content: this.state.content,
            imageUrls: imageUrls
        })


        axios.post('/api/comments/' + this.state.featureId, data, config)
            .then((result) => {
                console.log(result);
            })
            .catch(error => {
                console.log(error.response);
            });
    }

    render() {
        const { name, content } = this.state;

        return (

            <div className="feature-form-container row col-12">
                <form onSubmit={this.onSubmit} className="feature-form">
                    <label>
                        Name (optional):
                    </label>
                    <input type="text"
                        name="name"
                        id="name"
                        className="headline col-12"
                        value={name}
                        onChange={this.onChange}
                        required
                    />

                    <label>
                        Content:
                    </label>
                    <textarea
                        name="content"
                        id="content"
                        className="description col-12"
                        value={content}
                        onChange={this.onChange}
                        required
                    />

                    <label>Upload Your Images </label>
                    <input type="file" multiple className="process__upload-btn" onChange={(e) => this.onChangeImage(e)} />

                    <button className="submit col-2" type="submit" value="Submit">Submit</button>
                </form>
            </div>
        );
    }

}

export default CommentForm;