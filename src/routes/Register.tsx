import { useState } from "react";
import { doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../service/firebase";
import { logout } from "../service/auth";
import { Container, Box, Button, Typography } from "@mui/material";
import { StyledInputBase } from "../components/styledComponents";
import { ICurrentUser } from "../modules/types";

interface IFormData {
  name?: string;
  email?: string;
  id?: string;
  bojId?: string;
  introduction?: string;
}

interface IRegisterProps {
  refreshUser: () => void;
  userObj: ICurrentUser | null;
}

function Register({ refreshUser, userObj }: IRegisterProps) {
  const [formData, setFormData] = useState<IFormData>();
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const user = auth.currentUser;
    if (!user) return;
    const userRef = doc(db, "users", user.uid);
    await updateDoc(userRef, {
      ...formData,
      blogTitle: `${formData?.name}님의 블로그`,
      isRegistered: true,
      createdTime: serverTimestamp(),
      lastLoginTime: serverTimestamp(),
    });
    refreshUser();
    alert("가입이 완료되었습니다");
  };
  return (
    <Container component="main" maxWidth="md" sx={{ mt: 8, mb: 16 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        환영합니다!
      </Typography>
      <Typography variant="h5" sx={{ mb: 4 }}>
        회원 정보를 입력해주세요
      </Typography>
      <form onSubmit={onSubmit}>
        <Box marginBottom={2}>
          <Typography marginBottom={1}>이름</Typography>
          <StyledInputBase
            type="text"
            name="name"
            defaultValue={userObj?.name}
            onChange={onChange}
            required
          />
        </Box>
        <Box marginBottom={2}>
          <Typography marginBottom={1}>이메일</Typography>
          <StyledInputBase
            type="email"
            name="email"
            defaultValue={userObj?.email}
            sx={{ width: 300 }}
            onChange={onChange}
            required
          />
        </Box>
        <Box marginBottom={2}>
          <Typography marginBottom={1}>아이디</Typography>
          <StyledInputBase type="text" name="id" onChange={onChange} required />
        </Box>
        <Box marginBottom={2}>
          <Typography marginBottom={1}>백준 아이디</Typography>
          <StyledInputBase
            type="text"
            name="bojId"
            onChange={onChange}
            required
          />
        </Box>
        <Box marginBottom={4}>
          <Typography marginBottom={1}>한 줄 소개</Typography>
          <StyledInputBase
            type="text"
            name="introduction"
            sx={{ width: 400 }}
            onChange={onChange}
            required
          />
        </Box>
        <Button
          onClick={logout}
          variant="outlined"
          color="secondary"
          sx={{ mr: 2 }}
        >
          취소
        </Button>
        <Button type="submit" variant="outlined" color="primary">
          가입
        </Button>
      </form>
    </Container>
  );
}

export default Register;
