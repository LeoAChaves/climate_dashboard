// SensorService.js
const sensorTypes = ["Pressão", "Temperatura", "UV", "Vento"];

function getRandomData(sensorType) {
  // Definição de faixas mínimas e máximas para cada sensor
  let minValue, maxValue;
  switch (sensorType) {
    case "Pressão":
      minValue = 960; // Mínimo para pressão muito baixa
      maxValue = 1060; // Máximo para pressão muito alta
      break;
    case "Temperatura":
      minValue = -20; // Mínimo para temperatura muito baixa
      maxValue = 40; // Máximo para temperatura muito alta
      break;
    case "UV":
      minValue = 0; // Mínimo para UV muito baixo
      maxValue = 12; // Máximo para UV muito alto
      break;
    case "Vento":
      minValue = 0; // Mínimo para vento muito fraco
      maxValue = 100; // Máximo para vento muito forte
      break;
    default:
      minValue = 0;
      maxValue = 100;
      break;
  }

  // Gera um valor aleatório dentro da faixa especificada
  const value = Math.random() * (maxValue - minValue) + minValue;
  return { value, unit: getUnit(sensorType) };
}

function getUnit(sensorType) {
  switch (sensorType) {
    case "Pressão":
      return "hPa";
    case "Temperatura":
      return "°C";
    case "UV":
      return "UVI";
    case "Vento":
      return "km/h";
    default:
      return "";
  }
}

export function fetchSensorData() {
  return sensorTypes.map((type) => ({
    type,
    data: getRandomData(type),
  }));
}
