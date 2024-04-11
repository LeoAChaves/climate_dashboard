import React, { useEffect, useState } from "react";
import WeatherCard from "../../components/WeatherCard/WeatherCard";
import "./Dashboard.css";

const Dashboard = () => {
  const [data, setData] = useState([
    { topic: "temperatura", value: 20, min: 5, max: 35, step: 1, direction: 1 },
    { topic: "umidade", value: 50, min: 20, max: 100, step: 2, direction: 1 },
    {
      topic: "luminosidade",
      value: 500,
      min: 100,
      max: 1000,
      step: 50,
      direction: 1,
    },
  ]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setData((currentData) =>
        currentData.map((item) => {
          // Calcular novo valor baseado na direção atual
          let newValue = item.value + item.step * item.direction;

          // Verificar limites e ajustar direção se necessário
          if (newValue > item.max || newValue < item.min) {
            item.direction *= -1; // Inverte a direção
            newValue = item.value + item.step * item.direction; // Recalcular com nova direção
          }

          return { ...item, value: newValue };
        })
      );
    }, 1000);

    return () => clearInterval(intervalId); // Limpeza na desmontagem
  }, []);

  return (
    <div className="dashboard">
      {data.map((item, index) => (
        <WeatherCard
          key={index}
          topic={item.topic}
          value={item.value}
          date={new Date()}
        />
      ))}
    </div>
  );
};

export default Dashboard;
