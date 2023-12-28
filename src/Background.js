import React from "react";
import "./index.css";

const Background = (props) => {
  //Checking, if the image is available, if YES then it's tru otherwise give an []
  const bgImage = props.images?.results || [];
  //Just getting the first image from the result to use an bg image
  const bgImageUrl = bgImage[0]?.urls.regular || ""; 

  // console.log(bgImageUrl, "");
  return (
    //Just applying the image to the background
    <div
      className="backgroundImageCss"
      style={{ backgroundImage: `url(${bgImageUrl})` }}
    ></div>
  );
};

export default Background;
