// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCl1h78-GNgEKayAkGm910E434xv0Bcirk",
  authDomain: "upload-file-bb269.firebaseapp.com",
  projectId: "upload-file-bb269",
  storageBucket: "upload-file-bb269.appspot.com",
  messagingSenderId: "402582204329",
  appId: "1:402582204329:web:38c3f0b852af9e4dfbdeb8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)