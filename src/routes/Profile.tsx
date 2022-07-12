import { auth, storage } from "../service/firebase";
import { deleteUser } from "firebase/auth";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Box, Container, Typography } from "@mui/material";
import React, { useState } from "react";
import { IUserObj, IUserUpdateArgs } from "../module/types";
import { logout } from "../service/auth";

interface IProfileProps {
  refreshUser: () => void;
  userObj: IUserObj | null;
}

function Profile({ refreshUser, userObj }: IProfileProps) {
  const [newImgFile, setNewImgFile] = useState<File | null>(null);
  const [newImgDir, setNewImgDir] = useState<string | ArrayBuffer | null>(
    userObj?.photoURL ?? null
  );
  const [newDisplayName, setNewDisplayName] = useState<string | null>(
    userObj?.displayName ?? null
  );
  const onChangeProfileImg = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();
    fileReader.onload = function () {
      setNewImgDir(fileReader.result);
    };
    const {
      target: { files },
    } = event;
    setNewImgFile(files ? files[0] : null);
    if (files) fileReader.readAsDataURL(files[0]);
  };
  const onChangeProfileName = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = event;
    setNewDisplayName(value);
  };
  const onSubmitProfileImg = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    if (newImgFile && newImgFile.size > 2 * 1024 * 1024) {
      alert("2MB 이하의 사진을 첨부해주세요");
      return;
    }
    if (userObj?.uid && newImgFile?.name) {
      const storageRef = ref(storage, `${userObj.uid}_${newImgFile.name}`);
      await uploadBytes(storageRef, newImgFile);
      getDownloadURL(ref(storage, `${userObj.uid}_${newImgFile.name}`)).then(
        async (url) => {
          await userObj
            ?.updateProfile({
              photoURL: url,
            } as IUserUpdateArgs)
            .then(() => {
              alert("사진 업데이트가 완료되었습니다");
            });
        }
      );
      refreshUser();
    }
  };
  const onSubmitProfileName = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    if (!newDisplayName) {
      alert("새로운 이름을 입력해주세요");
      return;
    }
    if (userObj?.displayName !== newDisplayName) {
      await userObj
        ?.updateProfile({
          displayName: newDisplayName,
        } as IUserUpdateArgs)
        .then(() => {
          alert("이름이 업데이트 되었습니다");
        });
      refreshUser();
    }
  };
  const onClickDeleteBtn = () => {
    const user = auth.currentUser;
    if (user) {
      deleteUser(user)
        .then(() => {
          alert("계정이 삭제되었습니다");
        })
        .catch((error) => {
          logout();
          alert("다시 로그인 후 시도해주세요");
        });
    }
  };
  return (
    <>
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
          <Typography>{userObj?.displayName}</Typography>
          <img
            alt={userObj?.displayName ?? "이름"}
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
          </div>
          <div>
            <form onSubmit={onSubmitProfileName}>
              <input
                onChange={onChangeProfileName}
                type="text"
                autoFocus
                placeholder="Display name"
                value={newDisplayName ?? ""}
              />
              <input type="submit" value="닉네임 변경" />
            </form>
          </div>
          <button onClick={onClickDeleteBtn}>계정 삭제</button>
        </Box>
      </Container>
    </>
  );
}

export default Profile;
