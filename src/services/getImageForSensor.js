const unitMap = {
  pressao: "hPa",
  temperatura: "°C",
  vento: "km/h",
  uv: "W/m²",
  umidade: "%",
  luminosidade: "Lux",
  pluviometro: "mm",
  co2: "ppm",
};

function normalizeString(input) {
  return input.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function getImageForSensor(type, value) {
  let imageSrc, classification, unit;
  const normalizedType = normalizeString(type).toLowerCase();
  unit = unitMap[normalizedType];

  switch (normalizedType) {
    case "pressao": // Normalizado "pressão"
      if (value < 900) {
        imageSrc = "pressao1.png";
        classification = "Muito Baixa - Tempestade Severa";
      } else if (value < 950) {
        imageSrc = "pressao2.png";
        classification = "Baixa - Clima Instável";
      } else if (value < 1020) {
        imageSrc = "pressao3.png";
        classification = "Normal - Clima Padrão";
      } else if (value < 1060) {
        imageSrc = "pressao4.png";
        classification = "Alta - Céu Limpo e Seco";
      } else {
        imageSrc = "pressao5.png";
        classification = "Muito Alta - Extremamente Seco";
      }
      break;
    case "temperatura":
      if (value <= 0) {
        imageSrc = "temperatura1.png";
        classification = "Congelando";
      } else if (value < 15) {
        imageSrc = "temperatura2.png";
        classification = "Frio";
      } else if (value < 25) {
        imageSrc = "temperatura3.png";
        classification = "Fresco";
      } else if (value < 30) {
        imageSrc = "temperatura4.png";
        classification = "Quente";
      } else {
        imageSrc = "temperatura5.png";
        classification = "Calor Extremo";
      }
      break;
    case "vento":
      if (value < 9) {
        imageSrc = "vento1.png";
        classification = "Vento Calmo";
      } else if (value < 19) {
        imageSrc = "vento2.png";
        classification = "Brisa Leve";
      } else if (value < 31) {
        imageSrc = "vento3.png";
        classification = "Brisa Agradável";
      } else if (value < 46) {
        imageSrc = "vento4.png";
        classification = "Brisa Moderada";
      } else if (value < 61) {
        imageSrc = "vento5.png";
        classification = "Brisa Fresca";
      } else {
        imageSrc = "vento6.png";
        classification = "Brisa Forte";
      }
      break;
    case "uv":
      if (value < 3) {
        imageSrc = "uv1.png";
        classification = "Baixo";
      } else if (value < 6) {
        imageSrc = "uv2.png";
        classification = "Moderado";
      } else if (value < 8) {
        imageSrc = "uv3.png";
        classification = "Alto";
      } else if (value < 11) {
        imageSrc = "uv4.png";
        classification = "Muito Alto";
      } else {
        imageSrc = "uv5.png";
        classification = "Extremo";
      }
      break;
    case "umidade":
      if (value < 20) {
        imageSrc = "umidade1.png";
        classification = "Sol Brilhante e Seco";
      } else if (value < 40) {
        imageSrc = "umidade2.png";
        classification = "Sol Confortável";
      } else if (value < 60) {
        imageSrc = "umidade3.png";
        classification = "Clima Ameno";
      } else if (value < 80) {
        imageSrc = "umidade4.png";
        classification = "Preparação para Chuva";
      } else {
        imageSrc = "umidade5.png";
        classification = "Véspera de Tempestade";
      }
      break;
    default:
      imageSrc = "default.png";
      classification = "Indefinido";
      unit = "[N/A]";
  }

  return {
    imageSrc: `/assets/${normalizedType}/${imageSrc}`,
    classification,
    unit,
  };
}

export default getImageForSensor;
