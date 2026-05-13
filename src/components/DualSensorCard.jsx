import React from "react";
import styled from "styled-components";
import getImageForSensor from "../services/getImageForSensor.js";

const DualCard = styled.div`
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
    opacity: 0.8;
    z-index: 0;
  }

  > * {
    position: relative;
    z-index: 1;
  }
`;

const SensorTopLeft = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  border-radius: 16px;
  padding: 12px 20px;
  text-align: center;
  min-width: 120px;
`;

const SensorBottomRight = styled.div`
  position: absolute;
  bottom: 20px;
  right: 20px;
  border-radius: 16px;
  padding: 12px 20px;
  text-align: center;
  min-width: 120px;
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
  font-size: 11px;
  color: #222;
  margin-top: 6px;
`;

function DualSensorCard({ sensor1, sensor2 }) {
  const sensor1Data = getImageForSensor(sensor1.type, sensor1.value);
  const sensor2Data = getImageForSensor(sensor2.type, sensor2.value);

  return (
    <DualCard $backgroundImage={sensor1Data.imageSrc}>
      <SensorTopLeft style={{ backgroundColor: sensor1Data.backgroundColor }}>
        <SensorType>{sensor1.type}</SensorType>
        <SensorValue>{`${sensor1.value.toFixed(0)} ${sensor1Data.unit}`}</SensorValue>
        <Classification>{sensor1Data.classification}</Classification>
      </SensorTopLeft>

      <SensorBottomRight
        style={{ backgroundColor: sensor2Data.backgroundColor }}
      >
        <SensorType>{sensor2.type}</SensorType>
        <SensorValue>{`${sensor2.value.toFixed(0)} ${sensor2Data.unit}`}</SensorValue>
        <Classification>{sensor2Data.classification}</Classification>
      </SensorBottomRight>
    </DualCard>
  );
}

export default DualSensorCard;
