import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import {getFirestore} from "firebase/firestore"
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyB2pLJo7nQIBe4EELarDkgRH7LQkrwKj0U",
  authDomain: "formiot1234.firebaseapp.com",
  projectId: "formiot1234",
  storageBucket: "formiot1234.appspot.com",
  messagingSenderId: "622297763824",
  appId: "1:622297763824:web:967098bf059859cc235735"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)
export const auth = getAuth(app)   
export const storage = getStorage(app);