import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUser } from "../service/user";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../service/firebase";
import { IPostContent, IUser } from "../modules/types";
import PostList from "../components/PostList";
import { Container, Typography } from "@mui/material";
import { Loader } from "../components/styledComponents";

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
  return (
    <>
      {isVaild ? (
        init && userObj ? (
          <Container component="main" maxWidth="lg" sx={{ my: 16 }}>
            <Typography variant="h4" sx={{ mb: 4 }}>
              {userObj.name}님의 글
            </Typography>
            <PostList postContents={postContents} />
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
