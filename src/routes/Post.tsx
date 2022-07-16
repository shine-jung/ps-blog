import { useCallback, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchProblemInfo } from "../service/api";
import {
  doc,
  setDoc,
  updateDoc,
  increment,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../service/firebase";
import {
  Box,
  Button,
  Container,
  NativeSelect,
  Typography,
} from "@mui/material";
import {
  StyledInputBase,
  CodeInput,
  Label,
  CustomBox,
  FormBox,
} from "../components/styledComponents";
import { IUser, INewPostContent, ITag } from "../modules/types";
import { levels, languages } from "../commons/constants";
import { Editor } from "@toast-ui/react-editor";
import "../styles/editor.css";
import "@toast-ui/editor/dist/i18n/ko-kr";
import Tags from "@yaireo/tagify/dist/react.tagify";
import "../styles/tagify.css";

interface IPostProps {
  refreshUser: () => void;
  userObj: IUser | null;
}

function Post({ refreshUser, userObj }: IPostProps) {
  const navigate = useNavigate();
  const editorRef = useRef<any>();
  const [newPostContent, setNewPostContent] = useState<INewPostContent>();
  const [tags, setTags] = useState<string[]>();
  const [problemId, setProblemId] = useState<number>();
  const onChangeFormValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewPostContent({
      ...newPostContent,
      [name]: value,
    });
  };
  const onChangeLanguage = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    setNewPostContent({
      ...newPostContent,
      language: value,
    });
  };
  const onChangeDescription = () => {
    const data = editorRef.current.getInstance().getHTML();
    setNewPostContent({
      ...newPostContent,
      description: data,
    });
  };
  const onChangeCode = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const data = value.replaceAll(" ", "&nbsp;");
    setNewPostContent({
      ...newPostContent,
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
        setNewPostContent({
          ...newPostContent,
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
  const onPostBtnClick = async () => {
    if (
      !newPostContent?.title ||
      !newPostContent?.description ||
      !newPostContent?.code
    ) {
      alert("내용을 입력해주세요");
      return;
    }
    if (!userObj?.id) return;
    const postId = `@${userObj.id}_${userObj.articleNumber}`;
    await setDoc(doc(db, "posts", postId), {
      ...newPostContent,
      tags: tags ?? [],
      postId: postId,
      userId: userObj.id,
      authUid: userObj.authUid,
      articleNumber: userObj.articleNumber,
      uploadTime: serverTimestamp(),
      lastUpdatedTime: serverTimestamp(),
      likedUsers: [],
      likeCount: 0,
      comments: [],
      commentCount: 0,
    });
    const userRef = doc(db, "users", userObj.id);
    await updateDoc(userRef, {
      articleNumber: increment(1),
    });
    refreshUser();
    navigate({ pathname: `/@${userObj.id}` });
    alert("새로운 글이 업로드 되었습니다");
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
    <Container component="main" maxWidth="md" sx={{ my: 16 }}>
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
      <CustomBox sx={{ mb: 3 }}>
        <Box sx={{ display: "flex" }}>
          <Label sx={{ mr: 1 }}>글 제목</Label>
          <StyledInputBase
            type="text"
            value={newPostContent?.title ?? ""}
            onChange={onChangeFormValue}
            name="title"
            sx={{ width: 250, mr: 2.5 }}
          />
          <NativeSelect
            value={newPostContent?.language}
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
          <StyledInputBase
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
          previewStyle="vertical"
          height="400px"
          initialEditType="wysiwyg"
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
        value={newPostContent?.code?.replaceAll("&nbsp;", " ") ?? ""}
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
          <StyledInputBase
            type="url"
            value={newPostContent?.problemUrl ?? ""}
            onChange={onChangeFormValue}
            name="problemUrl"
            sx={{ width: 350 }}
          />
        </CustomBox>
        <Button
          onClick={onPostBtnClick}
          variant="contained"
          color="primary"
          size="large"
          sx={{ height: 40 }}
        >
          글 업로드
        </Button>
      </CustomBox>
    </Container>
  );
}

export default Post;
