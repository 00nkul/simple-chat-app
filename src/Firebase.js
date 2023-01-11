import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth";
import { getStorage } from "firebase/storage";
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyBTdicnnK6NZWJK20cLId4BZZLmgdsd8nM",
    authDomain: "chattapp-8219d.firebaseapp.com",
    projectId: "chattapp-8219d",
    storageBucket: "chattapp-8219d.appspot.com",
    messagingSenderId: "232522265924",
    appId: "1:232522265924:web:2911bfa686e9853bd05311",
    measurementId: "G-NS4S5T9Q41"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();