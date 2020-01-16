import firebase from 'firebase/app';
import 'firebase/storage';
var firebaseConfig = {
    apiKey: "AIzaSyCSqb8S8Z2z_0QYHrdCKmmxRuZKokNMwR0",
    authDomain: "dynamic-feature-voting.firebaseapp.com",
    databaseURL: "https://dynamic-feature-voting.firebaseio.com",
    projectId: "dynamic-feature-voting",
    storageBucket: "dynamic-feature-voting.appspot.com",
    messagingSenderId: "1031801399859",
    appId: "1:1031801399859:web:25b2f444eeeb5a5ff45146",
    measurementId: "G-MB4CJFZ2PP"
  };
firebase.initializeApp(firebaseConfig);
var storage = firebase.storage();
export {
    storage, firebase as default
};