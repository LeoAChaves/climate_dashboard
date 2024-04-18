// src/pages/DashboardPage.js
import React, { useState, useEffect } from "react";
import SensorCard from "../components/SensorCard";
import getRandomSensorData from "../services/SensorDataService";

function DashboardPage() {
  const [sensors, setSensors] = useState([]);

  useEffect(() => {
    setSensors(getRandomSensorData());
    const interval = setInterval(() => {
      setSensors(getRandomSensorData());
    }, 5000); // Atualiza os dados a cada 5 segundos
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap", // Permite que os itens quebrem em múltiplas linhas
        justifyContent: "space-around", // Espaçamento entre os cards
        alignItems: "flex-start", // Alinha os itens ao topo
        gap: "20px", // Espaço entre os cards
      }}
    >
      {sensors.map((sensor) => (
        <SensorCard key={sensor.type} sensor={sensor} />
      ))}
    </div>
  );
}

export default DashboardPage;
