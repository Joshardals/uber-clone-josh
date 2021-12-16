import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA4q7AV_iOmAWMOjYxZv8B2jkbwxA4CP20",
  authDomain: "uber-clone-josh.firebaseapp.com",
  projectId: "uber-clone-josh",
  storageBucket: "uber-clone-josh.appspot.com",
  messagingSenderId: "366444262675",
  appId: "1:366444262675:web:218a09e756b665dd26d6e6",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();

export { app, auth, provider };
