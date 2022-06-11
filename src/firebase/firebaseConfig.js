
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyBHtmAkc2CtunaILgnCi9VpbXLIZCOCBKw",
  authDomain: "sprint3-95a36.firebaseapp.com",
  projectId: "sprint3-95a36",
  storageBucket: "sprint3-95a36.appspot.com",
  messagingSenderId: "1043645046597",
  appId: "1:1043645046597:web:f47fac58be4a077fd3282c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const google = new GoogleAuthProvider();

export {
    app,
    google
}