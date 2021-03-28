import firebase from "firebase";



// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBG9fqCoH-DdtBBTxy0fM7OFWsWvh5To9A",
  authDomain: "chit-chat-a436d.firebaseapp.com",
  projectId: "chit-chat-a436d",
  storageBucket: "chit-chat-a436d.appspot.com",
  messagingSenderId: "608013510887",
  appId: "1:608013510887:web:2a9f3636b64586212d9a42",
  measurementId: "G-JJEYL83CNG"
};


const firebaseApp = firebase.initializeApp(firebaseConfig);
const db =firebase.firestore();
const auth=firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
export {auth , provider};
export default db;