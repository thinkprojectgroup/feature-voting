
import React, { Component } from "react";
import {BrowserRouter as Router, Link} from 'react-router-dom';
import FeaturePDV from "./FeaturePDV";

class Header extends Component{

    render() {

        var image = require('./img/logo.png');

        return (

            <div className="row col-12 header">
                <div className="header-container">
                    <div className="logo">
                        <img src={image} />
                    </div>

                    <div className="back-button">

                    </div>

                </div>
            </div>

        );
    }
}

export default Header;