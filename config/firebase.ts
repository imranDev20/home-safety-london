import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBhBbPrV-LNfvSLuW_EldNFUkUWSED0jeA",
  authDomain: "electric-service-77840.firebaseapp.com",
  projectId: "electric-service-77840",
  storageBucket: "electric-service-77840.appspot.com",
  messagingSenderId: "826709213020",
  appId: "1:826709213020:web:ca3c9091c116e1fc6ccb99"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth=getAuth(app);

export default auth;