const API_URL = "/api"; // Utilizando o proxy definido em package.json
const API_TOKEN = "glsa_FmpHtSLFomri6m6qBJy1rdjXIhj5ZSjR_0c327926"; // Substitua 'your_api_token' pelo seu token real

class GrafanaService {
  static async fetchDashboards() {
    try {
      const response = await fetch(`${API_URL}/search`, {
        method: "GET",
        headers: {
          Authorization: API_TOKEN,
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching dashboards: ", error);
      return [];
    }
  }
}

export default GrafanaService;
