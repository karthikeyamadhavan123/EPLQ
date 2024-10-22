// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBLxX0X-Pdi_qUcgvJO2j5haTh8eJe_nUU",
  authDomain: "eplq-5abec.firebaseapp.com",
  projectId: "eplq-5abec",
  storageBucket: "eplq-5abec.appspot.com",
  messagingSenderId: "599767409154",
  appId: "1:599767409154:web:a7372f1729ec746bb8fd1b",
  measurementId: "G-Z7SKLES4BF"
};

const app = initializeApp(firebaseConfig);

export const auth=getAuth();
export const db=getFirestore(app);
export default app;
