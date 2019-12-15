
import React, { Component } from "react";
import {BrowserRouter as Router, Link} from 'react-router-dom';
import Login from './Login'

class Header extends Component{


    render() {

        const image = require('./img/logo.png');

        // TODO: Add Back Route
        const backroute = "/";

        let backButton =(
            <Link to={backroute}>
                <div className="back-button fas fa-arrow-left" >
                </div>
            </Link>
        );

        //Trying to only load Back button when not on the root path
        //
        // const location = window.location.pathname;
        // console.log("location: "+ location);
        // if(location == "/"){
        //     backButton = " ";
        // }

        return (

            <div className="row col-12 header">
                <Login authAdmin={this.props.authAdmin} />
                <div className="header-container">
                    <div className="logo">
                        <img src={image} />
                    </div>

                    {backButton}
                    
                </div>
            </div>

        );
    }
}

export default Header;