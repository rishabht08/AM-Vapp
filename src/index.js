import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore , applyMiddleware } from "redux";
import reducer from "./store/reducers/index"
import { Provider } from 'react-redux';
import thunk from "redux-thunk";
import * as firebase from "firebase";

// Your web app's Firebase configuration
let firebaseConfig = {
    apiKey: "AIzaSyBxb-J3FkHGUdnWYCUiJUknUfDXrUqz1TA",
    authDomain: "videostreaming-a768a.firebaseapp.com",
    databaseURL: "https://videostreaming-a768a.firebaseio.com",
    projectId: "videostreaming-a768a",
    storageBucket: "videostreaming-a768a.appspot.com",
    messagingSenderId: "297659658307",
    appId: "1:297659658307:web:95f376587b6085fc3364f6",
    measurementId: "G-HXX95YGR3G"
};
// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);


const store = createStore(reducer , applyMiddleware(thunk));
const jsx = (
    <Provider store = {store}>
        <App/>
    </Provider>
)

ReactDOM.render(jsx, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
