import { Link } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import { PaperOne, CustomBox } from "./styledComponents";
import { levels } from "../commons/constants";
import { IPostContent } from "../modules/types";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface IPostCardProps {
  postContent: IPostContent;
}

function PostCard({ postContent }: IPostCardProps) {
  return (
    <Link to="view" state={{ postContent: postContent }}>
      <PaperOne
        sx={{
          minHeight: "200px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Box>
          <CustomBox sx={{ alignItems: "flex-start" }}>
            <Box sx={{ display: "flex" }}>
              <img
                src={`https://static.solved.ac/tier_small/${
                  postContent.level ?? 0
                }.svg`}
                alt={levels[postContent.level ?? 0]}
                width="20px"
              />
              <Typography sx={{ ml: 1 }}>
                {levels[postContent.level ?? 0]}
              </Typography>
            </Box>
            <Typography>{postContent.language}</Typography>
          </CustomBox>
          <Typography variant="h6">{postContent.title}</Typography>
          <Typography>{postContent.tags?.join(", ")}</Typography>
        </Box>
        <Box>
          <Typography variant="subtitle2">
            2022년 7월 6일 · {postContent.comments}개의 댓글
          </Typography>
          <CustomBox>
            <Typography>by 작성자</Typography>
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
              {postContent.likes}
            </Box>
          </CustomBox>
        </Box>
      </PaperOne>
    </Link>
  );
}

export default PostCard;
