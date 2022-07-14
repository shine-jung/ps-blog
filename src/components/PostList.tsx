import { Grid } from "@mui/material";
import { IPostContent } from "../modules/types";
import PostCard from "./PostCard";

interface IPostListProps {
  postContents: IPostContent[] | undefined;
}

function PostList({ postContents }: IPostListProps) {
  return (
    <Grid
      container
      spacing={{ xs: 2, md: 3 }}
      columns={{ xs: 1, sm: 2, md: 3 }}
    >
      {postContents?.map((postContent) => (
        <Grid item xs={1} sm={1} md={1} key={postContent.postId}>
          <PostCard postContent={postContent} />
        </Grid>
      ))}
    </Grid>
  );
}

export default PostList;
