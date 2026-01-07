// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDKDbQsh-ttXTBBpewtfiI_6ag_OABlrPE",
  authDomain: "strategy-programming-7525.firebaseapp.com",
  databaseURL: "https://strategy-programming-7525-default-rtdb.firebaseio.com",
  projectId: "strategy-programming-7525",
  storageBucket: "strategy-programming-7525.firebasestorage.app",
  messagingSenderId: "611655993814",
  appId: "1:611655993814:web:7c30807b2ccdf1303e3c77"
};

// Initialize Firebase
export const firebase = initializeApp(firebaseConfig);
export const db = getDatabase(firebase);