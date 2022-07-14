import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { IPostContent, IUserObj } from "../modules/types";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../service/firebase";
import { Box, Container, IconButton, Link, Tooltip } from "@mui/material";
import {
  Label,
  CustomBox,
  Loader,
  DescriptionBox,
} from "../components/customComponents";
import { levels } from "../commons/constants";
import { Viewer } from "@toast-ui/react-editor";
import { CodeBlock, paraisoLight } from "react-code-blocks";
import "@toast-ui/editor/dist/toastui-editor-viewer.css";
import "../styles/editor.css";
import DeleteIcon from "@mui/icons-material/Delete";

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
        <Container component="main" maxWidth="lg" sx={{ mt: 8, mb: 16 }}>
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
          <Link
            sx={{ m: 1 }}
            color="inherit"
            href={postContent.problemUrl}
            target="_blank"
          >
            문제 링크
          </Link>
          <Label variant="h6">설명</Label>
          <DescriptionBox>
            <Viewer initialValue={postContent.description} />
          </DescriptionBox>
          <Box sx={{ mb: 2.5 }}>
            <Label variant="h6">코드</Label>
            <CodeBlock
              text={postContent.code?.replaceAll("&nbsp;", " ") ?? ""}
              language={postContent.language ?? "cpp"}
              showLineNumbers={true}
              startingLineNumber={1}
              theme={paraisoLight}
            />
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
