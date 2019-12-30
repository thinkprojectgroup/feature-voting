import React, { Component } from "react";
import {Link } from "react-router-dom";

class Footer extends Component {
    render() {
        return (
            <footer>
                <div>
                    <Link to={"/faq"}>FAQ</Link>
                </div>
            </footer>
        );
    }
}

export default Footer;
