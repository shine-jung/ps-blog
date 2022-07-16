import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUser } from "../service/user";
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
import { auth, db } from "../service/firebase";
import { IPostContent, IUser } from "../modules/types";
import PostList from "../components/PostList";
import { Container, Typography } from "@mui/material";
import { Loader } from "../components/styledComponents";

function Home() {
  const user = auth.currentUser;
  const { userId } = useParams();
  const [isValid, setIsValid] = useState(false);
  const [userObj, setUserObj] = useState<IUser | null>();
  const [postContents, setPostContents] = useState<IPostContent[]>();
  const getPostContents = async (id: string) => {
    const postsCol = collection(db, "posts");
    const q = query(
      postsCol,
      where("id", "==", id),
      orderBy("uploadTime", "desc")
    );
    const querySnapshot = await getDocs(q);
    setPostContents(
      querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        postId: doc.id,
      }))
    );
  };
  useEffect(() => {
    if (!user?.uid) return;
    getUser(user.uid).then((userData) => {
      setUserObj(userData);
      if (!userData?.id) {
        setIsValid(false);
        return;
      }
      getPostContents(userData.id);
      setIsValid(true);
    });
  }, []);
  return (
    <>
      {isValid ? (
        <Container component="main" maxWidth="lg" sx={{ mt: 8, mb: 16 }}>
          <Typography variant="h4" sx={{ mb: 4 }}>
            {userObj?.name}님의 글
          </Typography>
          <PostList postContents={postContents} />
        </Container>
      ) : (
        <Loader>잘못된 주소입니다.</Loader>
      )}
    </>
  );
}

export default Home;
