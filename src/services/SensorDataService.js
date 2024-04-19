function getRandomSensorData() {
  const sensorTypes = [
    "Pressão",
    "Temperatura",
    "UV",
    "Vento",
    "Umidade",
    "Pluviômetro",
  ]; // Adicionado "Pluviômetro"
  return sensorTypes.map((type) => {
    let value;
    switch (type) {
      case "Pressão":
        value = Math.floor(800 + Math.random() * 300);
        break;
      case "Temperatura":
        value = Math.floor(-10 + Math.random() * 50);
        break;
      case "UV":
        value = Math.floor(Math.random() * 12);
        break;
      case "Vento":
        value = Math.floor(Math.random() * 100);
        break;
      case "Umidade":
        value = Math.floor(Math.random() * 100);
        break;
      case "Pluviômetro":
        value = Math.floor(Math.random() * 70); // Definir valor aleatório para o Pluviômetro
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
