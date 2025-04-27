import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./pages/Login"; // Importa a página Login
import About from "./pages/About"; // Importa a página About
import "./Site.css";

function Site() {
  return (
    <Router>
      <nav>
        <ul style={{ display: "flex", gap: "1rem", listStyle: "none", padding: 0 }}>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/about">Sobre</Link></li>
        </ul>
      </nav>
      <Routes>
        {/* O conteúdo principal do site será exibido na rota "/" */}
        <Route
          path="/"
          element={
            <div className="site-container">
              <h1 className="title">Bem-vindo ao Meu Site</h1>
              <p>Este é o conteúdo principal da página inicial.</p>
            </div>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}

export default Site;