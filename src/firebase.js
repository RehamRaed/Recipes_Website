import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAODqjh3O1Ukg7bcy0OIVDYWvqKy-raWyc",
  authDomain: "delicious-recipes-app.firebaseapp.com",
  projectId: "delicious-recipes-app",
  storageBucket: "delicious-recipes-app.appspot.com",
  messagingSenderId: "919551088506",
  appId: "1:919551088506:web:750399ac4159e09b3a68c3",
  measurementId: "G-04NTN0XB8W"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app); 
