import {
  signInWithPopup,
  signOut,
  GoogleAuthProvider,
  GithubAuthProvider,
} from "firebase/auth";
import { auth } from "./firebase";

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

export const login = (provider: string) => {
  if (provider === "google") {
    signInWithPopup(auth, googleProvider);
  } else if (provider === "github") {
    signInWithPopup(auth, githubProvider);
  }
};

export const logout = () => {
  signOut(auth);
  return;
};
