// src/Componentes/Navbar.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../Css/Estilo.css";

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="navbar navbar-expand-lg shadow-sm sticky-top custom-navbar">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img src="/Imagenes/Logo Vistalica.png" alt="Logo Vistalica" height="40" />
        </Link>
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#barraNavegacion"
          aria-controls="barraNavegacion" 
          aria-expanded="false" 
          aria-label="Mostrar/Ocultar navegación"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="barraNavegacion">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link 
                className={`nav-link ${location.pathname === '/' || location.pathname === '/inicio' ? 'active' : ''}`} 
                to="/"
              >
                Inicio
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                className={`nav-link ${location.pathname === '/catalogo' ? 'active' : ''}`}
                to="/catalogo"
              >
                Catálogo
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                className={`nav-link ${location.pathname === '/colecciones' ? 'active' : ''}`}
                to="/colecciones"
              >
                Colecciones
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                className={`nav-link ${location.pathname === '/impacto' ? 'active' : ''}`}
                to="/impacto"
              >
                Impacto
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                className={`nav-link ${location.pathname === '/contacto' ? 'active' : ''}`}
                to="/contacto"
              >
                Contacto
              </Link>
            </li>
          </ul>
          <form className="d-flex">
            <input 
              className="form-control me-2" 
              placeholder="Buscar productos..." 
              aria-label="Buscar"
            />
            <button className="btn btn-outline-success me-2" title="Buscar">
              <i className="bi bi-search"></i>
            </button>
            <button className="btn btn-outline-dark me-2" type="button" title="Carrito de compras">
              <i className="bi bi-bag"></i>
            </button>
            <Link to="/login" className="btn btn-outline-dark me-2" title="Usuario">
              <i className="bi bi-person"></i>
            </Link>         
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;