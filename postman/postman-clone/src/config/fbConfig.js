// Your web app's Firebase configuration
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
var firebaseConfig = {
  apiKey: 'AIzaSyCxaQuLhkBx-3xqDqr6TXctIpZ7IkqfExs',
  authDomain: 'postman-5da73.firebaseapp.com',
  databaseURL: 'https://postman-5da73.firebaseio.com',
  projectId: 'postman-5da73',
  storageBucket: 'postman-5da73.appspot.com',
  messagingSenderId: '771821813153',
  appId: '1:771821813153:web:a664904f2dcc84c727dfe0',
  measurementId: 'G-B1KDYCX40F'
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;

