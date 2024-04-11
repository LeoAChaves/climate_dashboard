// src/components/WeatherCard.jsx
import React from "react";
import "./WeatherCard.css";

function interpolateColor(color1, color2, factor) {
  if (arguments.length < 3) {
    factor = 0.5;
  }
  var result = color1.slice();
  for (var i = 0; i < 3; i++) {
    result[i] = Math.round(result[i] + factor * (color2[i] - color1[i]));
  }
  return result;
}

function getColorForTemperature(value) {
  const cold = [0, 0, 255]; // Azul
  const cool = [0, 255, 0]; // Verde
  const warm = [255, 255, 0]; // Amarelo
  const hot = [255, 0, 0]; // Vermelho

  if (value <= 10) {
    return `rgb(${interpolateColor(cold, cool, value / 10).join(",")})`;
  } else if (value <= 20) {
    return `rgb(${interpolateColor(cool, warm, (value - 10) / 10).join(",")})`;
  } else {
    return `rgb(${interpolateColor(warm, hot, (value - 20) / 15).join(",")})`;
  }
}

const WeatherCard = ({ topic, value, date }) => {
  const getColor = () => {
    switch (topic) {
      case "temperatura":
        return getColorForTemperature(value);
      case "umidade":
        return value < 30 ? "#89cff0" : "#0057b7";
      case "luminosidade":
        return value < 500 ? "#ffffe0" : "#fffacd";
      default:
        return "#fff";
    }
  };

  return (
    <div className="weather-card" style={{ backgroundColor: getColor() }}>
      <h2>{topic.toUpperCase()}</h2>
      <p>Valor: {Math.round(value)}</p>
      <p>Data: {date.toLocaleDateString()}</p>
    </div>
  );
};

export default WeatherCard;
