import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getUser } from "../service/user";
import { IPostContent, IUser } from "../modules/types";
import { doc, getDoc, deleteDoc } from "firebase/firestore";
import { auth, db } from "../service/firebase";
import {
  Box,
  Container,
  Typography,
  IconButton,
  Link,
  Tooltip,
  Tab,
} from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Label, CustomBox, Loader } from "../components/styledComponents";
import { levels } from "../commons/constants";
import DeleteIcon from "@mui/icons-material/Delete";
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
  const [tabValue, setTabValue] = useState("1");
  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
  };
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
  return (
    <>
      {isVaild ? (
        init && postContent ? (
          <Container component="main" maxWidth="md" sx={{ my: 16 }}>
            {postContent.level && (
              <CustomBox sx={{ mb: 0.5 }}>
                <Box sx={{ display: "flex", ml: 1 }}>
                  <img
                    src={`https://static.solved.ac/tier_small/${postContent.level}.svg`}
                    alt={levels[postContent.level]}
                    width="24px"
                  />
                  <Label variant="h6" sx={{ ml: 0.5 }}>
                    {levels[postContent.level]}
                  </Label>
                </Box>
              </CustomBox>
            )}
            <CustomBox sx={{ mb: 1.5 }}>
              <Label variant="h4">{postContent.title}</Label>
              <Label variant="h5">{postContent.language}</Label>
            </CustomBox>
            <Box display="flex" px={1} mb={1}>
              <ViewWriter userObj={userObj ?? null} userId={userObj?.id} />
              {postContent.uploadTime && (
                <Typography sx={{ fontWeight: "300" }}>
                  &nbsp;&nbsp;·&nbsp;&nbsp;
                  {getDisplayTimeByTimestamp(postContent.uploadTime)}
                </Typography>
              )}
            </Box>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Link
                sx={{ p: 1 }}
                color="primary"
                href={postContent.problemUrl}
                target="_blank"
                rel="noopener"
              >
                문제 링크
              </Link>
            </Box>
            <Box minHeight={350}>
              <TabContext value={tabValue}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <TabList onChange={handleTabChange}>
                    <Tab label="설명" value="1" />
                    <Tab label="코드" value="2" />
                  </TabList>
                </Box>
                <TabPanel value="1">
                  <ViewDescription description={postContent.description} />
                </TabPanel>
                <TabPanel value="2">
                  <ViewCode
                    code={postContent.code}
                    language={postContent.language}
                  />
                </TabPanel>
              </TabContext>
            </Box>
            <Box padding={1}>
              <ViewTags tags={postContent.tags} />
            </Box>
            {user?.uid === userObj?.authUid && (
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Tooltip title="글 삭제" arrow>
                  <IconButton
                    onClick={() => {
                      if (window.confirm("글을 삭제하시겠습니까?")) {
                        removePost(postContent.postId ?? null);
                      }
                    }}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Box>
            )}
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
