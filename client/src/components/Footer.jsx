import React, { Component } from "react";
import {Link } from "react-router-dom";
import ScrollUpButton from "react-scroll-up-button";

class Footer extends Component {


    render() {

        return (
            <footer>
                <div>
                    <Link to={"/help"}>Help</Link>
                </div>
                <div>
                    <ScrollUpButton
                        ContainerClassName="to-top"
                        TransitionClassName="transition"
                    >
                        <button><i className="fas fa-angle-up"></i></button>
                    </ScrollUpButton>
                </div>
            </footer>
        );
    }
}

export default Footer;
