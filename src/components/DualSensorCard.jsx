import React from "react";
import styled from "styled-components";
import getImageForSensor from "../services/getImageForSensor.js";

const DualCard = styled.div`
  position: relative;
  border-radius: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  color: #333;
  overflow: hidden;
  width: 600px;
  height: 300px;
  font-family: "Arial", sans-serif;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

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
    opacity: 0.8;
    border-radius: 20px;
    z-index: 0;
  }

  > * {
    position: relative;
    z-index: 1;
  }
`;

const SensorContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
`;

const SensorInfo = styled.div`
  background-color: rgba(255, 255, 255);
  border-radius: 16px;
  padding: 10px;
  text-align: center;
  flex-grow: 1;
  margin: 0 5px;
`;

const SensorType = styled.div`
  font-size: 12px;
  color: #666;
`;

const SensorValue = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: #333;
  margin-top: 4px;
`;

const Classification = styled.div`
  font-size: 12px;
  color: #666;
  margin-top: 4px;
`;

function DualSensorCard({ sensor1, sensor2 }) {
  const sensor1Data = getImageForSensor(sensor1.type, sensor1.value);
  const sensor2Data = getImageForSensor(sensor2.type, sensor2.value);

  const backgroundImage = sensor1Data.imageSrc;

  return (
    <DualCard $backgroundImage={backgroundImage}>
      <SensorContainer>
        <SensorInfo>
          <SensorType>{sensor1.type}</SensorType>
          <SensorValue>{`${sensor1.value.toFixed(0)} ${
            sensor1Data.unit
          }`}</SensorValue>
          <Classification>{sensor1Data.classification}</Classification>
        </SensorInfo>
        <SensorInfo>
          <SensorType>{sensor2.type}</SensorType>
          <SensorValue>{`${sensor2.value.toFixed(0)} ${
            sensor2Data.unit
          }`}</SensorValue>
          <Classification>{sensor2Data.classification}</Classification>
        </SensorInfo>
      </SensorContainer>
    </DualCard>
  );
}

export default DualSensorCard;
