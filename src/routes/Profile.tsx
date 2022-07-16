import { storage } from "../service/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Box, Container, Typography } from "@mui/material";
import React, { useState } from "react";
import { IUser, IUpdateUser } from "../modules/types";
import { deleteUser, updateUser } from "../service/user";

interface IProfileProps {
  refreshUser: () => void;
  userObj: IUser | null;
}

function Profile({ refreshUser, userObj }: IProfileProps) {
  const [isImgUpdateLoading, setIsImgUpdateLoading] = useState(false);
  const [newImgFile, setNewImgFile] = useState<File | null>(null);
  const [newImgDir, setNewImgDir] = useState<string | ArrayBuffer | null>(
    userObj?.photoURL ?? null
  );
  const [newName, setNewName] = useState<string | null>(userObj?.name ?? null);
  const onChangeProfileImg = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();
    fileReader.onload = function () {
      setNewImgDir(fileReader.result);
    };
    const { files } = event.target;
    setNewImgFile(files ? files[0] : null);
    if (files) fileReader.readAsDataURL(files[0]);
  };
  const onChangeProfileName = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setNewName(value);
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
      const storageRef = ref(storage, `${userObj.id}_${newImgFile.name}`);
      await uploadBytes(storageRef, newImgFile);
      getDownloadURL(ref(storage, `${userObj.id}_${newImgFile.name}`)).then(
        async (url) => {
          if (!userObj.id) return;
          await updateUser(userObj.id, {
            photoURL: url,
          } as IUpdateUser);
          refreshUser();
          setIsImgUpdateLoading(false);
          alert("사진 업데이트가 완료되었습니다");
        }
      );
    }
  };
  const onSubmitProfileName = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    if (!newName) {
      alert("새로운 이름을 입력해주세요");
      return;
    }
    if (userObj?.name !== newName) {
      if (!userObj?.id) return;
      await updateUser(userObj.id, {
        name: newName,
      } as IUpdateUser);
      refreshUser();
      alert("이름이 업데이트 되었습니다");
    }
  };
  const onClickDeleteBtn = async () => {
    if (!userObj?.id) return;
    await deleteUser(userObj.id);
  };
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: "20vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography>Profile</Typography>
        <Typography>{userObj?.email}</Typography>
        <Typography>{userObj?.name}</Typography>
        <img
          alt={userObj?.name ?? "이름"}
          src={typeof newImgDir === "string" ? newImgDir : undefined}
          width="100px"
          height="100px"
        />
        <div>
          <form onSubmit={onSubmitProfileImg}>
            <input
              type="file"
              accept="image/x-png, image/gif, image/jpeg"
              onChange={onChangeProfileImg}
            />
            <input type="submit" value="프로필 사진 변경" />
          </form>
          {isImgUpdateLoading ? "업데이트 중" : "업데이트 중 아님"}
        </div>
        <div>
          <form onSubmit={onSubmitProfileName}>
            <input
              onChange={onChangeProfileName}
              type="text"
              autoFocus
              placeholder="Display name"
              value={newName ?? ""}
            />
            <input type="submit" value="닉네임 변경" />
          </form>
        </div>
        <button onClick={onClickDeleteBtn}>계정 삭제</button>
      </Box>
    </Container>
  );
}

export default Profile;
