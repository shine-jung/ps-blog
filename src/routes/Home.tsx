import { useEffect, useState } from "react";
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
import { auth, db } from "../service/firebase";
import { IPostContent } from "../modules/types";
import PostList from "../components/PostList";
import { Container, Typography } from "@mui/material";

function Home() {
  const [postContents, setPostContents] = useState<IPostContent[]>();
  const getPostContents = async () => {
    const user = auth.currentUser;
    const postsCol = collection(db, "posts");
    const q = query(
      postsCol,
      where("userId", "==", user?.uid),
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
    getPostContents();
  }, []);
  return (
    <Container component="main" maxWidth="lg" sx={{ mt: 8, mb: 16 }}>
      <Typography variant="h4" sx={{ mb: 4 }}>
        나의 글
      </Typography>
      <PostList postContents={postContents} />
    </Container>
  );
}

export default Home;
