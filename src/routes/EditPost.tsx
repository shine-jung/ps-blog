import { useCallback, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchProblemInfo } from "../services/api";
import { doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { db } from "../services/firebase";
import {
  Box,
  Button,
  Container,
  NativeSelect,
  Typography,
} from "@mui/material";
import {
  TextInput,
  CodeInput,
  Label,
  CustomBox,
  FormBox,
} from "../components/components";
import { IPostContent, ITag } from "../types/types";
import { levels, languages } from "../utils/constants";
import { Editor } from "@toast-ui/react-editor";
import "../styles/editor.css";
import "@toast-ui/editor/dist/i18n/ko-kr";
import Tags from "@yaireo/tagify/dist/react.tagify";
import "../styles/tagify.css";

interface RouteState {
  state: {
    postContent: IPostContent;
  };
}

interface IPostProps {
  refreshUser: () => void;
}

function EditPost({ refreshUser }: IPostProps) {
  const navigate = useNavigate();
  const { state } = useLocation() as RouteState;
  const editorRef = useRef<any>();
  const [postContent, setPostContent] = useState<IPostContent>(
    state.postContent
  );
  const [tags, setTags] = useState<string[]>();
  const [problemId, setProblemId] = useState<number>();
  const onChangeFormValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setPostContent({
      ...postContent,
      [name]: value,
    });
  };
  const onChangeLanguage = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    setPostContent({
      ...postContent,
      language: value,
    });
  };
  const onChangeDescription = () => {
    const data = editorRef.current.getInstance().getHTML();
    setPostContent({
      ...postContent,
      description: data,
    });
  };
  const onChangeCode = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const data = value.replaceAll(" ", "&nbsp;");
    setPostContent({
      ...postContent,
      code: data,
    });
  };
  const onChangeTags = useCallback((event: CustomEvent) => {
    const { value } = event.detail;
    const tagArray = value
      ? JSON.parse(value).map((tag: { value: string }) => tag.value)
      : [];
    setTags(tagArray);
  }, []);
  const onChangeProblemId = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setProblemId(parseInt(value));
  };
  const onSubmitProblemId = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (problemId) {
      try {
        const problemInfo = await fetchProblemInfo(problemId);
        setPostContent({
          ...postContent,
          title: `${problemInfo.problemId}. ${problemInfo.titleKo}`,
          level: problemInfo.level,
          problemUrl: `https://www.acmicpc.net/problem/${problemInfo.problemId}`,
        });
        setTags(getTagsArray(problemInfo.tags));
      } catch (error) {
        alert("없는 문제 번호입니다");
      }
    }
  };
  useEffect(() => {
    const titleElement = document.getElementsByTagName("title")[0];
    titleElement.innerHTML = `글 수정 - pslog`;
  }, []);
  useEffect(() => {
    setTags(state.postContent.tags);
    editorRef.current.getInstance().setHTML(state.postContent.description);
  }, [state.postContent]);
  const onPostBtnClick = async () => {
    if (!postContent.title || !postContent.description) {
      alert("내용을 입력해주세요");
      return;
    }
    if (!state.postContent.postId) return;
    const postsRef = doc(db, "posts", state.postContent.postId);
    await updateDoc(postsRef, {
      ...postContent,
      tags: tags ?? [],
      uploadTime: serverTimestamp(),
      lastUpdatedTime: serverTimestamp(),
    });
    refreshUser();
    navigate(-1);
    alert("글이 수정되었습니다");
  };
  const getTagsArray = (tags: ITag[] | undefined) => {
    return tags?.map((tag) =>
      tag.displayNames
        .filter((displayName) => displayName.language === "ko")
        .map((displayName) => displayName.name)
        .join(",")
    );
  };
  return (
    <Container component="main" maxWidth="md">
      <CustomBox sx={{ mb: 1 }}>
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
        <Typography sx={{ textAlign: "end" }}>
          문제 번호를 입력하세요 (백준만 가능)
        </Typography>
      </CustomBox>
      <CustomBox sx={{ mb: 3 }}>
        <Box sx={{ display: "flex" }}>
          <Label sx={{ mr: 1 }}>글 제목</Label>
          <TextInput
            type="text"
            value={postContent.title}
            onChange={onChangeFormValue}
            name="title"
            sx={{ width: 250, mr: 2.5 }}
          />
          <NativeSelect
            value={postContent.language}
            variant="outlined"
            onChange={onChangeLanguage}
            color="primary"
            name="language"
          >
            {languages.map((language) => (
              <option key={language} value={language}>
                {language}
              </option>
            ))}
          </NativeSelect>
        </Box>
        <FormBox onSubmit={onSubmitProblemId}>
          <TextInput
            type="text"
            onChange={onChangeProblemId}
            sx={{ width: 100, mr: 2 }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ height: 40 }}
          >
            문제 가져오기
          </Button>
        </FormBox>
      </CustomBox>
      <Box sx={{ mb: 3 }}>
        <Editor
          ref={editorRef}
          initialValue="여기에 코드 설명을 입력하세요"
          placeholder="여기에 코드 설명을 입력하세요"
          previewStyle="vertical"
          height="400px"
          initialEditType="wysiwyg"
          useCommandShortcut={true}
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
        value={postContent?.code?.replaceAll("&nbsp;", " ")}
        onChange={onChangeCode}
        name="code"
        multiline
        rows={10}
        placeholder="여기에 코드를 붙여넣으세요"
        fullWidth
      />
      <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
        <Label sx={{ mr: 1 }}>Tags</Label>
        <Box sx={{ width: "100%" }}>
          <Tags value={tags} onChange={onChangeTags} />
        </Box>
      </Box>
      <CustomBox sx={{ alignItems: "center" }}>
        <CustomBox>
          <Label sx={{ mr: 1 }}>문제 링크</Label>
          <TextInput
            type="url"
            value={postContent.problemUrl}
            onChange={onChangeFormValue}
            name="problemUrl"
            sx={{ width: 350 }}
          />
        </CustomBox>
        <Box display="flex">
          <Button
            variant="text"
            color="primary"
            sx={{ mr: 1 }}
            onClick={() => navigate(-1)}
          >
            취소
          </Button>
          <Button onClick={onPostBtnClick} variant="contained" color="primary">
            글 수정
          </Button>
        </Box>
      </CustomBox>
    </Container>
  );
}

export default EditPost;
