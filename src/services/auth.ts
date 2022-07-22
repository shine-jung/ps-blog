import {
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth } from "./firebase";

export const login = (providerName: string) => {
  let provider;
  if (providerName === "google") {
    provider = new GoogleAuthProvider();
  } else if (providerName === "github") {
    provider = new GithubAuthProvider();
  }
  if (!provider) return;
  signInWithPopup(auth, provider);
};

export const logout = () => {
  signOut(auth);
};
