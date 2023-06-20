import { Box, CircularProgress } from "@mui/material";
import React from "react";

const UserImage = ({ image, size = "60px" }) => {
  const timestamp = new Date().getTime(); // Generate a timestamp
  const [isLoading, setIsLoading] = React.useState(true);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  return (
    <Box width={size} height={size}>
      {isLoading ? (
        <CircularProgress size={size} /> // Show a loading spinner
      ) : (
        <img
          style={{ objectFit: "cover", borderRadius: "50%" }}
          width={size}
          height={size}
          alt="user"
          src={`https://astralwave.onrender.com/assets/${image}?${timestamp}`}
          onLoad={handleImageLoad} // Update the loading state when the image is loaded
        />
      )}
    </Box>
  );
};

export default UserImage;
