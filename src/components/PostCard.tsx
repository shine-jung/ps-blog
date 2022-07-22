import { useNavigate } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import { PostCardPaper, CustomBox, CardDivider } from "./components";
import { levels } from "../commons/constants";
import { IPostContent } from "../modules/types";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ViewTags from "./ViewTags";
import ViewWriter from "./ViewWriter";
import { getDisplayTimeByTimestamp } from "../modules/functions";

interface IPostCardProps {
  postContent: IPostContent;
}

function PostCard({ postContent }: IPostCardProps) {
  const navigate = useNavigate();
  const postLink = `/@${postContent.userId}/${postContent.articleNumber}`;
  return (
    <PostCardPaper>
      <Box
        onClick={() => navigate({ pathname: postLink })}
        sx={{
          minHeight: "178px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "12px 12px 8px",
          cursor: "pointer",
        }}
      >
        <Box>
          <CustomBox sx={{ alignItems: "flex-start" }}>
            <Box sx={{ display: "flex" }}>
              <img
                src={`https://static.solved.ac/tier_small/${
                  postContent.level ? postContent.level : "sprout"
                }.svg`}
                alt={levels[postContent.level ?? 0]}
                width="20px"
              />
              <Typography sx={{ ml: 1 }}>
                {levels[postContent.level ?? 0]}
              </Typography>
            </Box>
            <Typography fontWeight={300}>{postContent.language}</Typography>
          </CustomBox>
          <Box p={0.5}>
            <Typography variant="h6" fontWeight={400}>
              {postContent.title}
            </Typography>
            <ViewTags tags={postContent.tags} />
          </Box>
        </Box>
        {postContent.uploadTime && (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ display: "flex", justifyContent: "flex-end" }}
          >
            {getDisplayTimeByTimestamp(postContent.uploadTime)}
            {" · "}
            {postContent.commentCount}개의 댓글
          </Typography>
        )}
      </Box>
      <CardDivider />
      <CustomBox px={1.5} py={0.75}>
        <ViewWriter
          userId={postContent.userId}
          userPhotoURL={postContent.userPhotoURL}
        />
        <Box
          sx={{
            width: "40px",
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          <Box sx={{ color: "#ff6666" }}>
            <FontAwesomeIcon icon={faHeart} />
          </Box>
          <Typography variant="body1" color="text.secondary">
            {postContent.likeCount}
          </Typography>
        </Box>
      </CustomBox>
    </PostCardPaper>
  );
}

export default PostCard;
