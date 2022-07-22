import React, { useEffect, useState } from "react";
import { db, storage } from "../services/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  Box,
  Container,
  Button,
  Typography,
  Avatar,
  Divider,
} from "@mui/material";
import { IUser, IUpdateUser } from "../types/types";
import { updateUser, deleteUser } from "../services/user";
import { TextInput } from "../components/components";
import { doc, getDoc, updateDoc } from "firebase/firestore";

interface IProfileProps {
  refreshUser: () => void;
  userObj: IUser | null;
}

interface IFormData {
  name?: string;
  email?: string;
  bojId?: string;
  blogTitle?: string;
  introduction?: string;
}

function Profile({ refreshUser, userObj }: IProfileProps) {
  const [isImgUpdateLoading, setIsImgUpdateLoading] = useState(false);
  const [newImgFile, setNewImgFile] = useState<File | null>(null);
  const [newImgDir, setNewImgDir] = useState<string | ArrayBuffer | null>(
    userObj?.photoURL ?? null
  );
  const [formData, setFormData] = useState<IFormData>({
    name: userObj?.name,
    email: userObj?.email,
    bojId: userObj?.bojId,
    blogTitle: userObj?.blogTitle,
    introduction: userObj?.introduction,
  });
  const onChangeProfileImg = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();
    fileReader.onload = function () {
      setNewImgDir(fileReader.result);
    };
    const { files } = event.target;
    setNewImgFile(files ? files[0] : null);
    if (files) fileReader.readAsDataURL(files[0]);
  };
  const onChangeFormData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const onSubmitProfileImg = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    if (newImgFile && newImgFile.size > 2 * 1024 * 1024) {
      alert("2MB 이하의 사진을 첨부해주세요");
      return;
    }
    if (userObj?.id && newImgFile?.name) {
      setIsImgUpdateLoading(true);
      const storageRef = ref(
        storage,
        `images/profile/${userObj.id}/${newImgFile.name}`
      );
      await uploadBytes(storageRef, newImgFile);
      getDownloadURL(
        ref(storage, `images/profile/${userObj.id}/${newImgFile.name}`)
      ).then(async (url) => {
        if (!userObj.id) return;
        await updateUser(userObj.id, {
          photoURL: url,
        } as IUpdateUser);
        if (userObj.articleNumber) {
          for (let i = 0; i < userObj.articleNumber; i++) {
            const docRef = doc(db, "posts", `@${userObj.id}_${i}`);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists())
              await updateDoc(docRef, {
                userPhotoURL: url,
              });
          }
        }
        refreshUser();
        setIsImgUpdateLoading(false);
        alert("프로필 사진 변경이 완료되었습니다");
      });
    }
  };
  const onSubmitFormData = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!userObj?.id) return;
    await updateUser(userObj.id, {
      ...formData,
    } as IUpdateUser);
    refreshUser();
    alert("프로필이 업데이트 되었습니다");
  };
  const onClickDeleteBtn = async () => {
    if (!userObj?.id) return;
    await deleteUser(userObj);
  };
  useEffect(() => {
    const titleElement = document.getElementsByTagName("title")[0];
    titleElement.innerHTML = `프로필 - pslog`;
  }, []);
  return (
    <>
      {userObj && (
        <Container component="main" maxWidth="md">
          <Typography variant="h4" sx={{ mb: 3 }}>
            Profile
          </Typography>
          <Box px={4} pt={4}>
            <Box display="flex" alignItems="center">
              <Avatar
                alt={userObj.name}
                src={typeof newImgDir === "string" ? newImgDir : undefined}
                sx={{ width: 100, height: 100 }}
              />
              <Box ml={4}>
                <div>
                  <form onSubmit={onSubmitProfileImg}>
                    <Box mb={1}>
                      <Button
                        variant="outlined"
                        component="label"
                        disabled={isImgUpdateLoading}
                      >
                        사진 선택
                        <input
                          type="file"
                          accept="image/x-png, image/gif, image/jpeg"
                          onChange={onChangeProfileImg}
                          hidden
                        />
                      </Button>
                    </Box>
                    <Button
                      type={isImgUpdateLoading ? undefined : "submit"}
                      variant="contained"
                      disabled={isImgUpdateLoading}
                    >
                      프로필 사진 변경
                    </Button>
                  </form>
                </div>
              </Box>
            </Box>
            <Divider sx={{ my: 4 }} />
            <form onSubmit={onSubmitFormData}>
              <Box marginBottom={2}>
                <Typography marginBottom={1}>이름</Typography>
                <TextInput
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={onChangeFormData}
                  required
                />
              </Box>
              <Box marginBottom={2}>
                <Typography marginBottom={1}>이메일</Typography>
                <TextInput
                  type="email"
                  name="email"
                  value={formData.email}
                  sx={{ width: 300 }}
                  onChange={onChangeFormData}
                  required
                />
              </Box>
              <Box marginBottom={2}>
                <Typography marginBottom={1}>아이디</Typography>
                <TextInput type="text" name="id" value={userObj.id} disabled />
              </Box>
              <Box marginBottom={2}>
                <Typography marginBottom={1}>백준 아이디 (선택)</Typography>
                <TextInput
                  type="text"
                  name="bojId"
                  value={formData.bojId}
                  onChange={onChangeFormData}
                />
              </Box>
              <Box marginBottom={2}>
                <Typography marginBottom={1}>블로그 제목</Typography>
                <TextInput
                  type="text"
                  name="blogTitle"
                  value={formData.blogTitle}
                  sx={{ width: 400 }}
                  onChange={onChangeFormData}
                  required
                />
              </Box>
              <Box marginBottom={3}>
                <Typography marginBottom={1}>한 줄 소개</Typography>
                <TextInput
                  type="text"
                  name="introduction"
                  value={formData.introduction}
                  sx={{ width: 400 }}
                  onChange={onChangeFormData}
                  required
                />
              </Box>
              <Button
                type="submit"
                variant="outlined"
                color="primary"
                sx={{ mr: 2 }}
              >
                프로필 수정
              </Button>
            </form>
            <Divider sx={{ my: 4 }} />
            <Typography sx={{ mb: 1 }}>회원 탈퇴</Typography>
            <Button variant="outlined" color="error" onClick={onClickDeleteBtn}>
              계정 삭제
            </Button>
            <Typography sx={{ mt: 1 }}>
              주의! 모든 정보가 사라지며 복구되지 않습니다.
            </Typography>
          </Box>
        </Container>
      )}
    </>
  );
}

export default Profile;
