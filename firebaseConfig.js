"use strict";
// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getDatabase } from "firebase/database";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyDKDbQsh-ttXTBBpewtfiI_6ag_OABlrPE",
//   authDomain: "strategy-programming-7525.firebaseapp.com",
//   databaseURL: "https://strategy-programming-7525-default-rtdb.firebaseio.com",
//   projectId: "strategy-programming-7525",
//   storageBucket: "strategy-programming-7525.firebasestorage.app",
//   messagingSenderId: "611655993814",
//   appId: "1:611655993814:web:7c30807b2ccdf1303e3c77"
// };
// // Initialize Firebase
// export const firebase = initializeApp(firebaseConfig);
// export const db = getDatabase(firebase);
//2026
// Import the functions you need from the SDKs you need
var app_1 = require("firebase/app");
var database_1 = require("firebase/database");
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
    apiKey: "AIzaSyBmButG3NcgfgaNoBMq29ur2pZTgmgi4Wc",
    authDomain: "team-7525-scouting-app-2026.firebaseapp.com",
    databaseURL: "https://team-7525-scouting-app-2026-default-rtdb.firebaseio.com",
    projectId: "team-7525-scouting-app-2026",
    storageBucket: "team-7525-scouting-app-2026.firebasestorage.app",
    messagingSenderId: "386797533428",
    appId: "1:386797533428:web:4c1bf87a963baa7953c6a1",
    measurementId: "G-93E7276CXX"
};
// Initialize Firebase
var app = (0, app_1.initializeApp)(firebaseConfig);
exports.db = (0, database_1.getDatabase)(app);
