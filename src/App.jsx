import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import GrafanaTesterPage from "./pages/GrafanaTesterPage"; // Importe a nova página aqui

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/grafanaTest" element={<GrafanaTesterPage />} />{" "}
      </Routes>
    </Router>
  );
}

export default App;
