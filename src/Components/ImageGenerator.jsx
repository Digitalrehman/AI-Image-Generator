import React, { useRef, useState } from "react";
import "../App.css";
import IMG from "../assets/Background.jpg";
const ImageGenerator = () => {
  let [imageUrl, setImageUrl] = useState("/");
  let userValue = useRef(null);
  let image_Generator = async () => {
    if (userValue.current.value === "") {
      return 0;
    }
    let response = await fetch("https://api.openai.com/v1/images/generations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer ",
        "User-Agent": "Chrome",
      },
      body: JSON.stringify({
        prompt: `${userValue.current.value}`,
        n: 1,
        size: "512x512",
        response_format: "b64_json",
      }),
    });
    let result = await response.json();
    console.log(result);
  };
  return (
    <>
      <div className="container">
        <div className="heading">
          AI Image <span>Generator</span>
        </div>
        <div className="image-box-loading">
          <div className="image-box">
            <img src={imageUrl === "/" ? IMG : imageUrl} alt="...loading" />
          </div>
        </div>
        <div className="search-box">
          <input
            type="text"
            ref={userValue}
            placeholder="Describe what you want to see"
          />
          <div
            className="generate-btn"
            onClick={() => {
              image_Generator();
            }}
          >
            Generate
          </div>
        </div>
      </div>
    </>
  );
};

export default ImageGenerator;
