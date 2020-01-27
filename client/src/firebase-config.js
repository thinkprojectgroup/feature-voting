import firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/analytics';

const apiKey = process.env.REACT_APP_APIKEY || require("../src/firebase-keys").apiKey
const appId = process.env.REACT_APP_APPID || require("../src/firebase-keys").appId
const messagingSenderId = process.env.REACT_APP_MESSAGINGSENDERID || require("../src/firebase-keys").messagingSenderId
const measurementId = process.env.REACT_APP_MEASUREMENTID || require("../src/firebase-keys").measurementId

var firebaseConfig = {
    apiKey: apiKey,
    authDomain: "dynamic-feature-voting.firebaseapp.com",
    databaseURL: "https://dynamic-feature-voting.firebaseio.com",
    projectId: "dynamic-feature-voting",
    storageBucket: "dynamic-feature-voting.appspot.com",
    messagingSenderId: messagingSenderId,
    appId: appId,
    measurementId: measurementId 
  };

firebase.initializeApp(firebaseConfig);
firebase.analytics();
var storage = firebase.storage();
export {
    storage, firebase as default
};