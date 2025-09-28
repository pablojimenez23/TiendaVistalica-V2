import React from "react";
import { Carousel } from 'react-bootstrap';
import "../Css/Estilo.css";

const Categorias = () => {
  return (
    <section className="py-5 bg-light">
      <div className="container">
        <h2 className="text-center mb-4">Categorías de Productos</h2>
        <Carousel id="carouselCategorias" interval={3000} controls={false} indicators={false}>
          {/* Primer slide */}
          <Carousel.Item>
            <div className="row justify-content-center">
              <div className="col-12 col-md-4 d-flex justify-content-center mb-4 mb-md-0">
                <div className="card categoria-card">
                  <img src="/Imagenes/Imagen Sweater.jpg" className="card-img-top" alt="Sweaters y polerones" />
                  <div className="card-body text-center">
                    <h5>Sweaters y polerones</h5>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-4 d-flex justify-content-center mb-4 mb-md-0">
                <div className="card categoria-card">
                  <img src="/Imagenes/Jeans Urbanos.jpg" className="card-img-top" alt="Pantalones" />
                  <div className="card-body text-center">
                    <h5>Pantalones</h5>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-4 d-flex justify-content-center">
                <div className="card categoria-card">
                  <img src="/Imagenes/Bolsos y carteras.jpg" className="card-img-top" alt="Bolsos y carteras" />
                  <div className="card-body text-center">
                    <h5>Bolsos y carteras</h5>
                  </div>
                </div>
              </div>
            </div>
          </Carousel.Item>

          {/* Segundo slide */}
          <Carousel.Item>
            <div className="row justify-content-center">
              <div className="col-12 col-md-4 d-flex justify-content-center mb-4 mb-md-0">
                <div className="card categoria-card">
                  <img src="/Imagenes/Vestidos.jpg" className="card-img-top" alt="Vestidos" />
                  <div className="card-body text-center">
                    <h5>Vestidos</h5>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-4 d-flex justify-content-center mb-4 mb-md-0">
                <div className="card categoria-card">
                  <img src="/Imagenes/Zapatos Gucci.jpg" className="card-img-top" alt="Zapatos" />
                  <div className="card-body text-center">
                    <h5>Zapatos</h5>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-4 d-flex justify-content-center">
                <div className="card categoria-card">
                  <img src="/Imagenes/Imagen Accesorios.jpg" className="card-img-top" alt="Accesorios" />
                  <div className="card-body text-center">
                    <h5>Accesorios</h5>
                  </div>
                </div>
              </div>
            </div>
          </Carousel.Item>
        </Carousel>
      </div>
    </section>
  );
};

export default Categorias;