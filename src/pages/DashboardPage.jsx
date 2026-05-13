import React, { useState, useEffect, useRef } from "react";
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

const CardWrapper = styled.div`
  height: 100%;
`;

// Listas de cidades e países fictícios
const cities = [
  "Nova Aurora",
  "Vale do Sol",
  "Porto das Estrelas",
  "Monte Verde",
  "Cidade dos Ventos",
  "São Lucas",
  "Bela Vista",
  "Rio das Flores",
  "Campo Grande do Sul",
  "Vila Esperança",
  "Morro Azul",
  "Pedra Branca",
  "Lagoa Serena",
  "Jardim do Éden",
  "Cristalina",
  "Santa Fé",
];

const countries = [
  "Eldoria",
  "Valdoria",
  "Mystralia",
  "Aetheria",
  "Nordlandia",
  "Sulvania",
  "Ocidentia",
  "Orientalis",
  "Terra Nova",
  "Aquilônia",
  "Verdelândia",
  "Montanhas Altas",
  "Reino do Sol",
  "Império Lunar",
  "Confederação das Águas",
  "União dos Vales",
];

// Função para gerar localização aleatória
const getRandomLocation = () => {
  const randomCity = cities[Math.floor(Math.random() * cities.length)];
  const randomCountry = countries[Math.floor(Math.random() * countries.length)];
  return `${randomCity}, ${randomCountry}`;
};

function DashboardPage() {
  const [sensors, setSensors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentLocation, setCurrentLocation] = useState("");
  const timeoutRef = useRef(null);
  const intervalRef = useRef(null);

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

  useEffect(() => {
    // Função para buscar novos dados
    const fetchNewData = async () => {
      // Gera localização aleatória
      const newLocation = getRandomLocation();
      setCurrentLocation(newLocation);

      setLoading(true);

      const data = await getRandomSensorData();

      // Após buscar, espera 3 segundos antes de remover o loading
      timeoutRef.current = setTimeout(() => {
        setSensors(data);
        setLoading(false);
      }, 3000);
    };

    // Primeira carga inicial
    const initialFetch = async () => {
      setLoading(true);
      const data = await getRandomSensorData();
      setSensors(data);

      // Primeira exibição: dados carregados
      setTimeout(() => {
        setLoading(false);
      }, 0);
    };

    initialFetch();

    // Configura o intervalo para executar o ciclo a cada 13 segundos
    intervalRef.current = setInterval(() => {
      fetchNewData();
    }, 13000);

    // Cleanup
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Ignoramos o warning porque não queremos recriar o intervalo

  if (loading) {
    return <LoadingPage location={currentLocation} />;
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
