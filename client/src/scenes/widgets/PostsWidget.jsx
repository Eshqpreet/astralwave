import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";
import PostWidget from "./PostWidget";

const PAGE_SIZE = 10; // Number of posts to fetch per page

const PostsWidget = ({ userId, isProfile = false }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const token = useSelector((state) => state.token);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchPosts = async (page) => {
    const url = isProfile
      ? `https://astralwave.onrender.com/posts/${userId}/posts?page=${page}&limit=${PAGE_SIZE}`
      : `https://astralwave.onrender.com/posts?page=${page}&limit=${PAGE_SIZE}`;

    const response = await fetch(url, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();

    // If it's the first page, replace the existing posts with new data
    // Otherwise, append the new posts to the existing ones
    const updatedPosts = page === 1 ? data : [...posts, ...data];

    dispatch(setPosts({ posts: updatedPosts }));
  };

  useEffect(() => {
    fetchPosts(currentPage);
  }, [currentPage]); // Fetch posts whenever the current page changes

  const handleLoadMore = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  return (
    <>
      {posts.map(
        ({
          _id,
          userId,
          firstName,
          lastName,
          description,
          location,
          picturePath,
          userPicturePath,
          likes,
          comments,
        }) => (
          <PostWidget
            key={_id}
            postId={_id}
            postUserId={userId}
            name={`${firstName} ${lastName}`}
            description={description}
            location={location}
            picturePath={picturePath}
            userPicturePath={userPicturePath}
            likes={likes}
            comments={comments}
          />
        )
      )}

      <button onClick={handleLoadMore}>Load More</button>
    </>
  );
};

export default PostsWidget;
