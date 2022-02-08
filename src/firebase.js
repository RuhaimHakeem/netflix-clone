// import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";
// import { initializeApp } from "firebase/app";

// const firebaseConfig = {
//   apiKey: "AIzaSyAYaQt23U2vMgh_KGcekN8pjgKLDlw0W0U",
//   authDomain: "netflix-clone-9f14e.firebaseapp.com",
//   projectId: "netflix-clone-9f14e",
//   storageBucket: "netflix-clone-9f14e.appspot.com",
//   messagingSenderId: "758032029731",
//   appId: "1:758032029731:web:558ef717b0393cdf6af996",
// };

// const firebaseApp = initializeApp(firebaseConfig);
// const auth = getAuth(firebaseApp);
// const db = getFirestore(firebaseApp);

// export { auth };
// export default db;

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { getFirestore, onSnapshot } from "firebase/firestore";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAYaQt23U2vMgh_KGcekN8pjgKLDlw0W0U",
  authDomain: "netflix-clone-9f14e.firebaseapp.com",
  projectId: "netflix-clone-9f14e",
  storageBucket: "netflix-clone-9f14e.appspot.com",
  messagingSenderId: "758032029731",
  appId: "1:758032029731:web:558ef717b0393cdf6af996",
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth();

export { auth };
export { createUserWithEmailAndPassword, signInWithEmailAndPassword };
export { onAuthStateChanged };
export { db, onSnapshot };
