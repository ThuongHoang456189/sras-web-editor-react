// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyClVlSE1z37cRCk83R0TaoHQkwD0ZPa72c",
    authDomain: "web-content-editor-cf081.firebaseapp.com",
    projectId: "web-content-editor-cf081",
    storageBucket: "web-content-editor-cf081.appspot.com",
    messagingSenderId: "389201606751",
    appId: "1:389201606751:web:eaca6da75dd2dc6b9643ea",
    measurementId: "G-1PWYHEV5K8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);