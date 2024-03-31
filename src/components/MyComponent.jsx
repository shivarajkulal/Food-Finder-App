import React from "react";
import Lottie from "react-lottie";
import animationData from "../images/animation.json"; // Import your JSON file

const CartAnimation = () => {
  // Lottie options
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData, // Pass your JSON data here
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div>
      <div style={{ width: "200px", height: "200px" }}>
        {" "}
        <Lottie options={defaultOptions} />
      </div>
    </div>
  );
};

export default CartAnimation;
