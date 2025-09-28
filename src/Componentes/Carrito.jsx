import React, { useState, createContext, useContext } from 'react';
import "../Css/Estilo.css";
import "../Css/Estilo Carrito Compras.css";

const CarritoContext = createContext();

export const CarritoProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const agregarProducto = (producto) => {
    setCarrito(prevCarrito => {
      const productoExistente = prevCarrito.find(item => item.id === producto.id);
      
      if (productoExistente) {
        return prevCarrito.map(item =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      } else {
        return [...prevCarrito, { ...producto, cantidad: 1 }];
      }
    });
  };

  const quitarProducto = (id) => {
    setCarrito(prevCarrito => prevCarrito.filter(item => item.id !== id));
  };

  const actualizarCantidad = (id, nuevaCantidad) => {
    if (nuevaCantidad <= 0) {
      quitarProducto(id);
      return;
    }
    setCarrito(prevCarrito =>
      prevCarrito.map(item =>
        item.id === id ? { ...item, cantidad: nuevaCantidad } : item
      )
    );
  };

  const vaciarCarrito = () => {
    setCarrito([]);
  };

  const obtenerTotal = () => {
    return carrito.reduce((total, item) => {
      const precio = parseFloat(item.precio.replace(/[$.]/g, ''));
      return total + (precio * item.cantidad);
    }, 0);
  };

  const obtenerCantidadTotal = () => {
    return carrito.reduce((total, item) => total + item.cantidad, 0);
  };

  const toggleCarrito = () => {
    setIsOpen(!isOpen);
  };

  const value = {
    carrito,
    isOpen,
    agregarProducto,
    quitarProducto,
    actualizarCantidad,
    vaciarCarrito,
    obtenerTotal,
    obtenerCantidadTotal,
    toggleCarrito,
    setIsOpen
  };

  return (
    <CarritoContext.Provider value={value}>
      {children}
    </CarritoContext.Provider>
  );
};

export const useCarrito = () => {
  const context = useContext(CarritoContext);
  if (!context) {
    throw new Error('useCarrito debe ser usado dentro de CarritoProvider');
  }
  return context;
};

export const CarritoBoton = () => {
  const { toggleCarrito, obtenerCantidadTotal } = useCarrito();
  const cantidadTotal = obtenerCantidadTotal();

  return (
    <button 
      className="btn btn-outline-dark me-2 btn-carrito" 
      type="button" 
      title="Carrito de compras"
      onClick={toggleCarrito}
    >
      <i className="bi bi-bag"></i>
      {cantidadTotal > 0 && (
        <span className="carrito-badge">{cantidadTotal}</span>
      )}
    </button>
  );
};

const Carrito = () => {
  const {
    carrito,
    isOpen,
    quitarProducto,
    actualizarCantidad,
    vaciarCarrito,
    obtenerTotal,
    setIsOpen
  } = useCarrito();

  const formatearPrecio = (precio) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP'
    }).format(precio);
  };

  const handleCheckout = () => {
    if (carrito.length === 0) return;
    
    alert(`Procesando compra por ${formatearPrecio(obtenerTotal())}`);
    vaciarCarrito();
    setIsOpen(false);
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      setIsOpen(false);
    }
  };

  return (
    <>
      <div 
        className={`carrito-overlay ${isOpen ? 'activo' : ''}`}
        onClick={handleOverlayClick}
      />

      <div className={`carrito-panel ${isOpen ? 'activo' : ''}`}>
        <div className="carrito-header">
          <h3 className="carrito-title">Carrito de Compras</h3>
          <button 
            className="carrito-close"
            onClick={() => setIsOpen(false)}
            aria-label="Cerrar carrito"
          >
            <i className="bi bi-x"></i>
          </button>
        </div>

        <div className="carrito-contenido">
          {carrito.length === 0 ? (
            <div className="carrito-vacio">
              <i className="bi bi-bag"></i>
              <p>Tu carrito está vacío</p>
            </div>
          ) : (
            carrito.map((producto) => (
              <div key={producto.id} className="carrito-item">
                <img 
                  src={producto.imagen} 
                  alt={producto.nombre}
                  className="carrito-item-img"
                />
                
                <div className="carrito-item-info">
                  <p className="carrito-item-nombre">{producto.nombre}</p>
                  <p className="carrito-item-precio">{producto.precio}</p>
                </div>

                <div className="carrito-item-controles">
                  <div className="cantidad-controles">
                    <button 
                      className="cantidad-btn"
                      onClick={() => actualizarCantidad(producto.id, producto.cantidad - 1)}
                      disabled={producto.cantidad <= 1}
                    >
                      -
                    </button>
                    <span className="cantidad-display">{producto.cantidad}</span>
                    <button 
                      className="cantidad-btn"
                      onClick={() => actualizarCantidad(producto.id, producto.cantidad + 1)}
                    >
                      +
                    </button>
                  </div>
                  
                  <button 
                    className="eliminar-btn"
                    onClick={() => quitarProducto(producto.id)}
                    title="Eliminar producto"
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {carrito.length > 0 && (
          <div className="carrito-footer">
            <div className="carrito-total">
              <span className="carrito-total-label">Total:</span>
              <span className="carrito-total-precio">
                {formatearPrecio(obtenerTotal())}
              </span>
            </div>
            
            <div className="carrito-acciones">
              <button 
                className="btn btn-vaciar"
                onClick={vaciarCarrito}
              >
                Vaciar
              </button>
              <button 
                className="btn btn-primary"
                onClick={handleCheckout}
                style={{flex: 2}}
              >
                Finalizar Compra
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Carrito;