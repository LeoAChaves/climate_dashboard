# 📊 Smart Sensor Dashboard

Um dashboard interativo para monitoramento de sensores com atualização automática de dados, tela de loading personalizada e geração aleatória de localizações fictícias.

## 🎯 Sobre o Projeto

O **Smart Sensor Dashboard** é uma aplicação React que simula um painel de controle para monitoramento de sensores. O sistema exibe dados de diferentes tipos de sensores (temperatura, umidade, pressão, etc.) em um layout responsivo, com atualizações automáticas a cada 13 segundos.

Durante cada atualização, o dashboard exibe uma tela de loading com uma mensagem personalizada e uma localização fictícia aleatória, criando uma experiência mais dinâmica e envolvente.

## ✨ Funcionalidades

- **Dashboard responsivo** com grid layout (2x2 e 3x1)
- **Cards duplos** para sensores emparelhados (Umidade + Pressão)
- **Cards individuais** para os demais sensores
- **Atualização automática** a cada 13 segundos
- **Tela de loading** com animação de círculo giratório
- **Geração aleatória** de cidades e países fictícios
- **Timer de 10 segundos** para exibição dos dados
- **Timer de 3 segundos** para tela de loading
- **Background unificado** entre dashboard e loading
- **Dados simulados** gerados aleatoriamente

## 🛠️ Tecnologias Utilizadas

| Tecnologia        | Descrição                                  |
| ----------------- | ------------------------------------------ |
| React 18+         | Biblioteca principal para construção da UI |
| Styled Components | Estilização componentizada com CSS-in-JS   |
| JavaScript (ES6+) | Lógica da aplicação                        |
| Webpack           | Bundler e servidor de desenvolvimento      |

## 📁 Estrutura do Projeto

```

src/
├── components/
│ ├── SensorCard.jsx # Card para sensor individual
│ └── DualSensorCard.jsx # Card para dois sensores
├── pages/
│ ├── DashboardPage.jsx # Página principal do dashboard
│ └── LoadingPage.jsx # Tela de carregamento
├── services/
│ └── SensorDataService.js # Serviço de geração de dados
└── assets/
└── loading.png # Imagem da tela de loading

```

## 🚀 Instalação

### Pré-requisitos

- Node.js (versão 14 ou superior)
- npm ou yarn

### Passos para instalação

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/smart-sensor-dashboard.git

# Entre no diretório do projeto
cd smart-sensor-dashboard

# Instale as dependências
npm install

# Ou com yarn
yarn install

# Inicie o servidor de desenvolvimento
npm start

# Ou com yarn
yarn start
```

A aplicação estará disponível em `http://localhost:3000`

## 💻 Como Usar

1. A aplicação inicia automaticamente com dados de sensores
2. O dashboard exibe os sensores organizados:
   - **Topo**: Sensor duplo (Umidade + Pressão) na esquerda e um sensor individual na direita
   - **Base**: 3 sensores individuais em linha
3. Após 10 segundos, a tela de loading aparece por 3 segundos
4. Novos dados são carregados e exibidos
5. O ciclo se repete indefinidamente

## 🔄 Ciclo de Funcionamento

```
┌─────────────────────────────────────────────────────────┐
│                    CICLO COMPLETO (13s)                 │
├─────────────────────────────────────────────────────────┤
│                                                         │
│   ┌──────────────┐      ┌──────────────┐                │
│   │   DADOS      │ ──►  │   LOADING    │ ──► (repete)   │
│   │   (10s)      │      │    (3s)      │                │
│   └──────────────┘      └──────────────┘                │
│                                                         │
│   Durante o loading:                                    │
│   • Texto "Carregando novos dados..."                   │
│   • Animação de círculo girando                         │
│   • Localização aleatória (ex: "Nova Aurora, Eldoria")  │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

## 🧩 Componentes

### DashboardPage.jsx

Página principal que gerencia:

- Estado dos sensores
- Timer de atualização
- Organização dos cards
- Ciclo de loading/dados

### LoadingPage.jsx

Tela de carregamento com:

- Animação de círculo giratório
- Imagem centralizada
- Mensagem "Carregando novos dados..."
- Localização fictícia aleatória

### SensorCard.jsx

Card para sensor individual que exibe:

- Tipo do sensor (ex: "Temperatura")
- Valor atual
- Unidade de medida

### DualSensorCard.jsx

Card duplo que exibe dois sensores lado a lado (ex: Umidade e Pressão)

### SensorDataService.js

Serviço que gera dados aleatórios simulando leituras de sensores reais.

## 🎨 Personalização

### Alterar o tempo de exibição

No arquivo `DashboardPage.jsx`, ajuste o valor do `setInterval`:

```javascript
// 10s dados + 3s loading = 13000ms
intervalRef.current = setInterval(() => {
  fetchNewData();
}, 13000); // Altere este valor
```

### Alterar cores

No `LoadingPage.jsx`:

```javascript
border-top-color: #3498db; // Cor do círculo de loading
```

### Adicionar mais cidades/países

No `DashboardPage.jsx`, edite os arrays:

```javascript
const cities = ["Nova Aurora", "Vale do Sol", "Sua Cidade aqui"];

const countries = ["Eldoria", "Valdoria", "Seu País aqui"];
```

### Alterar imagem de loading

Substitua o arquivo em `./assets/loading.png` ou altere o caminho no componente:

```jsx
<LoadingImage src="./seu-caminho/nova-imagem.png" alt="Loading" />
```

## 📊 Exemplo de Dados

Os dados gerados pelo serviço incluem:

| Tipo                | Faixa de Valores | Unidade |
| ------------------- | ---------------- | ------- |
| Temperatura         | -10°C a 40°C     | °C      |
| Umidade             | 0% a 100%        | %       |
| Pressão             | 950hPa a 1050hPa | hPa     |
| Velocidade do Vento | 0 km/h a 50 km/h | km/h    |
| Qualidade do Ar     | 0 a 500          | AQI     |

## 🤝 Contribuição

Contribuições são bem-vindas! Siga os passos:

1. Faça um Fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 👥 Autores

- **Leonardo Chaves** - _Desenvolvimento inicial_ - [LeoAChaves](https://github.com/LeoAChaves)

## 🙏 Agradecimentos

- Inspirado em sistemas de monitoramento IoT
- Ícones e assets de domínio público
- Comunidade React pelo excelente ecossistema

---

## 📞 Suporte

Para questões, bugs ou sugestões, abra uma issue no [GitHub Issues](https://github.com/seu-usuario/smart-sensor-dashboard/issues)

---

**Desenvolvido com ❤️ e React**
