import React from "react";
import styled from "styled-components";
import getImageForSensor from "../services/getImageForSensor.js";

const Card = styled.div`
  position: relative;
  border-radius: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  color: #333;
  overflow: hidden;
  width: 300px;
  height: 300px;
  font-family: "Arial", sans-serif;

  // Pseudo-elemento para a imagem de fundo com opacidade
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
    opacity: 1; // Ajuste a opacidade conforme desejado
    border-radius: 20px; // Para manter os cantos arredondados
    z-index: 0;
  }

  // Garante que o conteúdo do Card fique acima do pseudo-elemento
  > * {
    position: relative;
    z-index: 1;
  }
`;

const ReadingBox = styled.div`
  background-color: rgba(255, 255, 255);
  border-radius: 16px;
  padding: 10px 15px;
  position: absolute;
  top: 16px;
  right: 16px;
  text-align: left;
`;

const ClassificationBox = styled.div`
  background-color: rgba(255, 255, 255);
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
  color: #666;
`;

const SensorValue = styled.div`
  font-size: 16px; // Fonte maior para o valor da leitura
  font-weight: bold;
  color: #333;
  margin-top: 4px;
  text-align: center;
`;

const Classification = styled.div`
  font-size: 12px;
  color: #666;
`;

function SensorCard({ sensor }) {
  const { imageSrc, classification, unit } = getImageForSensor(
    sensor.type,
    sensor.value
  );

  return (
    <Card $backgroundImage={imageSrc}>
      <ReadingBox>
        <SensorType>{sensor.type}</SensorType>
        <SensorValue>{`${sensor.value.toFixed(0)} ${unit}`}</SensorValue>
      </ReadingBox>
      <ClassificationBox>
        <Classification>{classification}</Classification>
      </ClassificationBox>
    </Card>
  );
}

export default SensorCard;
