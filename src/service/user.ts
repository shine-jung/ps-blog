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
    uid: user.uid,
    name: user.displayName,
    email: user.providerData[0].email,
    photoURL: user.photoURL,
    isRegistered: false,
  });
};

export const getUser = async (uid: string) => {
  const userRef = doc(db, "users", uid);
  const docSnap = await getDoc(userRef);
  if (docSnap.exists()) {
    const userData = docSnap.data();
    return userData;
  }
};

const updateUser = async (uid: string, args: IUpdateUser) => {
  const userRef = doc(db, "users", uid);
  await updateDoc(userRef, {
    ...args,
  });
};

const deleteUser = async (uid: string) => {
  const userRef = doc(db, "users", uid);
  if (!window.confirm("계정을 삭제하시겠습니까? 모든 데이터가 삭제됩니다")) {
    alert("취소되었습니다");
    return;
  }
  await deleteDoc(userRef);
  alert("계정이 삭제되었습니다");
  logout();
};

export const getCurrentUser = async () => {
  const user = auth.currentUser;
  if (!user) return;
  const userRef = doc(db, "users", user.uid);
  const docSnap = await getDoc(userRef);
  if (docSnap.exists()) {
    await updateDoc(userRef, {
      lastLoginTime: serverTimestamp(),
    });
    const userData = {
      ...docSnap.data(),
      updateUser: (args: IUpdateUser) => updateUser(user.uid, args),
      deleteUser: () => deleteUser(user.uid),
    };
    return userData;
  } else {
    await addUser(user);
    const addedDocSnap = await getDoc(userRef);
    const addedUserData = {
      ...addedDocSnap.data(),
      updateUser: (args: IUpdateUser) => updateUser(user.uid, args),
      deleteUser: () => deleteUser(user.uid),
    };
    return addedUserData;
  }
};
