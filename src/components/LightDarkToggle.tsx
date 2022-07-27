import { useRecoilValue, useSetRecoilState } from "recoil";
import { isDarkAtom } from "../services/atoms";
import { IconButton } from "@mui/material";
import Sun from "@mui/icons-material/LightMode";
import Moon from "@mui/icons-material/DarkMode";

function LightDarkToggle() {
  const isDark = useRecoilValue(isDarkAtom);
  const setDarkAtom = useSetRecoilState(isDarkAtom);
  const toggleDarkAtom = () => setDarkAtom((prev) => !prev);
  localStorage.setItem("darkMode", isDark.toString());
  return (
    <IconButton onClick={toggleDarkAtom} sx={{ width: 32, height: 32 }}>
      {isDark ? (
        <Sun sx={{ width: 20, height: 20 }} />
      ) : (
        <Moon sx={{ width: 20, height: 20 }} />
      )}
    </IconButton>
  );
}

export default LightDarkToggle;
