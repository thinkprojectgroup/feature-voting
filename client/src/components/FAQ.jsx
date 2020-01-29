import React, { Component } from "react";
import {Link } from "react-router-dom";

class FAQ extends Component {

    
    render() {
        const upvote = require("./img/upvote.png");
        const propose = require("./img/propose.png");
        const comment = require("./img/comment.png");
        const search = require("./img/search.png");

        return (
            <div className="faq container">
                <h1>How to use this website</h1>
                
                <div className="answers">
                    <div className="form-response">
                        <h2 className = "help">Upvote a feature that you like</h2>
                        <img src = {upvote}/>
                        <p>You can simply upvote a feature by clicking the upward arrow (and downvote it by clicking the downward arrow afterwards). Your vote will be stored anonymously.</p>
                    </div>
                    <div className="form-response">
                        <h2 className = "help">See if a certain feature already exists</h2>
                        <img src = {search}/>
                        <p>Before proposing a new feature, click on the search icon and type a key word connected to this feature to see if anything similar already exists.</p>
                    </div>
                    <div className="form-response">
                        <h2 className = "help">Propose a new feature</h2>
                        <img src = {propose}/>
                        <p>Just click on the plus button and a form will appear. There you can type in
                            the feature details and upload up to 3 pictures.
                        <br />
                            Features have to be accepted by an administrator, so don't worry that your features are not appearing immediately.</p>

                    </div >
                    <div className="form-response">
                        <h2 className = "help">Leave a comment under a feature</h2>
                        <img src = {comment}/>
                        <p>Just click on the plus button next to the comment section ,type in
                            the the comment and a user name(if you are not logged-in) and feel free to upload up to 3 pictures.
                            <br />
                            Comments have to be accepted by an administrator, so don't worry that your comments are not appearing immediately.
                        </p>
                    </div>
                    
                </div>
            </div>
        );
    }
}

export default FAQ;