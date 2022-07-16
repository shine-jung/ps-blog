import {
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithRedirect,
  signOut,
} from "firebase/auth";
import { auth } from "../service/firebase";

export const login = (providerName: string) => {
  let provider;
  if (providerName === "google") {
    provider = new GoogleAuthProvider();
  } else if (providerName === "github") {
    provider = new GithubAuthProvider();
  }
  if (!provider) return;
  signInWithRedirect(auth, provider);
};

export const logout = () => {
  signOut(auth);
};
