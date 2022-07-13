import { useRecoilValue, useSetRecoilState } from "recoil";
import { isDarkAtom } from "../service/atoms";
import { IconButton, Tooltip } from "@mui/material";
import Moon from "@mui/icons-material/DarkMode";
import Sun from "@mui/icons-material/LightMode";

function LightDarkToggle() {
  const isDark = useRecoilValue(isDarkAtom);
  const setDarkAtom = useSetRecoilState(isDarkAtom);
  const toggleDarkAtom = () => setDarkAtom((prev) => !prev);
  localStorage.setItem("darkMode", isDark.toString());
  return (
    <>
      <Tooltip title={isDark ? "라이트 모드" : "다크 모드"} arrow>
        <IconButton onClick={toggleDarkAtom} sx={{ width: 32, height: 32 }}>
          {isDark ? (
            <Sun sx={{ width: 20, height: 20 }} />
          ) : (
            <Moon sx={{ width: 20, height: 20 }} />
          )}
        </IconButton>
      </Tooltip>
    </>
  );
}

export default LightDarkToggle;
