import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC_q9x2DuRLKf_hnvOlwjZb_K_ZoSUsmEg",
  authDomain: "react-todo-app-ffa0e.firebaseapp.com",
  projectId: "react-todo-app-ffa0e",
  storageBucket: "react-todo-app-ffa0e.appspot.com",
  messagingSenderId: "35185105797",
  appId: "1:35185105797:web:436b70e025fcd57fac02ec",
  measurementId: "G-RZDJZTF7RR"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db };