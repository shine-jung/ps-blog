import { fetchProblemInfo } from "../service/api";
import { Box, Link, Typography } from "@mui/material";
import { useCallback, useState } from "react";
import { INewPostContent, ITag } from "../modules/types";
import { levels, languages } from "../commons/constants";
import Tags from "@yaireo/tagify/dist/react.tagify";
import "@yaireo/tagify/dist/tagify.css";

function Post() {
  const [newPostContent, setNewPostContent] = useState<INewPostContent>();
  const [problemId, setProblemId] = useState<number>();
  const onChangeFormValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewPostContent({
      ...newPostContent,
      [name]: value,
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
    const {
      detail: { value },
    } = event;
    const tagArray = JSON.parse(value).map(
      (tag: { value: string }) => tag.value
    );
    setNewPostContent({
      ...newPostContent,
      tags: tagArray,
    });
  }, []);
  console.log(newPostContent);
  return (
    <>
      <Typography>Post</Typography>
      <Typography>문제 번호를 입력하세요 (백준만 가능)</Typography>
      <form onSubmit={onSubmitProblemId} id="newPost">
        <input type="text" onChange={onChangeProblemId} />
        <input type="submit" value="정보 불러오기" />
      </form>
      <Box>
        <Box sx={{ display: "flex" }}>
          <img
            src={`https://static.solved.ac/tier_small/${
              newPostContent?.level ?? 0
            }.svg`}
            alt={levels[newPostContent?.level ?? 0]}
            width="30px"
          />
          <Typography>{levels[newPostContent?.level ?? 0]}</Typography>
        </Box>
        <input
          type="text"
          value={newPostContent?.title ?? ""}
          onChange={onChangeFormValue}
          name="title"
        />
        <input
          type="number"
          value={newPostContent?.level ?? 0}
          onChange={onChangeFormValue}
          name="level"
          readOnly
        />
        <input
          type="url"
          pattern="https://.*"
          value={newPostContent?.problemUrl ?? ""}
          onChange={onChangeFormValue}
          name="problemUrl"
        />
        <Link color="inherit" href={newPostContent?.problemUrl} target="_blank">
          문제 링크
        </Link>
        <select name="language">
          {languages.map((language) => (
            <option key={language} value={language}>
              {language}
            </option>
          ))}
        </select>
        <Tags value={newPostContent?.tags} onChange={onTagChange} />
      </Box>
    </>
  );
}

export default Post;
