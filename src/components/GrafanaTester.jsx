import React, { useState, useEffect } from "react";
import GrafanaService from "../services/GrafanaService.js";
function GrafanaTester() {
  const [dashboards, setDashboards] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboards() {
      setLoading(true);
      const dashboards = await GrafanaService.fetchDashboards();
      setDashboards(dashboards);
      setLoading(false);
    }

    loadDashboards();
  }, []);

  if (loading) {
    return <div>Loading dashboards...</div>;
  }

  return (
    <div>
      <h1>Available Dashboards</h1>
      <ul>
        {dashboards.map((dashboard) => (
          <li key={dashboard.id}>
            <a
              href={`http://localhost:3000/d/${dashboard.uid}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {dashboard.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default GrafanaTester;
