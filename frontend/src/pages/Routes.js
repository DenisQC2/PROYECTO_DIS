// src/pages/Routes.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "../components/Layout";
import Home from "./Home";
import RecargaTarjeta from "./recarga-tarjeta";

function AppRoutes() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recarga-tarjeta" element={<RecargaTarjeta />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default AppRoutes;
