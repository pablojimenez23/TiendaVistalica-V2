import React from "react";
import { Link } from "react-router-dom";
import "../Css/Estilo.css";

const ProductosTemporada = () => {
  return (
    <section className="py-5 bg-light">
      <div className="container">
        <h2 className="text-center mb-4">Ofertas de temporada</h2>
        <div className="row g-4">
          <div className="col-md-4">
            <div className="card h-100 shadow-sm">
              <img 
                src="/Imagenes/Camisa de lujo negra.jpg" 
                className="Camisa" 
                alt="Camisa Clásica" 
              />
              <div className="card-body text-center">
                <h5 className="card-title">Camisa Clásica</h5>
                <div className="d-flex justify-content-center align-items-center gap-2">
                  <p className="card-text text-primary fw-bold mb-0">$24.990</p>
                  <p className="card-text old-price mb-0">$34.990</p>
                </div>
                <Link to="/catalogo" className="btn btn-primary mt-3">Ver más</Link>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card h-100 shadow-sm">
              <img 
                src="/Imagenes/Chaqueta Urbana.png" 
                className="Chaqueta" 
                alt="Chaqueta Moderna" 
              />
              <div className="card-body text-center">
                <h5 className="card-title">Chaqueta Moderna</h5>
                <div className="d-flex justify-content-center align-items-center gap-2">
                  <p className="card-text text-primary fw-bold mb-0">$39.990</p>
                  <p className="card-text old-price mb-0">$59.990</p>
                </div>
                <Link to="/catalogo" className="btn btn-primary mt-3">Ver más</Link>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card h-100 shadow-sm">
              <img 
                src="/Imagenes/Jeans Negros.png" 
                className="Jeans" 
                alt="Jeans Premium" 
              />
              <div className="card-body text-center">
                <h5 className="card-title">Jeans Premium</h5>
                <div className="d-flex justify-content-center align-items-center gap-2">
                  <p className="card-text text-primary fw-bold mb-0">$29.990</p>
                  <p className="card-text old-price mb-0">$39.990</p>
                </div>
                <Link to="/catalogo" className="btn btn-primary mt-3">Ver más</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductosTemporada;