// SensorCard.js
import React from "react";

// Expansão das faixas de valores para cada tipo de sensor
const sensorImages = {
  Temperatura: [
    {
      max: -10,
      img: "../assets/dashboard/Thermometer/Cold_Thermometer.png",
      icon: "muito-frio-icon.png",
    },
    {
      max: 0,
      img: "../assets/dashboard/Thermometer/Cold_Thermometer.png",
      icon: "frio-icon.png",
    },
    {
      max: 15,
      img: "../assets/dashboard/Thermometer/Cold_Thermometer.png",
      icon: "ameno-icon.png",
    },
    {
      max: 25,
      img: "../assets/dashboard/Thermometer/Cold_Thermometer.png",
      icon: "quente-icon.png",
    },
    {
      max: Infinity,
      img: "../assets/dashboard/Thermometer/Cold_Thermometer.png",
      icon: "muito-quente-icon.png",
    },
  ],
  Pressão: [
    { max: 980, img: "pressao-muito-baixa.png", icon: "muito-baixa-icon.png" },
    { max: 1000, img: "pressao-baixa.png", icon: "baixa-icon.png" },
    { max: 1020, img: "pressao-normal.png", icon: "normal-icon.png" },
    { max: 1040, img: "pressao-alta.png", icon: "alta-icon.png" },
    {
      max: Infinity,
      img: "pressao-muito-alta.png",
      icon: "muito-alta-icon.png",
    },
  ],
  UV: [
    { max: 2, img: "uv-muito-baixo.png", icon: "muito-baixo-icon.png" },
    { max: 5, img: "uv-baixo.png", icon: "baixo-icon.png" },
    { max: 7, img: "uv-moderado.png", icon: "moderado-icon.png" },
    { max: 10, img: "uv-alto.png", icon: "alto-icon.png" },
    { max: Infinity, img: "uv-muito-alto.png", icon: "muito-alto-icon.png" },
  ],
  Vento: [
    { max: 10, img: "vento-muito-fraco.png", icon: "muito-fraco-icon.png" },
    { max: 20, img: "vento-fraco.png", icon: "fraco-icon.png" },
    { max: 30, img: "vento-moderado.png", icon: "moderado-icon.png" },
    { max: 50, img: "vento-forte.png", icon: "forte-icon.png" },
    {
      max: Infinity,
      img: "vento-muito-forte.png",
      icon: "muito-forte-icon.png",
    },
  ],
};

function SensorCard({ sensorType, value, unit }) {
  // Seleciona imagem e ícone com base no valor e tipo
  const { img, icon } = sensorImages[sensorType].find(
    (range) => value <= range.max
  );

  return (
    <div
      style={{
        border: "1px solid gray",
        padding: "10px",
        margin: "10px",
        display: "flex",
        alignItems: "center",
      }}
    >
      <img
        src={`images/${img}`}
        alt={sensorType}
        style={{ width: "50px", height: "50px" }}
      />
      <img
        src={`icons/${icon}`}
        alt="icon"
        style={{ width: "20px", height: "20px" }}
      />
      <p>{`${value.toFixed(2)} ${unit}`}</p>
    </div>
  );
}

export default SensorCard;
