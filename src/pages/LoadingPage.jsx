import React from "react";
import styled, { keyframes } from "styled-components";

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const LoadingContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

// Container que usa flexbox para centralizar os dois elementos
const CenteredContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 150px;
  height: 150px;
`;

const LoadingImage = styled.img`
  width: 150px;
  height: 150px;
  z-index: 2;
`;

const LoadingCircle = styled.div`
  position: absolute;
  width: 180px;
  height: 180px;
  border: 8px solid rgba(52, 152, 219, 0.2);
  border-top-color: #3498db;
  border-radius: 50%;
  animation: ${spin} 1.5s linear infinite;
`;

const LoadingText = styled.p`
  font-size: 18px;
  color: #fff;
  font-family: Arial, sans-serif;
  animation: ${fadeIn} 1s ease-in-out;
`;

const LocationText = styled.p`
  font-size: 16px;
  color: #fff;
  font-family: Arial, sans-serif;
  font-style: italic;
  animation: ${fadeIn} 0.5s ease-in-out;
`;

const LoadingPage = ({ location }) => {
  return (
    <LoadingContainer>
      <CenteredContainer>
        <LoadingCircle />
        <LoadingImage src="./assets/loading.png" alt="Loading" />
      </CenteredContainer>
      <LoadingText>Carregando novos dados...</LoadingText>
      {location && <LocationText>{location}</LocationText>}
    </LoadingContainer>
  );
};

export default LoadingPage;
