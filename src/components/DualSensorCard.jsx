import React from "react";
import styled from "styled-components";
import getImageForSensor from "../services/getImageForSensor.js";

const DualCard = styled.div`
  position: relative;
  border-radius: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  color: #333;
  overflow: hidden;
  width: 100%; // Card é fluido
  max-width: 600px; // Limite máximo para telas grandes
  height: 300px; // Altura fixa para telas grandes
  font-family: "Arial", sans-serif;
  display: flex;
  flex-direction: row; // Layout horizontal por padrão
  justify-content: space-between;

  @media (max-width: 768px) {
    flex-direction: column; // Empilha os sensores verticalmente em telas menores
    height: 600px; // Ajusta a altura para acomodar ambos os sensores empilhados
    justify-content: space-between; // Distribui o espaço igualmente no eixo vertical
  }

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
  flex-direction: column; // Define explicitamente como coluna
  justify-content: space-between; // Espaça os sensores no eixo vertical
  padding: 30px;
  height: 100%; // Ocupa toda a altura do DualCard
`;

const SensorInfo = styled.div`
  border-radius: 16px;
  text-align: center;
  flex-grow: 1;
  max-height: 80px; // Ajusta a altura máxima para melhor visualização
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 15px;
  @media (max-width: 768px) {
    max-width: 200px;
  }
`;

const SensorType = styled.div`
  font-size: 12px;
  color: #222;
`;

const SensorValue = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: #000;
  margin-top: 4px;
`;

const Classification = styled.div`
  font-size: 12px;
  color: #222;
  margin-top: 4px;
`;

function DualSensorCard({ sensor1, sensor2 }) {
  const sensor1Data = getImageForSensor(sensor1.type, sensor1.value);
  const sensor2Data = getImageForSensor(sensor2.type, sensor2.value);

  return (
    <DualCard $backgroundImage={sensor1Data.imageSrc}>
      <SensorContainer>
        <SensorInfo style={{ backgroundColor: sensor1Data.backgroundColor }}>
          <SensorType>{sensor1.type}</SensorType>
          <SensorValue>{`${sensor1.value.toFixed(0)} ${
            sensor1Data.unit
          }`}</SensorValue>
          <Classification>{sensor1Data.classification}</Classification>
        </SensorInfo>
        <SensorInfo style={{ backgroundColor: sensor2Data.backgroundColor }}>
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
