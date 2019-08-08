import firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyA-EBSd1KpQK7cE2mp8AES2roq_2ytqBKA",
    authDomain: "react-todo-8da15.firebaseapp.com",
    databaseURL: "https://react-todo-8da15.firebaseio.com",
    projectId: "react-todo-8da15",
    storageBucket: "",
    messagingSenderId: "683457953809",
    appId: "1:683457953809:web:bc06161f13d6a35a"
  };
// Initialize Firebase
const fire = firebase.initializeApp(firebaseConfig);
export default fire;