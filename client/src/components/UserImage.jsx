import React, { useState } from "react";
import { Box, CircularProgress } from "@mui/material";

const UserImage = ({ image, size = "60px" }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const handleImageError = () => {
    setIsLoading(false);
    setIsError(true);
  };

  return (
    <Box width={size} height={size}>
      {isLoading ? (
        <CircularProgress size={size} /> // Show a loading spinner
      ) : isError ? (
        // Handle error condition, e.g., display a default image or error message
        <Box
          width={size}
          height={size}
          display="flex"
          justifyContent="center"
          alignItems="center"
          bgcolor="grey.200"
        >
          Error loading image
        </Box>
      ) : (
        <img
          style={{ objectFit: "cover", borderRadius: "50%" }}
          width={size}
          height={size}
          alt="user"
          src={`https://astralwave.onrender.com/assets/${image}`}
          onError={handleImageError} // Handle error when the image fails to load
        />
      )}
    </Box>
  );
};

export default UserImage;
