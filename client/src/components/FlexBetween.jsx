import React from "react";
import { Box } from "@mui/material";
import { styled } from "@mui/system";


//Using this because i am using Css in jsx , so if i want to use css imbedded in jsx then we use this style;
const FlexBetween = styled(Box)({
    display:"flex",
    justifyContent:"space-between",
    alignItems:"center"
});

export default FlexBetween;
//By doing this we allow ourselves to use this any number of times, We can also use Sass in order to remove the repition but to learn new concepts
//I prefer to do with this;