import React, { useState, useEffect } from "react";
import SensorCard from "../components/SensorCard";
import DualSensorCard from "../components/DualSensorCard";
import getRandomSensorData from "../services/SensorDataService";
import LoadingPage from "./LoadingPage"; // Import LoadingPage component
import styled from "styled-components";

const DashboardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: flex-start;
  gap: 20px;
  margin: 20px;

  @media (max-width: 768px) {
    justify-content: space-between;
  }

  @media (min-width: 250px) and (max-width: 768px) {
    justify-content: flex-start;
  }
`;

function DashboardPage() {
  const [sensors, setSensors] = useState([]);
  const [loading, setLoading] = useState(true); // State to handle loading

  useEffect(() => {
    async function fetchSensors() {
      setLoading(true); // Start loading
      const data = await getRandomSensorData();
      setSensors(data);
      setLoading(false); // End loading after data is fetched
    }

    fetchSensors();
    const interval = setInterval(fetchSensors, 5000);
    return () => clearInterval(interval);
  }, []);

  const findAndPairSensors = (sensors) => {
    const paired = [];
    const tempSensors = [...sensors];

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

  if (loading) {
    return <LoadingPage />;
  }

  return <DashboardContainer>{renderSensors()}</DashboardContainer>;
}

export default DashboardPage;
