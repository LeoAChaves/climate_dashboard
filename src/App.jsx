// App.js
import React, { useState } from "react";
import SensorCard from "./components/SensorCard.jsx";
import { fetchSensorData } from "./services/SensorService.js";

function App() {
  const [sensorData, setSensorData] = useState(fetchSensorData());

  return (
    <div>
      <h1>Dashboard Climático</h1>
      <div>
        {sensorData.map((sensor) => (
          <SensorCard
            key={sensor.type}
            sensorType={sensor.type}
            value={sensor.data.value}
            unit={sensor.data.unit}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
