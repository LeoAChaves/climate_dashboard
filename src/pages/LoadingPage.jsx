import React from "react";
import styled, { keyframes } from "styled-components";

// Keyframes for the spinning animation
const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

// Styled container
const LoadingContainer = styled.div`
  position: relative;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

// Styled image
const LoadingImage = styled.img`
  width: 150px; // Adjust size as needed
  height: 150px; // Adjust size as needed
  z-index: 1;
`;

// Styled animation circle
const LoadingCircle = styled.div`
  position: absolute;
  width: 180px; // Slightly larger than the image
  height: 180px; // Slightly larger than the image
  border: 10px solid transparent;
  border-top-color: #3498db; // Blue, but choose any color you like
  border-radius: 50%;
  animation: ${spin} 2s linear infinite;
`;

const LoadingPage = () => {
  return (
    <LoadingContainer>
      <LoadingCircle />
      <LoadingImage src="./assets/loading.png" alt="Loading" />
    </LoadingContainer>
  );
};

export default LoadingPage;
