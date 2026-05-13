import React from "react";
import styled from "styled-components";
import getImageForSensor from "../services/getImageForSensor.js";

const Card = styled.div`
  position: relative;
  border-radius: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  height: 100%;
  width: 100%;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-image: ${({ $backgroundImage }) => `url(${$backgroundImage})`};
    background-size: cover;
    background-position: center;
    opacity: 1;
    z-index: 0;
  }

  > * {
    position: relative;
    z-index: 1;
  }
`;

const ReadingBox = styled.div`
  position: absolute;
  top: 16px;
  right: 16px;
  border-radius: 16px;
  padding: 12px 16px;
  text-align: center;
`;

const ClassificationBox = styled.div`
  position: absolute;
  bottom: 16px;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 16px;
  padding: 8px 16px;
  text-align: center;
  white-space: nowrap;
`;

const SensorType = styled.div`
  font-size: 12px;
  color: #222;
`;

const SensorValue = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: #000;
  margin-top: 4px;
`;

const Classification = styled.div`
  font-size: 12px;
  color: #222;
`;

function SensorCard({ sensor }) {
  const { imageSrc, classification, unit, backgroundColor } = getImageForSensor(
    sensor.type,
    sensor.value,
  );

  return (
    <Card $backgroundImage={imageSrc}>
      <ReadingBox style={{ backgroundColor }}>
        <SensorType>{sensor.type}</SensorType>
        <SensorValue>{`${sensor.value.toFixed(0)} ${unit}`}</SensorValue>
      </ReadingBox>
      <ClassificationBox style={{ backgroundColor }}>
        <Classification>{classification}</Classification>
      </ClassificationBox>
    </Card>
  );
}

export default SensorCard;
