import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCarrito } from "./Carrito";
import "../Css/Estilo Catalogo.css";

const Catalogo = () => {
  const navigate = useNavigate();
  const [categoriaActiva, setCategoriaActiva] = useState('todos');
  const { agregarProducto, tieneStock } = useCarrito();

  const botonesFiltro = [
    { categoria: 'todos', label: 'Todos' },
    { categoria: 'sweater', label: 'Sweater y Polerones' },
    { categoria: 'pantalones', label: 'Pantalones' },
    { categoria: 'vestidos', label: 'Vestidos' },
    { categoria: 'zapatillas', label: 'Zapatillas' },
    { categoria: 'carteras', label: 'Carteras' },
    { categoria: 'accesorios', label: 'Accesorios' }
  ];

  const productos = {
    sweater: [
      { 
        id: 1, 
        nombre: "Sweater Clásico", 
        precio: "$25.000", 
        imagen: "/Imagenes/Sweater Clasico.jpg"
      },
      { 
        id: 2, 
        nombre: "Polerón Deportivo", 
        precio: "$28.000", 
        imagen: "/Imagenes/Poleron Deportivo.jpg"
      },
      { 
        id: 3, 
        nombre: "Sweater Moderno", 
        precio: "$30.000", 
        imagen: "/Imagenes/Sweater Moderno.jpg"
      }
    ],
    pantalones: [
      { 
        id: 4, 
        nombre: "Pantalón Casual", 
        precio: "$22.000", 
        imagen: "/Imagenes/Pantalon Gucci.jpg"
      },
      { 
        id: 5, 
        nombre: "Jeans Clásico", 
        precio: "$26.000", 
        imagen: "/Imagenes/Jeans Casuales Gucci.jpg"
      },
      { 
        id: 6, 
        nombre: "Pantalón Formal", 
        precio: "$32.000", 
        imagen: "/Imagenes/Pantalon Formal Gucci.jpg"
      }
    ],
    vestidos: [
      { 
        id: 7, 
        nombre: "Vestido Casual", 
        precio: "$35.000", 
        imagen: "/Imagenes/Vestido Casual.jpg"
      },
      { 
        id: 8, 
        nombre: "Vestido de Noche", 
        precio: "$50.000", 
        imagen: "/Imagenes/Vestido Nocturno.jpg"
      },
      { 
        id: 9, 
        nombre: "Vestido Verano", 
        precio: "$38.000", 
        imagen: "/Imagenes/Vestido Verano.jpg"
      }
    ],
    zapatillas: [
      { 
        id: 10, 
        nombre: "Zapatilla Urbana", 
        precio: "$40.000", 
        imagen: "/Imagenes/Zapatillas Urbanas VC.jpg"
      },
      { 
        id: 11, 
        nombre: "Zapatilla Deportiva", 
        precio: "$42.000", 
        imagen: "/Imagenes/Zapatillas Deportivas BC.jpg"
      },
      { 
        id: 12, 
        nombre: "Zapatilla Running", 
        precio: "$45.000", 
        imagen: "/Imagenes/Zapatilla running BC.jpg"
      }
    ],
    carteras: [
      { 
        id: 13, 
        nombre: "Cartera Clásica", 
        precio: "$28.000", 
        imagen: "/Imagenes/Prada Cartera.jpg"
      },
      { 
        id: 14, 
        nombre: "Cartera de Mano", 
        precio: "$30.000", 
        imagen: "/Imagenes/CarteraMano Prada.jpg"
      },
      { 
        id: 15, 
        nombre: "Cartera Elegante", 
        precio: "$33.000", 
        imagen: "/Imagenes/Cartera Elegante Prada.jpg"
      }
    ],
    accesorios: [
      { 
        id: 16, 
        nombre: "Collar Minimalista", 
        precio: "$15.000", 
        imagen: "/Imagenes/Collar Versace.jpg"
      },
      { 
        id: 17, 
        nombre: "Pulsera de Cuero", 
        precio: "$12.000", 
        imagen: "/Imagenes/Pulsera Cuero Versace.jpg"
      },
      { 
        id: 18, 
        nombre: "Aros Plateados", 
        precio: "$18.000", 
        imagen: "/Imagenes/Aros Plateados versace.jfif"
      }
    ]
  };

  const handleFiltro = (categoria) => {
    setCategoriaActiva(categoria);
  };

  const getProductosFiltrados = () => {
    if (categoriaActiva === 'todos') {
      return Object.entries(productos).flatMap(([categoria, items]) => 
        items.map(item => ({ ...item, categoria }))
      );
    }
    return productos[categoriaActiva]?.map(item => ({ ...item, categoria: categoriaActiva })) || [];
  };

  const handleVerDetalle = (producto) => {
    navigate(`/producto/${producto.id}`);
  };

  const ProductCard = ({ producto }) => {
    const hayStock = tieneStock(producto.id);
    
    return (
      <div className="col-md-4" key={producto.id}>
        <div className="card" style={{ cursor: 'pointer' }}>
          <div onClick={() => handleVerDetalle(producto)}>
            <img 
              src={producto.imagen} 
              className="card-img-top" 
              alt={producto.nombre}
            />
            <div className="card-body text-center">
              <h5 className="card-title">{producto.nombre}</h5>
              <p className="card-text">{producto.precio}</p>
            </div>
          </div>
          <div className="card-body text-center" style={{ paddingTop: 0 }}>
            <button 
              className={`btn ${hayStock ? 'btn-primary' : 'btn-sin-stock'}`}
              disabled={!hayStock}
              onClick={(e) => {
                e.stopPropagation();
                if (hayStock) {
                  agregarProducto(producto);
                }
              }}
            >
              {hayStock ? 'Agregar al carrito' : 'Sin stock'}
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section className="container py-5 catalogo">
      <h2 className="section-title text-center">Catálogo de Productos</h2>
      <p className="catalogo-intro text-center">
        Explora nuestra selección de ropa, calzado y accesorios pensados para acompañar tu estilo en cada ocasión.
      </p>

      {/*Filtro categorias*/}
      <div className="text-center mb-4">
        {botonesFiltro.map((boton) => (
          <button 
            key={boton.categoria}
            className={`btn btn-outline-primary filtro-btn ${categoriaActiva === boton.categoria ? 'active' : ''}`}
            onClick={() => handleFiltro(boton.categoria)}
          >
            {boton.label}
          </button>
        ))}
      </div>

      {/*Productos*/}
      <div className="row g-4 mb-4">
        {getProductosFiltrados().map((producto) => (
          <ProductCard key={producto.id} producto={producto} />
        ))}
      </div>

      {/*Mensaje cuando no hay productos*/}
      {getProductosFiltrados().length === 0 && (
        <div className="text-center py-5">
          <p className="text-muted">No hay productos disponibles en esta categoría.</p>
        </div>
      )}
    </section>
  );
};

export default Catalogo;