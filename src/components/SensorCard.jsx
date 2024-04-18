import React from "react";
import styled from "styled-components";
import getImageForSensor from "../services/getImageForSensor.js";

const Card = styled.div`
  position: relative;
  border-radius: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  color: #333;
  overflow: hidden;
  width: 100%;
  max-width: 300px; // Limita o tamanho máximo
  aspect-ratio: 1; // Mantém a proporção de 1:1

  @media (max-width: 768px) {
    max-width: 50%; // Ajusta para que dois cartões possam se alinhar lado a lado
    height: auto; // Ajusta a altura baseada na largura para manter proporção
  }

  @media (max-width: 500px) {
    max-width: 100%; // Ajusta para um cartão por linha em telas muito pequenas
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
    opacity: 1;
    border-radius: 20px;
    z-index: 0;
  }

  > * {
    position: relative;
    z-index: 1;
  }
`;

const ReadingBox = styled.div`
  border-radius: 16px;
  padding: 10px 15px;
  position: absolute;
  top: 16px;
  right: 16px;
  text-align: left;
`;

const ClassificationBox = styled.div`
  border-radius: 16px;
  padding: 10px;
  position: absolute; // Posiciona absolutamente dentro do Card
  bottom: 16px;
  left: 0;
  right: 0;
  text-align: center;
  margin: auto;
  min-width: 100px;
  width: fit-content; // Ajusta o tamanho ao conteúdo
`;

const SensorType = styled.div`
  font-size: 12px; // Fonte menor para o tipo do sensor
  font-weight: normal;
  text-align: center;
  color: #222;
`;

const SensorValue = styled.div`
  font-size: 16px; // Fonte maior para o valor da leitura
  font-weight: bold;
  color: #000;
  margin-top: 4px;
  text-align: center;
`;

const Classification = styled.div`
  font-size: 12px;
  color: #222;
`;

function SensorCard({ sensor }) {
  const { imageSrc, classification, unit, backgroundColor } = getImageForSensor(
    sensor.type,
    sensor.value
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
