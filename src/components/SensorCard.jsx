import React from "react";
import styled from "styled-components";
import getImageForSensor from "../services/getImageForSensor.js";

const Card = styled.div`
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 20px;
  margin: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 350px;
`;

const SensorImage = styled.img`
  width: 250px;
  height: 250px;
  margin-right: 20px;
`;

const SensorValue = styled.div`
  font-size: 18px;
  font-weight: bold;
`;

const Classification = styled.div`
  font-size: 16px;
  color: #666;
`;

function SensorCard({ sensor }) {
  const { imageSrc, classification } = getImageForSensor(
    sensor.type,
    sensor.value
  );

  return (
    <Card>
      <SensorImage src={imageSrc} alt={`Imagem ${classification}`} />
      <SensorValue>{`${sensor.type}: ${sensor.value.toFixed(2)}`}</SensorValue>
      <Classification>{classification}</Classification>
    </Card>
  );
}

export default SensorCard;
