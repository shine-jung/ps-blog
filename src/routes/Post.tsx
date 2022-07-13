import { useRef } from "react";
import { fetchProblemInfo } from "../service/api";
import {
  alpha,
  Box,
  Button,
  Container,
  InputBase,
  NativeSelect,
  styled,
  Typography,
} from "@mui/material";
import { useCallback, useState } from "react";
import { INewPostContent, ITag } from "../modules/types";
import { levels, languages } from "../commons/constants";
import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import "@toast-ui/editor/dist/i18n/ko-kr";
import "../styles/editor.css";
import Tags from "@yaireo/tagify/dist/react.tagify";
import "../styles/tagify.css";

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  fontSize: "13px",
  backgroundColor: alpha(theme.palette.grey[500], 0.15),
  padding: "4px 8px",
  borderRadius: "4px",
}));
const CodeInput = styled(InputBase)(({ theme }) => ({
  color: "#222222",
  backgroundColor: "#f9fafb",
  fontSize: "13px",
  fontFamily: "Open Sans, sans-serif",
  fontWeight: "400",
  padding: "18px 25px",
  marginBottom: theme.spacing(2.5),
  border: "1px solid #dadde6",
  borderRadius: "4px",
}));
const Label = styled(Typography)(({ theme }) => ({
  padding: theme.spacing(1),
}));
const CustomBox = styled(Box)(() => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-end",
}));
const FormBox = styled("form")(() => ({
  display: "flex",
  alignItems: "flex-end",
}));

function Post() {
  const editorRef = useRef<any>();
  const [newPostContent, setNewPostContent] = useState<INewPostContent>();
  const [problemId, setProblemId] = useState<number>();
  const onChangeFormValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewPostContent({
      ...newPostContent,
      [name]: value,
    });
  };
  const onChangeDescription = () => {
    const data = editorRef.current.getInstance().getHTML();
    setNewPostContent({
      ...newPostContent,
      description: data,
    });
  };
  const onChangeProblemId = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setProblemId(parseInt(value));
  };
  const onSubmitProblemId = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (problemId) {
      try {
        const problemInfo = await fetchProblemInfo(problemId);
        setNewPostContent({
          ...newPostContent,
          title: `${problemInfo.problemId}. ${problemInfo.titleKo}`,
          level: problemInfo.level,
          tags: getTagsArray(problemInfo.tags),
          problemUrl: `https://www.acmicpc.net/problem/${problemInfo.problemId}`,
        });
      } catch (error) {
        alert("없는 문제 번호입니다");
      }
    }
  };
  const getTagsArray = (tags: ITag[] | undefined) => {
    return tags?.map((tag) =>
      tag.displayNames
        .filter((displayName) => displayName.language === "ko")
        .map((displayName) => displayName.name)
        .join(",")
    );
  };
  const onTagChange = useCallback((event: CustomEvent) => {
    const { value } = event.detail;
    const tagArray = value
      ? JSON.parse(value).map((tag: { value: string }) => tag.value)
      : [];
    setNewPostContent({
      ...newPostContent,
      tags: tagArray,
    });
  }, []);
  return (
    <>
      <Container component="main" maxWidth="lg" sx={{ mt: 8, mb: 16 }}>
        <CustomBox sx={{ mb: 0.5 }}>
          <Box sx={{ display: "flex", ml: 1 }}>
            <img
              src={`https://static.solved.ac/tier_small/${
                newPostContent?.level ?? 0
              }.svg`}
              alt={levels[newPostContent?.level ?? 0]}
              width="24px"
            />
            <Label variant="h6" sx={{ ml: 0.5 }}>
              {levels[newPostContent?.level ?? 0]}
            </Label>
          </Box>
          <Typography sx={{ textAlign: "end" }}>
            문제 번호를 입력하세요 (백준만 가능)
          </Typography>
        </CustomBox>
        <CustomBox sx={{ mb: 2.5 }}>
          <Box sx={{ display: "flex" }}>
            <Label>글 제목:</Label>
            <StyledInputBase
              type="text"
              value={newPostContent?.title ?? ""}
              onChange={onChangeFormValue}
              name="title"
              sx={{ width: "250px", mr: 1.5 }}
            />
            <Label>언어:</Label>
            <NativeSelect variant="outlined" color="success" name="language">
              {languages.map((language) => (
                <option key={language} value={language}>
                  {language}
                </option>
              ))}
            </NativeSelect>
          </Box>
          <FormBox onSubmit={onSubmitProblemId} id="newPost">
            <StyledInputBase
              type="text"
              onChange={onChangeProblemId}
              sx={{ width: "100px", mr: 1.5 }}
            />
            <Button type="submit" variant="contained" color="success">
              문제 가져오기
            </Button>
          </FormBox>
        </CustomBox>
        <Box sx={{ mb: 2.5 }}>
          <Editor
            ref={editorRef}
            initialValue="코드 설명을 입력하세요"
            previewStyle="vertical"
            height="400px"
            initialEditType="markdown"
            useCommandShortcut={false}
            toolbarItems={[
              ["heading", "bold", "italic", "strike"],
              ["hr", "quote"],
              ["ul", "ol", "task", "indent", "outdent"],
              ["table", "link"],
              ["code", "codeblock"],
            ]}
            language="ko-KR"
            onChange={onChangeDescription}
          />
        </Box>
        <CodeInput
          type="text"
          value={newPostContent?.code ?? ""}
          onChange={onChangeFormValue}
          name="code"
          multiline
          rows={10}
          placeholder="코드를 붙여넣으세요"
          fullWidth
        />
        <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
          <Label>Tags:</Label>
          <Box sx={{ width: "100%" }}>
            <Tags value={newPostContent?.tags} onChange={onTagChange} />
          </Box>
        </Box>
        <CustomBox sx={{ alignItems: "center" }}>
          <CustomBox>
            <Label>문제 링크:</Label>
            <StyledInputBase
              type="url"
              value={newPostContent?.problemUrl ?? ""}
              onChange={onChangeFormValue}
              name="problemUrl"
              sx={{ width: "300px" }}
            />
          </CustomBox>
          <Button
            type="submit"
            variant="contained"
            color="success"
            size="large"
          >
            글 업로드
          </Button>
        </CustomBox>
      </Container>
    </>
  );
}

export default Post;
