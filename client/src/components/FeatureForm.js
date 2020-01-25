import React, { Component } from "react";
import axios from "axios";
import FileBase from "react-file-base64"
import { storage } from '../firebase-config';
import { ClipLoader } from "react-spinners";

class FeatureForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            headline: "",
            description: "",
            firebaseUrls: [],
            currentImageName: [],
            images: [],
            showResponse: false,
            loading: false,
            fileError: ""
        };
    }

    handleResponseButton = () => {
        this.setState({
            showResponse: false
        })
        this.props.toggleShowForm()

        document.getElementById("form-button").classList.remove("cross");
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
            //alert("Wrong Datatype!");
            //event.target.value = null
            this.setState({
                fileError: "You can only upload images with the datatype PNG or JPEG."
            })
            return false;
        }
        return true;
    }
    maxSelectFile = (files) => {
        // let files = files
        if (files.length > 3) {
            const msg = 'Only 3 images can be uploaded at a time'
            // event.target.value = null
            // alert("Too many files!");
            this.setState({
                fileError: "You can only upload 3 images."
            })
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
            // alert("Your files are too big!");
            this.setState({
                fileError: "You can only upload images, that are smaller than 2MB."
            })
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
        if (this.checkFileSize(files) && this.checkMimeType(files) && this.maxSelectFile(files)) {
            this.setState({
                images: files,
                fileError: ""
            })
        }
        else {
            e.target.value = null
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


        if(this.state.images.length > 0){
            this.setState({
                loading: true
            })
        }

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const imageUrls = await this.uploadImage()

        let data = JSON.stringify({
            headline: this.state.headline.trim(),
            description: this.state.description.trim(),
            imageUrls: imageUrls
        })


        axios.post('/api/features/' + this.props.projectName, data, config)
            .then((result) => {
                console.log(result);
                this.setState({
                    showResponse: true,
                    loading: false
                })
            })
            .catch(error => {
                console.log(error.response);
            });
    }

    render() {
        const { headline, description } = this.state;

        return (
            <div className="row form">
                {!this.state.showResponse ? (
                    <form onSubmit={this.onSubmit} className="feature-form">

                        <h5 className="col-12">Propose a new feature:</h5>
                        <div className="col-6 name">
                            <label>
                                Title:
                        </label>
                            <input type="text"
                                name="headline"
                                id="headline"
                                className="headline"
                                value={headline}
                                onChange={this.onChange}
                                required
                                maxLength="50"
                            />
                        </div>

                        <div className="col-6 filepicker">
                            <label>Upload Your Images </label>
                            <input
                                type="file"
                                multiple className="process__upload-btn"
                                onChange={(e) => this.onChangeImage(e)}
                            />
                        </div>

                        <div className="error">
                            <p>{this.state.fileError}</p>
                        </div>


                        <div className="col-12 content">
                            <label>
                                Description:
                        </label>
                            <textarea type="text"
                                name="description"
                                className="description"
                                value={description}
                                onChange={this.onChange}
                                maxLength="2048"
                            />

                        </div>


                        {this.state.loading ?
                            <div className="col-2"><ClipLoader loading={this.state.loading} /></div>
                            : <button className="submit col-2" type="submit" value="Submit">Submit</button>}

                    </form>

                ) :
                    <div className="form-response row">
                        <p className="col-10">
                            Thank you for submitting a feature! <br />Your feature will be reviewed by an admin before you can see it here.
                        </p>
                        <button className="submit col-2" onClick={this.handleResponseButton.bind(this)}>
                            Ok, great!
                        </button>
                    </div>
                }
            </div>
        );
    }

}

export default FeatureForm;