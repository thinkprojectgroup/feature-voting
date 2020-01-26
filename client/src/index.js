import React from 'react';
import ReactDOM from 'react-dom';
import ReactGA from 'react-ga';
import { BrowserRouter as Router } from 'react-router-dom';

import ReactGA from 'react-ga';

import './index.css';

import './components/css/carousel.css';

import './components/css/fontawesome-free-5.11.2-web/css/all.css';


import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
        <Router>
            <App />
        </Router>, 
        document.getElementById('root')
);

const trackingId = "UA-156449230-1";
ReactGA.initialize(trackingId);


const trackingId = "UA-156449230-1";
ReactGA.initialize(trackingId);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
