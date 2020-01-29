import React, { Component } from "react";
import {Link } from "react-router-dom";

class FAQ extends Component {

    
    render() {


        return (
            <div className="faq container">
                <h1>FAQ - Frequently Asked Questions</h1>
                <div className="questions">
                    <a href="#upvote"><h2>How can I upvote a feature?</h2></a>
                    <a href="#downvote"><h2>How can I downvote a feature?</h2></a>
                    <a href="#feature"><h2>How do I create a feature?</h2></a>
                    <a href="#comment"><h2>How do I create a comment?</h2></a>
                    <a href="#projects"><h2>How can I see all projects?</h2></a>
                    <a href="#log-in"><h2>How can I log-in?</h2></a>
                </div>

                <div className="answers">
                    <div id="upvote">
                        <h4>How can I upvote a feature?</h4>
                        <p>You can simply upvote a feature by clicking onto the upward arrow next to the feature
                            description. Your vote will be stored anonymously.</p>
                    </div>
                    <div id="downvote">
                        <h4>How can I downvote a feature?</h4>
                        <p>You can only downvote a feature when you already upvoted it. simply click onto the
                            downward arrow next to the upvoted feature. Your vote will be stored anonymously.</p>
                    </div>
                    <div id="feature">
                        <h4>How do I create a feature?</h4>
                        <p>Just click on the plus button next to the Feature List of your Project. You can type in
                            the feature details and make a small description about it in the form.
                            You are also able to upload up to 3 pictures to a feature
                        <br />
                            Features have to be accepted by an administrator, so don't worry if your features won't be shown immediately.</p>

                    </div>
                    <div id="comment">
                        <h4>How do I create a comment?</h4>
                        <p>Just click on the plus button underneath the Feature Deatail View, On top of the comment-section. You can type in
                            the the comment and an user name, the name will only be stored for this for this comment.
                            <br />
                            Comments have to be accepted by an administrator, so don't worry if your comments won't be shown immediately.
                        </p>
                    </div>
                    <div id="projects">
                        <h4>How can I see all projects?</h4>
                        <p>You can only see all projects if you're an employee if thinkproject.
                            If you are an employee of thinkproject you can log in with your google account by clicking onto the login button in the header.
                            Your votes will still be stored anonymously, we will only store the user role.</p>
                    </div>
                    <div id="log-in">
                        <h4>How can I log-in?</h4>
                        <p>You can only Log-In if you're an employee if thinkproject.
                            If you are an employee of thinkproject you can log in with your google account by clicking onto the login button in the header.
                            Your votes will still be stored anonymously, we will only store the user role.</p>
                    </div>

                </div>
            </div>
        );
    }
}

export default FAQ;
