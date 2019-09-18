import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import * as firebase from "firebase/app";

var firebaseConfig = {
  apiKey: "AIzaSyB8b4FvKUqPu1JkLRR3YaFHSDggzuvcRGg",
  authDomain: "online-polygraph.firebaseapp.com",
  databaseURL: "https://online-polygraph.firebaseio.com",
  projectId: "online-polygraph",
  storageBucket: "online-polygraph.appspot.com",
  messagingSenderId: "592945055905",
  appId: "1:592945055905:web:a3e2dd9c3ef702702bc8e0"
};

firebase.initializeApp(firebaseConfig);

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
