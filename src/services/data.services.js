import { db } from "../firebase";

import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

const userCollectionRef = collection(db, "users")
class userDataService {
  addUsers = (newuser) => {
    return addDoc(userCollectionRef, newuser);
  };

  updateUser = (id, updateduser) => {
    const userDoc = doc(db, "users", id);
    return updateDoc(userDoc, updateduser);
  };

  deleteUser = (id) => {
    const userDoc = doc(db, "users", id);
    return deleteDoc(userDoc);
  };

  getAllUsers = () => {
    return getDocs(userCollectionRef);
  };

  getUser = (id) => {
    const userDoc = doc(db, "users", id);
    return getDoc(userDoc);
  };
}

export default new userDataService();