import { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../services/firebase";
import { IPostContent } from "../types/types";
import PostList from "../components/PostList";
import { Container, Typography } from "@mui/material";
import { Loader } from "../components/components";
import { useRecoilValue } from "recoil";
import { searchTermState } from "../services/atoms";

function Main() {
  const [init, setInit] = useState(false);
  const searchTerm = useRecoilValue(searchTermState);
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
            {searchTerm === "" ? "전체 글" : `'${searchTerm}'의 검색 결과`}
          </Typography>
          <PostList
            postContents={postContents?.filter(
              (item) =>
                item.title?.includes(searchTerm) ||
                item.tags?.toString().includes(searchTerm) ||
                item.description?.includes(searchTerm)
            )}
            maxColum={3}
          />
        </Container>
      ) : (
        <Loader>Loading...</Loader>
      )}
    </>
  );
}

export default Main;
