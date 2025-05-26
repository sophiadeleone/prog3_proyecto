import app from "firebase/app"
import firebase from "firebase"


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAiZ6Pvv5vp_DS5DavB6fdpQOaF7IEsk_E",
  authDomain: "fir-1-687fb.firebaseapp.com",
  projectId: "fir-1-687fb",
  storageBucket: "fir-1-687fb.firebasestorage.app",
  messagingSenderId: "455876986767",
  appId: "1:455876986767:web:2521657a0c867fe6a0adfa"
};

app.initializeApp(firebaseConfig)

export const auth = firebase.auth()
export const storage = app.storage()
export const db = app.firestore()