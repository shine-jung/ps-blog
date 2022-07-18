import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUser } from "../service/user";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../service/firebase";
import { IPostContent, IUser } from "../modules/types";
import PostList from "../components/PostList";
import {
  Container,
  Box,
  Typography,
  Divider,
  Avatar,
  Link,
} from "@mui/material";
import { CustomBox, Loader } from "../components/styledComponents";

function Home() {
  const { userId } = useParams();
  const [init, setInit] = useState(false);
  const [isVaild, setIsVaild] = useState(true);
  const [userObj, setUserObj] = useState<IUser | null>();
  const [postContents, setPostContents] = useState<IPostContent[]>();
  useEffect(() => {
    const getPostContents = async () => {
      const postsCol = collection(db, "posts");
      const q = query(postsCol, where("userId", "==", userId));
      const querySnapshot = await getDocs(q);
      setPostContents(
        querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          postId: doc.id,
        }))
      );
    };
    if (!userId) return;
    getUser(userId).then((userData) => {
      if (!userData) {
        setIsVaild(false);
        return;
      }
      setUserObj(userData);
      getPostContents();
    });
    setInit(true);
  }, [userId]);
  useEffect(() => {
    const titleElement = document.getElementsByTagName("title")[0];
    titleElement.innerHTML = `${userId} - pslog`;
  }, [userId]);
  return (
    <>
      {isVaild ? (
        init && userObj ? (
          <Container component="main" maxWidth="md" sx={{ my: 16 }}>
            <CustomBox mx={4} alignItems="center">
              <Box display="flex" alignItems="center">
                <Avatar
                  alt={userObj.name}
                  src={userObj.photoURL}
                  sx={{ width: 128, height: 128 }}
                />
                <Box ml={4}>
                  <Typography fontSize={24} fontWeight={600} sx={{ mb: 0.5 }}>
                    {userObj.blogTitle}
                  </Typography>
                  <Typography fontSize={18}>{userObj.introduction}</Typography>
                </Box>
              </Box>
              {userObj.bojId && (
                <Link
                  href={`https://www.acmicpc.net/user/${userObj.bojId}`}
                  color="info.main"
                  underline="hover"
                  target="_blank"
                  rel="noopener"
                >
                  /&lt;&gt; 백준 프로필
                </Link>
              )}
            </CustomBox>
            <Divider sx={{ mx: 4, mt: 6, mb: 8 }} />
            <PostList postContents={postContents} maxColum={2} />
          </Container>
        ) : (
          <Loader>Loading...</Loader>
        )
      ) : (
        <Loader>잘못된 주소입니다.</Loader>
      )}
    </>
  );
}

export default Home;
