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
  let imageSrc, classification, unit, backgroundColor;
  const normalizedType = normalizeString(type).toLowerCase();
  unit = unitMap[normalizedType];

  switch (normalizedType) {
    case "pluviometro":
      if (value === 0) {
        imageSrc = "pluviometro0.png";
        classification = "Sem Chuva";
      } else if (value < 2.5) {
        imageSrc = "pluviometro1.png";
        classification = "Chuva Muito Leve";
      } else if (value < 7.6) {
        imageSrc = "pluviometro2.png";
        classification = "Chuva Leve";
      } else if (value < 16) {
        imageSrc = "pluviometro3.png";
        classification = "Chuva Moderada";
      } else if (value < 50) {
        imageSrc = "pluviometro4.png";
        classification = "Chuva Forte";
      } else {
        imageSrc = "pluviometro5.png";
        classification = "Chuva Torrencial";
      }
      break;
    case "pressao":
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
  backgroundColor = getBackgroundColorForSensor(normalizedType, classification);

  return {
    imageSrc: `/assets/${normalizedType}/${imageSrc}`,
    classification: classification,
    unit: unit,
    backgroundColor: backgroundColor, // novo retorno que inclui a cor de fundo
  };
}

function getBackgroundColorForSensor(type, classification) {
  const base = classification.split(" - ")[0];
  const colorMap = {
    pluviometro: {
      "Sem Chuva": "#F0FFFF", // Azure, mais claro do que Alice Blue
      "Chuva Muito Leve": "#B2DFEE", // Light Blue 2, um tom pastel de azul mais claro
      "Chuva Leve": "#BFEFFF", // Deep Sky Blue 2, mais pastel
      "Chuva Moderada": "#9AC0CD", // Light Blue 4, mais suave e pastel
      "Chuva Forte": "#68838B", // Light Blue 4, mais escuro, mas ainda pastel
      "Chuva Torrencial": "#607B8B", // Light Sky Blue 4, suave e pastel
    },
    pressao: {
      "Muito Baixa": "#B0C4DE", // Light Steel Blue
      Baixa: "#ADD8E6", // Light Blue
      Normal: "#87CEEB", // Sky Blue
      Alta: "#4682B4", // Steel Blue
      "Muito Alta": "#4169E1", // Royal Blue
    },
    temperatura: {
      Congelando: "#B0E0E6", // Powder Blue
      Frio: "#87CEFA", // Light Sky Blue
      Fresco: "#4682B4", // Steel Blue
      Quente: "#FF6347", // Tomato
      "Calor Extremo": "#FF4500", // Orange Red
    },
    vento: {
      "Vento Calmo": "#DAF7A6", // Pastel Green
      "Brisa Leve": "#D4E157", // Light Lime
      "Brisa Agradável": "#C5E1A5", // Pale Light Green
      "Brisa Moderada": "#AED581", // Soft Lime Green
      "Brisa Fresca": "#9CCC65", // Slightly Bright Green
      "Brisa Forte": "#7CB342", // Moderate Olive
    },
    uv: {
      Baixo: "#9ACD32", // Yellow Green
      Moderado: "#FFFF00", // Yellow
      Alto: "#FFD700", // Gold
      "Muito Alto": "#FFA500", // Orange
      Extremo: "#FF4500", // Orange Red
    },
    umidade: {
      "Sol Brilhante e Seco": "#B3E5FC", // Light Blue
      "Sol Confortável": "#81D4FA", // Lighter Blue
      "Clima Ameno": "#4FC3F7", // Bright Light Blue
      "Preparação para Chuva": "#29B6F6", // Sky Blue
      "Véspera de Tempestade": "#039BE5", // Strong Blue
    },
    // Outros sensores podem seguir um padrão similar
  };

  return colorMap[type]
    ? colorMap[type][base] || "rgba(255, 255, 255)"
    : "rgba(255, 255, 255)";
}

export default getImageForSensor;
