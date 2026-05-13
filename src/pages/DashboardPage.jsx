import React, { useState, useEffect } from "react";
import SensorCard from "../components/SensorCard";
import DualSensorCard from "../components/DualSensorCard";
import getRandomSensorData from "../services/SensorDataService";
import LoadingPage from "./LoadingPage";
import styled from "styled-components";

const DashboardContainer = styled.div`
  height: 100vh;
  display: grid;
  grid-template-rows: 1fr 1fr;
  gap: 16px;
  padding: 20px;
  box-sizing: border-box;
  background-color: #f5f5f5;
`;

const TopRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
`;

const BottomRow = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
`;

// Wrapper para garantir altura igual em todos os cards
const CardWrapper = styled.div`
  height: 100%;
`;

function DashboardPage() {
  const [sensors, setSensors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSensors() {
      setLoading(true);
      const data = await getRandomSensorData();
      setSensors(data);
      setLoading(false);
    }

    fetchSensors();
    const interval = setInterval(fetchSensors, 5000);
    return () => clearInterval(interval);
  }, []);

  const organizeSensors = (sensors) => {
    const humiditySensor = sensors.find((s) => s.type === "Umidade");
    const pressureSensor = sensors.find((s) => s.type === "Pressão");

    const remainingSensors = sensors.filter(
      (s) => s.type !== "Umidade" && s.type !== "Pressão",
    );

    return {
      pairedSensor:
        humiditySensor && pressureSensor
          ? { sensor1: humiditySensor, sensor2: pressureSensor }
          : null,
      singleSensors: remainingSensors,
    };
  };

  if (loading) {
    return <LoadingPage />;
  }

  const { pairedSensor, singleSensors } = organizeSensors(sensors);
  const topSingleCard = singleSensors[0];
  const bottomCards = singleSensors.slice(1, 4);

  return (
    <DashboardContainer>
      <TopRow>
        {pairedSensor && (
          <CardWrapper>
            <DualSensorCard
              sensor1={pairedSensor.sensor1}
              sensor2={pairedSensor.sensor2}
            />
          </CardWrapper>
        )}
        {topSingleCard && (
          <CardWrapper>
            <SensorCard sensor={topSingleCard} />
          </CardWrapper>
        )}
      </TopRow>

      <BottomRow>
        {bottomCards.map((sensor, index) => (
          <CardWrapper key={index}>
            <SensorCard sensor={sensor} />
          </CardWrapper>
        ))}
      </BottomRow>
    </DashboardContainer>
  );
}

export default DashboardPage;
