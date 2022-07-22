import { atom } from "recoil";

export const isDarkAtom = atom({
  key: "isDark",
  default: localStorage.getItem("darkMode") === "true",
});
