// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getStorage} from 'firebase/storage'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCmNg7BoH-w352s4TFJeI_-nkNF1kUZL3c",
  authDomain: "upload-file-aaea2.firebaseapp.com",
  projectId: "upload-file-aaea2",
  storageBucket: "upload-file-aaea2.appspot.com",
  messagingSenderId: "187022863572",
  appId: "1:187022863572:web:f35f2b7ecefb1abb771f41"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app)