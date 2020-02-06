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
                <h1>FAQ - Frequently Asked Questions</h1>
                <div className="questions">
                    <ul>
                        <li><a href="#upvote"><h2>How can I upvote a feature?</h2></a></li>
                        <li><a href="#search"><h2>How can I see if a certain feature already exists?</h2></a></li>
                        <li><a href="#feature"><h2>How do I propose a new feature?</h2></a></li>
                        <li><a href="#comment"><h2>How do I leave a comment under a feature?</h2></a></li>
                    </ul>
                </div>

                <div className="answers">
                    <div id="upvote">
                        <h4>How can I upvote a feature?</h4>
                        <img src = {upvote}/>
                        <p>You can simply upvote a feature by clicking the upward arrow (and downvote it by clicking the downward arrow afterwards). Your vote will be stored anonymously.</p>
                    </div>
                    <div id="search">
                        <h4>How can I see if a certain feature already exists?</h4>
                        <img src = {search}/>
                        <p>Before proposing a new feature, click on the search icon and type a key word connected to this feature to see if anything similar already exists.</p>
                    </div>
                    <div id="feature">
                        <h4>How do I propose a new feature?</h4>
                        <img src = {propose}/>
                        <p>Just click on the plus button and a form will appear. There you can type in
                            the feature details and upload up to 3 pictures.
                            <br />
                            Features have to be accepted by an administrator, so don't worry that your features are not appearing immediately.</p>

                    </div>
                    <div id="comment">
                        <h4>How do I leave a comment under a feature?</h4>
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
