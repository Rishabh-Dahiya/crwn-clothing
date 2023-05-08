import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDwReBGjna0ly6oRrWC2f29sKjokvfWV0U",
  authDomain: "crwn-clothing-db-65c78.firebaseapp.com",
  projectId: "crwn-clothing-db-65c78",
  storageBucket: "crwn-clothing-db-65c78.appspot.com",
  messagingSenderId: "116700336665",
  appId: "1:116700336665:web:f1b9ae42e96def6dfed088",
};

const firebaseApp = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
});
export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, "users", userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
      });
    } catch (error) {
      console.log("error creating  a user", error.message);
    }
  }
  return userDocRef;
};
