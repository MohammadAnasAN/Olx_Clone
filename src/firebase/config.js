import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCOB7VYmEy5-c7e8cBVUK4n56dTz8Bnggk",
    authDomain: "olx-clone-cb131.firebaseapp.com",
    projectId: "olx-clone-cb131",
    storageBucket: "olx-clone-cb131.appspot.com",
    messagingSenderId: "382925633496",
    appId: "1:382925633496:web:8a60385c7b007a6c64e4ad",
    measurementId: "G-CX15QMWKQ9"
  };

export default firebase.initializeApp(firebaseConfig)
