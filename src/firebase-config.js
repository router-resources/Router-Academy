
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyDihhmBtPNRflzzg5U_opo0EQPYg82U7Sk",
  authDomain: "routeracademy-4e7cc.firebaseapp.com",
  projectId: "routeracademy-4e7cc",
  storageBucket: "routeracademy-4e7cc.appspot.com",
  messagingSenderId: "350895920413",
  appId: "1:350895920413:web:9b224b1b849d1a2ecdbdf4",
  measurementId: "G-1BBXXG629E"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export const signInWithGoogle = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      const name = result.user.displayName;
      const email = result.user.email;
      const profilePic = result.user.photoURL;
      console.log(profilePic);
      console.log(name);
      console.log(email);
      localStorage.setItem("name", name);
      localStorage.setItem("email", email);
      localStorage.setItem("profilePic", profilePic);
      window.location.reload(true)
    })
    .catch((error) => {
      console.log(error);
    });
};