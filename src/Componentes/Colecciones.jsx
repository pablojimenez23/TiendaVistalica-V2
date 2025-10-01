import React, { useState } from "react";
import "../Css/Estilo.css";
import "../Css/Estilo Catalogo.css";

const Colecciones = () => {
  const [marcaActiva, setMarcaActiva] = useState('todos');

  const botonesMarca = [
    { marca: 'todos', label: 'Todos' },
    { marca: 'louis-vuitton', label: 'Louis Vuitton' },
    { marca: 'gucci', label: 'Gucci' },
    { marca: 'armani', label: 'Armani' },
    { marca: 'balenciaga', label: 'Balenciaga' },
    { marca: 'prada', label: 'Prada' },
    { marca: 'versace', label: 'Versace' }
  ];

  const productosPorMarca = {
    'louis-vuitton': [
      { 
        id: 1, 
        nombre: "Sweater Clásico", 
        precio: "$25.000", 
        imagen: "/Imagenes/Poleron D LV.webp", 
        stock: true 
      },
      { 
        id: 2, 
        nombre: "Polerón Deportivo", 
        precio: "$28.000", 
        imagen: "/Imagenes/Poleron LV.jpg", 
        stock: false 
      },
      { 
        id: 3, 
        nombre: "Camisa Moderna", 
        precio: "$30.000", 
        imagen: "/Imagenes/Camisa LV.jpg", 
        stock: true 
      }
    ],
    'gucci': [
      { 
        id: 4, 
        nombre: "Pantalón Casual", 
        precio: "$22.000", 
        imagen: "/Imagenes/Pantalon Gucci.jpg", 
        stock: true 
      },
      { 
        id: 5, 
        nombre: "Jeans Clásico", 
        precio: "$26.000", 
        imagen: "/Imagenes/Jeans Casuales Gucci.jpg", 
        stock: false 
      },
      { 
        id: 6, 
        nombre: "Pantalón Formal", 
        precio: "$32.000", 
        imagen: "/Imagenes/Pantalon Formal Gucci.jpg", 
        stock: true 
      }
    ],
    'armani': [
      { 
        id: 7, 
        nombre: "Vestido Casual", 
        precio: "$35.000", 
        imagen: "/Imagenes/Vestido Casual.jpg", 
        stock: true 
      },
      { 
        id: 8, 
        nombre: "Vestido de Noche", 
        precio: "$50.000", 
        imagen: "/Imagenes/Vestido Nocturno.jpg", 
        stock: false 
      },
      { 
        id: 9, 
        nombre: "Vestido Verano", 
        precio: "$38.000", 
        imagen: "/Imagenes/Vestido Verano.jpg", 
        stock: true 
      }
    ],
    'balenciaga': [
      { 
        id: 10, 
        nombre: "Zapatilla Urbana", 
        precio: "$40.000", 
        imagen: "/Imagenes/Zapatillas Urbanas VC.jpg", 
        stock: true 
      },
      { 
        id: 11, 
        nombre: "Zapatilla Deportiva", 
        precio: "$42.000", 
        imagen: "/Imagenes/Zapatillas Deportivas BC.jpg", 
        stock: false 
      },
      { 
        id: 12, 
        nombre: "Zapatilla Running", 
        precio: "$45.000", 
        imagen: "/Imagenes/Zapatilla running BC.jpg", 
        stock: true 
      }
    ],
    'prada': [
      { 
        id: 13, 
        nombre: "Cartera Clásica", 
        precio: "$28.000", 
        imagen: "/Imagenes/Prada Cartera.jpg", 
        stock: true 
      },
      { 
        id: 14, 
        nombre: "Cartera de Mano", 
        precio: "$30.000", 
        imagen: "/Imagenes/CarteraMano Prada.jpg", 
        stock: false 
      },
      { 
        id: 15, 
        nombre: "Cartera Elegante", 
        precio: "$33.000", 
        imagen: "/Imagenes/Cartera Elegante Prada.jpg", 
        stock: true 
      }
    ],
    'versace': [
      { 
        id: 16, 
        nombre: "Collar Minimalista", 
        precio: "$15.000", 
        imagen: "/Imagenes/Collar Versace.jpg", 
        stock: true 
      },
      { 
        id: 17, 
        nombre: "Pulsera de Cuero", 
        precio: "$12.000", 
        imagen: "/Imagenes/Pulsera Cuero Versace.jpg", 
        stock: false 
      },
      { 
        id: 18, 
        nombre: "Aros Plateados", 
        precio: "$18.000", 
        imagen: "/Imagenes/Aros Plateados versace.jfif", 
        stock: true 
      }
    ]
  };

  const handleFiltroMarca = (marca) => {
    setMarcaActiva(marca);
  };

  const getProductosFiltrados = () => {
    if (marcaActiva === 'todos') {
      return Object.entries(productosPorMarca).flatMap(([marca, items]) => 
        items.map(item => ({ ...item, marca }))
      );
    }
    return productosPorMarca[marcaActiva]?.map(item => ({ ...item, marca: marcaActiva })) || [];
  };

  const ProductCard = ({ producto }) => (
    <div className="col-md-4" key={producto.id}>
      <div className="card">
        <img 
          src={producto.imagen} 
          className="card-img-top" 
          alt={producto.nombre}
        />
        <div className="card-body text-center">
          <h5 className="card-title">{producto.nombre}</h5>
          <p className="card-text">{producto.precio}</p>
          <button 
            className={`btn ${producto.stock ? 'btn-primary' : 'btn-sin-stock'}`}
            disabled={!producto.stock}
          >
            {producto.stock ? 'Agregar al carrito' : 'Sin stock'}
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <section className="container py-5 colecciones">
      <h2 className="section-title">Colecciones</h2>
      <p className="catalogo-intro text-center">
        Explora nuestra selección de ropa, calzado y accesorios pensados para acompañar tu estilo en cada ocasión.
      </p>

      {/* Filtro por marcas */}
      <div className="text-center mb-4">
        {botonesMarca.map((boton) => (
          <button 
            key={boton.marca}
            className={`btn btn-outline-primary filtro-marca-btn ${marcaActiva === boton.marca ? 'active' : ''}`}
            onClick={() => handleFiltroMarca(boton.marca)}
          >
            {boton.label}
          </button>
        ))}
      </div>

      {/* Productos */}
      <div className="row g-4 mb-4">
        {getProductosFiltrados().map((producto) => (
          <ProductCard key={producto.id} producto={producto} />
        ))}
      </div>

      {/* Mensaje cuando no hay productos o stock */}
      {getProductosFiltrados().length === 0 && (
        <div className="text-center py-5">
          <p className="text-muted">No hay productos disponibles para esta marca.</p>
        </div>
      )}
    </section>
  );
};

export default Colecciones;