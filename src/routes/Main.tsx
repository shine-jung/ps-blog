import { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../services/firebase";
import { IPostContent } from "../types/types";
import PostList from "../components/PostList";
import { Container, Typography } from "@mui/material";
import { Loader } from "../components/components";

function Main() {
  const [init, setInit] = useState(false);
  const [postContents, setPostContents] = useState<IPostContent[]>();
  const getPostContents = async () => {
    const postsCol = collection(db, "posts");
    const q = query(postsCol, orderBy("uploadTime", "desc"));
    const querySnapshot = await getDocs(q);
    setPostContents(
      querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        postId: doc.id,
      }))
    );
  };
  useEffect(() => {
    const titleElement = document.getElementsByTagName("title")[0];
    titleElement.innerHTML = `pslog`;
    getPostContents();
    setInit(true);
  }, []);
  return (
    <>
      {init ? (
        <Container component="main" maxWidth="lg">
          <Typography variant="h4" sx={{ mb: 4 }}>
            전체 글
          </Typography>
          <PostList postContents={postContents} maxColum={3} />
        </Container>
      ) : (
        <Loader>Loading...</Loader>
      )}
    </>
  );
}

export default Main;
