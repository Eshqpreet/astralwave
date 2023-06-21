import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
  SendOutlined,
} from "@mui/icons-material";
import { Box, Divider, IconButton, Typography, TextField, useTheme } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "state";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";

const PostWidget = ({
  postId,
  postUserId,
  name,
  description,
  location,
  picturePath,
  userPicturePath,
  likes,
  comments: initialComments,
}) => {
  const [isComments, setIsComments] = useState(false);
  const [newComment, setNewComment] = useState("");
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user._id);
  const isLiked = Boolean(likes[loggedInUserId]);
  const likeCount = Object.keys(likes).length;
  const [comments, setComments] = useState(initialComments);

  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;

  const patchLike = async () => {
    try {
      const response = await fetch(`https://astralwave.onrender.com/posts/${postId}/like`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: loggedInUserId }),
      });

      if (!response.ok) {
        throw new Error("Failed to update post like");
      }

      const updatedPost = await response.json();
      dispatch(setPost({ post: updatedPost }));
    } catch (error) {
      console.error("Error updating post like:", error);
      // Handle the error if necessary
    }
  };

  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  const handleCommentSubmit = async () => {
    try {
      const response = await fetch(`https://astralwave.onrender.com/posts/${postId}/comments`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: newComment }),
      });

      if (!response.ok) {
        throw new Error("Failed to create comment");
      }

      const createdComment = await response.json();
      const updatedComments = [...comments, createdComment];
      setComments(updatedComments);
      setNewComment("");
    } catch (error) {
      console.error("Error creating comment:", error);
      // Handle the error if necessary
    }
  };

  return (
    <WidgetWrapper m="2rem 0">
      <Friend
        friendId={postUserId}
        name={name}
        subtitle={location}
        userPicturePath={userPicturePath}
      />
      <Typography color={main} sx={{ mt: "1rem" }}>
        {description}
      </Typography>
      {picturePath && (
        <img
          width="100%"
          height="auto"
          alt="post"
          style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
          src={`https://astralwave.onrender.com/assets/${picturePath}`}
        />
      )}
      <Box display="flex" alignItems="center" mt="0.25rem">
        <IconButton onClick={patchLike}>
          {isLiked ? <FavoriteOutlined sx={{ color: primary }} /> : <FavoriteBorderOutlined />}
        </IconButton>
        <Typography>{likeCount}</Typography>
        <IconButton onClick={() => setIsComments(!isComments)}>
          <ChatBubbleOutlineOutlined />
        </IconButton>
        <Typography>{comments.length}</Typography>
        <IconButton>
          <ShareOutlined />
        </IconButton>
      </Box>
      {isComments && (
        <Box mt="0.5rem">
          {comments.map((comment) => (
            <Box key={comment._id}>
              <Divider />
              <Typography sx={{ color: main, m: "0.5rem 0", pl: "1rem" }}>
                {comment.content}
              </Typography>
            </Box>
          ))}
          <Divider />
          <TextField
            label="Write a comment"
            value={newComment}
            onChange={handleCommentChange}
            fullWidth
          />
          <IconButton onClick={handleCommentSubmit}>
            <SendOutlined />
          </IconButton>
        </Box>
      )}
    </WidgetWrapper>
  );
};

export default PostWidget;
