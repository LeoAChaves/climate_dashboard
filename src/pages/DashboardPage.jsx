import React, { useState, useEffect } from "react";
import SensorCard from "../components/SensorCard";
import DualSensorCard from "../components/DualSensorCard"; // Import the new component
import getRandomSensorData from "../services/SensorDataService";

function DashboardPage() {
  const [sensors, setSensors] = useState([]);

  useEffect(() => {
    setSensors(getRandomSensorData());
    const interval = setInterval(() => {
      setSensors(getRandomSensorData());
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Helper function to find and pair sensors of Umidade and Pressão
  const findAndPairSensors = (sensors) => {
    const paired = [];
    const tempSensors = [...sensors]; // Clone to manipulate

    const humiditySensor = tempSensors.find(
      (sensor) => sensor.type === "Umidade"
    );
    const pressureSensor = tempSensors.find(
      (sensor) => sensor.type === "Pressão"
    );

    if (humiditySensor && pressureSensor) {
      paired.push({ sensor1: humiditySensor, sensor2: pressureSensor });
      tempSensors.splice(tempSensors.indexOf(humiditySensor), 1);
      tempSensors.splice(tempSensors.indexOf(pressureSensor), 1);
    }

    return [paired, ...tempSensors];
  };

  const renderSensors = () => {
    const [pairedSensors, ...individualSensors] = findAndPairSensors(sensors);

    return (
      <>
        {pairedSensors.map((pair, index) => (
          <DualSensorCard
            key={`pair-${index}`}
            sensor1={pair.sensor1}
            sensor2={pair.sensor2}
          />
        ))}
        {individualSensors.map((sensor) => (
          <SensorCard key={sensor.type} sensor={sensor} />
        ))}
      </>
    );
  };

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-around",
        alignItems: "flex-start",
        gap: "20px",
      }}
    >
      {renderSensors()}
    </div>
  );
}

export default DashboardPage;
