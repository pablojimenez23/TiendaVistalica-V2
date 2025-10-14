import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCarrito } from "./Carrito";
import "../Css/Estilo.css";

const DetalleProducto = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { agregarProducto, obtenerStock } = useCarrito();
  const [producto, setProducto] = useState(null);
  const [tallaSeleccionada, setTallaSeleccionada] = useState("");
  const [cantidad, setCantidad] = useState(1);
  
  const stockActual = producto ? obtenerStock(producto.id) : 0;

  const productosCompletos = {
    1: {
      id: 1,
      nombre: "Sweater Clásico",
      precio: "$25.000",
      imagen: "/Imagenes/Sweater Clasico.jpg",
      stock: 15,
      tallas: ['S', 'M', 'L', 'XL'],
      descripcion: "Sweater clásico de algodón premium, perfecto para cualquier ocasión. Diseño atemporal que combina comodidad y estilo.",
      material: "100% Algodón",
      cuidados: "Lavar a máquina con agua fría. No usar blanqueador.",
      categoria: "Sweater y Polerones"
    },
    2: {
      id: 2,
      nombre: "Polerón Deportivo",
      precio: "$28.000",
      imagen: "/Imagenes/Poleron Deportivo.jpg",
      stock: 0,
      tallas: ['M', 'L', 'XL'],
      descripcion: "Polerón deportivo con tecnología de absorción de humedad. Ideal para entrenamientos y actividades al aire libre.",
      material: "80% Poliéster, 20% Algodón",
      cuidados: "Lavar a máquina con colores similares.",
      categoria: "Sweater y Polerones"
    },
    3: {
      id: 3,
      nombre: "Sweater Moderno",
      precio: "$30.000",
      imagen: "/Imagenes/Sweater Moderno.jpg",
      stock: 8,
      tallas: ['S', 'M', 'L'],
      descripcion: "Sweater de diseño moderno con corte slim fit. Perfecto para looks casuales y elegantes.",
      material: "60% Algodón, 40% Poliéster",
      cuidados: "Lavar a mano con agua tibia.",
      categoria: "Sweater y Polerones"
    },
    4: {
      id: 4,
      nombre: "Pantalón Casual",
      precio: "$22.000",
      imagen: "/Imagenes/Pantalon Gucci.jpg",
      stock: 12,
      tallas: ['28', '30', '32', '34', '36'],
      descripcion: "Pantalón casual de corte recto, versátil y cómodo para el día a día.",
      material: "98% Algodón, 2% Elastano",
      cuidados: "Lavar a máquina con agua fría.",
      categoria: "Pantalones"
    },
    5: {
      id: 5,
      nombre: "Jeans Clásico",
      precio: "$26.000",
      imagen: "/Imagenes/Jeans Casuales Gucci.jpg",
      stock: 0,
      tallas: ['28', '30', '32', '34'],
      descripcion: "Jeans clásico de mezclilla resistente. Un básico imprescindible en tu guardarropa.",
      material: "100% Algodón Denim",
      cuidados: "Lavar con agua fría, secar al aire.",
      categoria: "Pantalones"
    },
    6: {
      id: 6,
      nombre: "Pantalón Formal",
      precio: "$32.000",
      imagen: "/Imagenes/Pantalon Formal Gucci.jpg",
      stock: 10,
      tallas: ['30', '32', '34', '36'],
      descripcion: "Pantalón formal de corte elegante, perfecto para ocasiones especiales.",
      material: "70% Lana, 30% Poliéster",
      cuidados: "Limpieza en seco recomendada.",
      categoria: "Pantalones"
    },
    7: {
      id: 7,
      nombre: "Vestido Casual",
      precio: "$35.000",
      imagen: "/Imagenes/Vestido Casual.jpg",
      stock: 6,
      tallas: ['XS', 'S', 'M', 'L'],
      descripcion: "Vestido casual ligero y fresco, ideal para el día a día.",
      material: "100% Viscosa",
      cuidados: "Lavar a mano con agua fría.",
      categoria: "Vestidos"
    },
    8: {
      id: 8,
      nombre: "Vestido de Noche",
      precio: "$50.000",
      imagen: "/Imagenes/Vestido Nocturno.jpg",
      stock: 0,
      tallas: ['S', 'M', 'L'],
      descripcion: "Vestido elegante para eventos nocturnos. Diseño sofisticado y atemporal.",
      material: "95% Poliéster, 5% Elastano",
      cuidados: "Limpieza en seco únicamente.",
      categoria: "Vestidos"
    },
    9: {
      id: 9,
      nombre: "Vestido Verano",
      precio: "$38.000",
      imagen: "/Imagenes/Vestido Verano.jpg",
      stock: 9,
      tallas: ['XS', 'S', 'M'],
      descripcion: "Vestido veraniego con estampados florales. Perfecto para días soleados.",
      material: "100% Algodón",
      cuidados: "Lavar a máquina con agua tibia.",
      categoria: "Vestidos"
    },
    10: {
      id: 10,
      nombre: "Zapatilla Urbana",
      precio: "$40.000",
      imagen: "/Imagenes/Zapatillas Urbanas VC.jpg",
      stock: 14,
      tallas: ['37', '38', '39', '40', '41', '42'],
      descripcion: "Zapatilla urbana con diseño moderno. Comodidad y estilo en cada paso.",
      material: "Cuero sintético y textil",
      cuidados: "Limpiar con paño húmedo.",
      categoria: "Zapatillas"
    },
    11: {
      id: 11,
      nombre: "Zapatilla Deportiva",
      precio: "$42.000",
      imagen: "/Imagenes/Zapatillas Deportivas BC.jpg",
      stock: 0,
      tallas: ['38', '39', '40', '41', '42', '43'],
      descripcion: "Zapatilla deportiva con tecnología de amortiguación avanzada.",
      material: "Mesh transpirable y suela de goma",
      cuidados: "Lavar a mano, secar al aire.",
      categoria: "Zapatillas"
    },
    12: {
      id: 12,
      nombre: "Zapatilla Running",
      precio: "$45.000",
      imagen: "/Imagenes/Zapatilla running BC.jpg",
      stock: 11,
      tallas: ['38', '39', '40', '41', '42'],
      descripcion: "Zapatilla especializada para running con excelente tracción.",
      material: "Textil técnico y suela de caucho",
      cuidados: "Limpiar con agua y jabón suave.",
      categoria: "Zapatillas"
    },
    13: {
      id: 13,
      nombre: "Cartera Clásica",
      precio: "$28.000",
      imagen: "/Imagenes/Prada Cartera.jpg",
      stock: 7,
      tallas: ['Única'],
      descripcion: "Cartera clásica con múltiples compartimentos. Elegancia y funcionalidad.",
      material: "Cuero sintético de alta calidad",
      cuidados: "Limpiar con paño seco.",
      categoria: "Carteras"
    },
    14: {
      id: 14,
      nombre: "Cartera de Mano",
      precio: "$30.000",
      imagen: "/Imagenes/CarteraMano Prada.jpg",
      stock: 0,
      tallas: ['Única'],
      descripcion: "Cartera de mano compacta, perfecta para eventos especiales.",
      material: "Cuero genuino",
      cuidados: "Aplicar crema para cuero regularmente.",
      categoria: "Carteras"
    },
    15: {
      id: 15,
      nombre: "Cartera Elegante",
      precio: "$33.000",
      imagen: "/Imagenes/Cartera Elegante Prada.jpg",
      stock: 5,
      tallas: ['Única'],
      descripcion: "Cartera elegante con acabados premium. Diseño sofisticado.",
      material: "Cuero italiano",
      cuidados: "Evitar contacto con agua.",
      categoria: "Carteras"
    },
    16: {
      id: 16,
      nombre: "Collar Minimalista",
      precio: "$15.000",
      imagen: "/Imagenes/Collar Versace.jpg",
      stock: 20,
      tallas: ['Única'],
      descripcion: "Collar minimalista de diseño elegante. Complemento perfecto para cualquier outfit.",
      material: "Acero inoxidable con baño de plata",
      cuidados: "Evitar contacto con perfumes y agua.",
      categoria: "Accesorios"
    },
    17: {
      id: 17,
      nombre: "Pulsera de Cuero",
      precio: "$12.000",
      imagen: "/Imagenes/Pulsera Cuero Versace.jpg",
      stock: 0,
      tallas: ['Única'],
      descripcion: "Pulsera de cuero genuino con detalles metálicos. Estilo casual y moderno.",
      material: "Cuero genuino y acero",
      cuidados: "Limpiar con paño seco.",
      categoria: "Accesorios"
    },
    18: {
      id: 18,
      nombre: "Aros Plateados",
      precio: "$18.000",
      imagen: "/Imagenes/Aros Plateados versace.jfif",
      stock: 15,
      tallas: ['Única'],
      descripcion: "Aros plateados con diseño clásico. Elegancia atemporal.",
      material: "Plata 925",
      cuidados: "Guardar en estuche cuando no se usen.",
      categoria: "Accesorios"
    }
  };

  useEffect(() => {
    const productoEncontrado = productosCompletos[parseInt(id)];
    if (productoEncontrado) {
      setProducto(productoEncontrado);
      if (productoEncontrado.tallas && productoEncontrado.tallas.length > 0) {
        setTallaSeleccionada(productoEncontrado.tallas[0]);
      }
    } else {
      navigate('/catalogo');
    }
  }, [id, navigate]);

  const handleAgregarCarrito = () => {
    if (stockActual > 0 && cantidad <= stockActual) {
      for (let i = 0; i < cantidad; i++) {
        agregarProducto(producto);
      }
      descontarStock(producto.id, cantidad);
      alert(`${cantidad} ${producto.nombre}(s) agregado(s) al carrito`);
      setCantidad(1);
    }
  };

  const handleCantidadChange = (tipo) => {
    if (tipo === 'incrementar' && cantidad < stockActual) {
      setCantidad(cantidad + 1);
    } else if (tipo === 'decrementar' && cantidad > 1) {
      setCantidad(cantidad - 1);
    }
  };

  if (!producto) {
    return (
      <div className="container py-5 text-center">
        <p>Cargando producto...</p>
      </div>
    );
  }

  return (
    <section className="container py-5">
      <button 
        className="btn btn-outline-secondary mb-4"
        onClick={() => navigate('/catalogo')}
      >
        <i className="bi bi-arrow-left me-2"></i>
        Volver al Catálogo
      </button>

      <div className="row">
        {/*Imagen del producto*/}
        <div className="col-md-6">
          <div className="card">
            <img 
              src={producto.imagen} 
              className="card-img-top" 
              alt={producto.nombre}
              style={{ height: '500px', objectFit: 'cover' }}
            />
          </div>
        </div>

        {/*Informacion del producto*/}
        <div className="col-md-6">
          <h1 className="mb-3">{producto.nombre}</h1>
          <h2 className="text-primary mb-4">{producto.precio}</h2>

          {/* Estado de stock (sin mostrar cantidad) */}
          <div className="mb-4">
            {stockActual > 0 ? (
              <span className="badge bg-success fs-6">
                <i className="bi bi-check-circle me-1"></i>
                Disponible
              </span>
            ) : (
              <span className="badge bg-danger fs-6">
                <i className="bi bi-x-circle me-1"></i>
                Sin stock
              </span>
            )}
          </div>

          {/*Descripcion*/}
          <div className="mb-4">
            <h5>Descripción</h5>
            <p className="text-muted">{producto.descripcion}</p>
          </div>

          {/*Tallas disponibles*/}
          {producto.tallas && producto.tallas.length > 0 && (
            <div className="mb-4">
              <h5>Talla</h5>
              <div className="d-flex flex-wrap gap-2">
                {producto.tallas.map((talla) => (
                  <button
                    key={talla}
                    className={`btn ${tallaSeleccionada === talla ? 'btn-primary' : 'btn-outline-primary'}`}
                    onClick={() => setTallaSeleccionada(talla)}
                    disabled={stockActual === 0}
                  >
                    {talla}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Cantidad*/}
          {stockActual > 0 && (
            <div className="mb-4">
              <h5>Cantidad</h5>
              <div className="d-flex align-items-center gap-3">
                <button 
                  className="btn btn-outline-secondary"
                  onClick={() => handleCantidadChange('decrementar')}
                  disabled={cantidad <= 1}
                >
                  <i className="bi bi-dash"></i>
                </button>
                <span className="fs-5 fw-bold">{cantidad}</span>
                <button 
                  className="btn btn-outline-secondary"
                  onClick={() => handleCantidadChange('incrementar')}
                  disabled={cantidad >= stockActual}
                >
                  <i className="bi bi-plus"></i>
                </button>
              </div>
            </div>
          )}

          {/*Agregar al carrito*/}
          <div className="mb-4">
            <button 
              className={`btn ${stockActual > 0 ? 'btn-primary' : 'btn-secondary'} w-100 py-3`}
              onClick={handleAgregarCarrito}
              disabled={stockActual === 0}
            >
              <i className="bi bi-cart-plus me-2"></i>
              {stockActual > 0 ? 'Agregar al Carrito' : 'Sin Stock'}
            </button>
          </div>

          {/* Detalles adicionales */}
          <div className="card bg-light">
            <div className="card-body">
              <h5 className="card-title">Detalles del Producto</h5>
              <ul className="list-unstyled mb-0">
                <li className="mb-2">
                  <i className="bi bi-tag me-2 text-primary"></i>
                  <strong>Material:</strong> {producto.material}
                </li>
                <li className="mb-2">
                  <i className="bi bi-info-circle me-2 text-primary"></i>
                  <strong>Categoría:</strong> {producto.categoria}
                </li>
                <li>
                  <i className="bi bi-droplet me-2 text-primary"></i>
                  <strong>Cuidados:</strong> {producto.cuidados}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DetalleProducto;