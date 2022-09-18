
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";



const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: "leanced-d8c33.firebaseapp.com",
    projectId: "leanced-d8c33",
    storageBucket: "leanced-d8c33.appspot.com",
    messagingSenderId: "1037383663366",
    appId: "1:1037383663366:web:daef01e85e5168c60ba887",
    measurementId: "G-0X6JE0D2ZF"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);   //Initializing firestore DB

export const auth = getAuth();    //Initializing firebase auth

export const storage = getStorage(app); // initializing firebase cloud storage(image/file upload)


const analytics = getAnalytics(app);