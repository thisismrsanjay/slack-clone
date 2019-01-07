import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

var config = {
    apiKey: "AIzaSyA_nYoQgBegXpF4_TvwN7enFUCnxsv5up4",
    authDomain: "slack-sanjay.firebaseapp.com",
    databaseURL: "https://slack-sanjay.firebaseio.com",
    projectId: "slack-sanjay",
    storageBucket: "slack-sanjay.appspot.com",
    messagingSenderId: "373191512982"
  };
  firebase.initializeApp(config);


  export default firebase ;