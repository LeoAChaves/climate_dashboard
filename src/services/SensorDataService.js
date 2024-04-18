function getRandomSensorData() {
  const sensorTypes = ["Pressão", "Temperatura", "UV", "Vento"];
  return sensorTypes.map((type) => {
    let value;
    switch (type) {
      case "Pressão":
        // Gerando valores entre 800 hPa (muito baixo) e 1100 hPa (muito alto)
        value = 800 + Math.random() * 300;
        break;
      case "Temperatura":
        // Gerando valores entre -10 °C (muito frio) e 40 °C (muito quente)
        value = -10 + Math.random() * 50;
        break;
      case "UV":
        // Gerando valores de índice UV entre 0 (baixo) e 12 (extremo)
        value = Math.random() * 12;
        break;
      case "Vento":
        // Gerando valores de vento entre 0 m/s (calmo) e 100 m/s (muito forte)
        value = Math.random() * 100;
        break;
      default:
        value = 0;
    }
    return {
      type,
      value,
    };
  });
}

export default getRandomSensorData;
