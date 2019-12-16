
import React, { Component } from "react";
import {withRouter, Link} from 'react-router-dom';
import {BrowserRouter as Router, Link} from 'react-router-dom';
import Login from './Login'


class Header extends Component{

    constructor(props) {
        super(props);
    }


    render() {

        // TODO: Add Back Route
        const backroute = "/";



        const image = require('./img/logo.png');
        const pathname = this.props.location.pathname;

        let backButton =(
            <Link to={backroute}>
                <div className="back-button fas fa-arrow-left" >
                </div>
            </Link>
        );


        if(pathname == {backroute}){
            backButton = "";
        }



        return (
            <div className="row col-12 header">

                <div className="header-container">
                    <div className="logo">
                        <img src={image} />
                    </div>
                    <Login authAdmin={this.props.authAdmin} />
                    {backButton}
                </div>
            </div>

        );
    }
}

export default withRouter(Header);
