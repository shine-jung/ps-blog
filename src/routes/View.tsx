import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getUser } from "../service/user";
import { IPostContent, IUser } from "../modules/types";
import { doc, getDoc, deleteDoc } from "firebase/firestore";
import { auth, db } from "../service/firebase";
import { Box, Container, Typography, Link } from "@mui/material";
import { Label, CustomBox, Loader } from "../components/components";
import { levels } from "../commons/constants";
import ViewDescription from "../components/ViewDescription";
import ViewCode from "../components/ViewCode";
import ViewTags from "../components/ViewTags";
import ViewWriter from "../components/ViewWriter";
import { getDisplayTimeByTimestamp } from "../modules/functions";

function View() {
  const user = auth.currentUser;
  const navigate = useNavigate();
  const { userId, articleNumber } = useParams();
  const [init, setInit] = useState(false);
  const [isVaild, setIsVaild] = useState(true);
  const [userObj, setUserObj] = useState<IUser | null>();
  const [postContent, setPostContent] = useState<IPostContent>();
  const removePost = async (postId: string | null) => {
    if (!postId) return;
    await deleteDoc(doc(db, "posts", postId));
    navigate({ pathname: `/@${userId}` });
    alert("글이 삭제되었습니다");
  };
  useEffect(() => {
    const getPostContent = async () => {
      const docRef = doc(db, "posts", `@${userId}_${articleNumber}`);
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) {
        setIsVaild(false);
        return;
      }
      setPostContent(docSnap.data());
    };
    if (!userId) return;
    getUser(userId).then((userData) => {
      if (!userData) {
        setIsVaild(false);
        return;
      }
      setUserObj(userData);
      getPostContent();
    });
    setInit(true);
  }, [userId, articleNumber]);
  useEffect(() => {
    const titleElement = document.getElementsByTagName("title")[0];
    titleElement.innerHTML = `${postContent?.title ?? `${userId}님의 포스트`}`;
  }, [postContent?.title, userId]);
  return (
    <>
      {isVaild ? (
        init && postContent ? (
          <Container component="main" maxWidth="md">
            <CustomBox>
              <Box display="flex" ml={1}>
                <img
                  src={`https://static.solved.ac/tier_small/${
                    postContent.level ? postContent.level : "sprout"
                  }.svg`}
                  alt={levels[postContent.level ?? 0]}
                  width="24px"
                />
                <Label variant="h6" sx={{ ml: 0.5 }}>
                  {levels[postContent.level ?? 0]}
                </Label>
              </Box>
              <Label variant="h6" fontWeight={300}>
                {postContent.language}
              </Label>
            </CustomBox>
            <Label variant="h3" mb={1}>
              {postContent.title}
            </Label>
            <CustomBox p={1} mb={1}>
              <Box display="flex">
                <ViewWriter userObj={userObj ?? null} userId={userObj?.id} />
                {postContent.uploadTime && (
                  <Typography>
                    &nbsp;&nbsp;·&nbsp;&nbsp;
                    {getDisplayTimeByTimestamp(postContent.uploadTime)}
                  </Typography>
                )}
              </Box>
              {user?.uid === userObj?.authUid && (
                <Link
                  component="button"
                  variant="body1"
                  color="text.secondary"
                  underline="hover"
                  onClick={() => {
                    if (window.confirm("글을 삭제하시겠습니까?")) {
                      removePost(postContent.postId ?? null);
                    }
                  }}
                >
                  삭제
                </Link>
              )}
            </CustomBox>
            <ViewDescription description={postContent.description} />
            {postContent.code && (
              <ViewCode
                code={postContent.code}
                language={postContent.language}
              />
            )}
            <CustomBox mt={8} p={1}>
              <ViewTags tags={postContent.tags} />
              {postContent.problemUrl && (
                <Link
                  padding={1}
                  color="info.main"
                  href={postContent.problemUrl}
                  target="_blank"
                  rel="noopener"
                >
                  문제 링크
                </Link>
              )}
            </CustomBox>
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

export default View;
