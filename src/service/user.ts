import { User } from "firebase/auth";
import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
} from "firebase/firestore";
import { IUpdateUser } from "../modules/types";
import { auth, db } from "../service/firebase";
import { logout } from "./auth";

const addUser = async (user: User) => {
  await setDoc(doc(db, "users", user.uid), {
    authUid: user.uid,
    id: null,
    name: user.displayName,
    email: user.providerData[0].email,
    photoURL: user.photoURL,
    isRegistered: false,
  });
};

export const getUser = async (id: string) => {
  const userRef = doc(db, "users", id);
  const docSnap = await getDoc(userRef);
  if (docSnap.exists()) {
    const userData = docSnap.data();
    return userData;
  }
};

export const updateUser = async (id: string, args: IUpdateUser) => {
  const userRef = doc(db, "users", id);
  await updateDoc(userRef, {
    ...args,
  });
};

export const deleteUser = async (id: string) => {
  const user = auth.currentUser;
  if (!user) return;
  const authRef = doc(db, "users", user.uid);
  const userRef = doc(db, "users", id);
  if (!window.confirm("계정을 삭제하시겠습니까? 모든 데이터가 삭제됩니다")) {
    alert("취소되었습니다");
    return;
  }
  await deleteDoc(authRef);
  await deleteDoc(userRef);
  alert("계정이 삭제되었습니다");
  logout();
};

export const getCurrentUser = async () => {
  const user = auth.currentUser;
  if (!user) return;
  const authRef = doc(db, "users", user.uid);
  const authDocSnap = await getDoc(authRef);
  if (authDocSnap.exists()) {
    const authData = authDocSnap.data();
    const id = authData.id;
    if (!id) return authData;
    const userRef = doc(db, "users", id);
    await updateDoc(userRef, {
      lastLoginTime: serverTimestamp(),
    });
    const userDocSnap = await getDoc(userRef);
    const userData = userDocSnap.data();
    return userData;
  } else {
    await addUser(user);
    const addedDocSnap = await getDoc(authRef);
    const addedUserData = addedDocSnap.data();
    return addedUserData;
  }
};
