import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { IPostContent, IUserObj } from "../modules/types";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../service/firebase";
import { Box, Container, IconButton, Link, Tooltip, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Label, CustomBox, Loader } from "../components/styledComponents";
import { levels } from "../commons/constants";
import DeleteIcon from "@mui/icons-material/Delete";
import ViewDescription from "../components/ViewDescription";
import ViewCode from "../components/ViewCode";

interface RouteState {
  state: {
    postContent: IPostContent;
  };
}

interface IViewProps {
  userObj: IUserObj | null;
}

function View({ userObj }: IViewProps) {
  const navigate = useNavigate();
  const { state } = useLocation() as RouteState;
  const [postContent, setPostContent] = useState<IPostContent>();
  const [tabValue, setTabValue] = useState("1");
  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
  };
  const removePost = async (postId: string | null) => {
    if (!postId) return;
    await deleteDoc(doc(db, "posts", postId));
    navigate({ pathname: "/home" });
    alert("글이 삭제되었습니다");
  };
  useEffect(() => {
    setPostContent(state.postContent);
  }, []);
  return (
    <>
      {postContent ? (
        <Container component="main" maxWidth="md" sx={{ mt: 8, mb: 16 }}>
          <CustomBox sx={{ mb: 0.5 }}>
            <Box sx={{ display: "flex", ml: 1 }}>
              <img
                src={`https://static.solved.ac/tier_small/${
                  postContent.level ?? 0
                }.svg`}
                alt={levels[postContent.level ?? 0]}
                width="24px"
              />
              <Label variant="h6" sx={{ ml: 0.5 }}>
                {levels[postContent.level ?? 0]}
              </Label>
            </Box>
          </CustomBox>
          <CustomBox sx={{ mb: 1.5 }}>
            <Label variant="h4">{postContent.title}</Label>
            <Label variant="h5">{postContent.language}</Label>
          </CustomBox>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Link
              sx={{ p: 1 }}
              color="primary"
              href={postContent.problemUrl}
              target="_blank"
            >
              문제 링크
            </Link>
          </Box>
          <Box minHeight="300px">
            <TabContext value={tabValue}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList onChange={handleTabChange} textColor="primary">
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
          <Label>Tags: {postContent.tags?.join(", ")}</Label>
          {userObj?.uid === postContent.userId && (
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
      )}
    </>
  );
}

export default View;
