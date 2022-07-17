import { Grid, Box, NativeSelect } from "@mui/material";
import { useState } from "react";
import { IPostContent } from "../modules/types";
import Pagination from "./Pagination";
import PostCard from "./PostCard";

interface IPostListProps {
  postContents?: IPostContent[];
  maxColum: number;
}

function PostList({ postContents, maxColum }: IPostListProps) {
  const [limit, setLimit] = useState(6);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;
  return (
    <>
      {postContents && (
        <>
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 1, sm: 2, md: maxColum }}
          >
            {postContents.slice(offset, offset + limit).map((postContent) => (
              <Grid item xs={1} sm={1} md={1} key={postContent.postId}>
                <PostCard postContent={postContent} />
              </Grid>
            ))}
          </Grid>
          <Box mt={4} mb={3} mx={2}>
            페이지 당 표시할 게시물 수&nbsp;&nbsp;&nbsp;&nbsp;
            <NativeSelect
              value={limit}
              variant="outlined"
              onChange={({ target: { value } }) => setLimit(Number(value))}
              color="primary"
            >
              <option value="6">6</option>
              <option value="12">12</option>
              <option value="24">24</option>
              <option value="48">48</option>
              <option value="96">96</option>
            </NativeSelect>
          </Box>
          <Pagination
            total={postContents.length}
            limit={limit}
            page={page}
            setPage={setPage}
          />
        </>
      )}
    </>
  );
}

export default PostList;
