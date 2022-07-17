import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getUser } from "../service/user";
import { Box, Typography } from "@mui/material";
import { PostCardPaper, CustomBox } from "./styledComponents";
import { levels } from "../commons/constants";
import { IPostContent, IUser } from "../modules/types";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ViewTags from "./ViewTags";
import ViewWriter from "./ViewWriter";
import { getDisplayTimeByTimestamp } from "../modules/functions";

interface IPostCardProps {
  postContent: IPostContent;
}

function PostCard({ postContent }: IPostCardProps) {
  const postLink = `/@${postContent.userId}/${postContent.articleNumber}`;
  const [userObj, setUserObj] = useState<IUser | null>();
  useEffect(() => {
    if (!postContent.userId) return;
    getUser(postContent.userId).then((userData) => {
      if (!userData) return;
      setUserObj(userData);
    });
  }, [postContent]);
  return (
    <PostCardPaper>
      <Link to={postLink}>
        <Box
          sx={{
            minHeight: "150px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            mb: 0.5,
          }}
        >
          <Box>
            <CustomBox sx={{ alignItems: "flex-start", height: "100%" }}>
              {postContent.level && (
                <Box sx={{ display: "flex" }}>
                  <img
                    src={`https://static.solved.ac/tier_small/${postContent.level}.svg`}
                    alt={levels[postContent.level]}
                    width="20px"
                  />
                  <Typography sx={{ ml: 1 }}>
                    {levels[postContent.level]}
                  </Typography>
                </Box>
              )}
              <Typography>{postContent.language}</Typography>
            </CustomBox>
            <Typography variant="h6">{postContent.title}</Typography>
            <ViewTags tags={postContent.tags} />
          </Box>
          <Box display="flex">
            {postContent.uploadTime && (
              <Typography variant="subtitle2">
                {getDisplayTimeByTimestamp(postContent.uploadTime)}
                &nbsp;·&nbsp;
              </Typography>
            )}
            <Typography variant="subtitle2">
              {postContent.commentCount}개의 댓글
            </Typography>
          </Box>
        </Box>
      </Link>
      <CustomBox>
        <ViewWriter userObj={userObj ?? null} userId={postContent.userId} />
        <Box
          sx={{
            width: "35px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box sx={{ color: "#ff6666" }}>
            <FontAwesomeIcon icon={faHeart} />
          </Box>
          {postContent.likeCount}
        </Box>
      </CustomBox>
    </PostCardPaper>
  );
}

export default PostCard;
