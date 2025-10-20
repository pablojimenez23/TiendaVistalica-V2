import React, { useState, createContext, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "../Css/Estilo.css";
import "../Css/Estilo Carrito Compras.css";
import { useAuth } from "./AuthContext";

const CarritoContext = createContext();


const stockInicial = {
  1: 15, 2: 0, 3: 8, 4: 12, 5: 0, 6: 10,
  7: 6, 8: 0, 9: 9, 10: 14, 11: 0, 12: 11,
  13: 7, 14: 0, 15: 5, 16: 20, 17: 0, 18: 15
};

export const CarritoProvider = ({ children }) => {
  const [carrito, setCarrito] = useState(() => {
    const guardado = localStorage.getItem('carrito');
    return guardado ? JSON.parse(guardado) : [];
  });
  
  const [stocks, setStocks] = useState(() => {
    const stockGuardado = sessionStorage.getItem('stocks');
    return stockGuardado ? JSON.parse(stockGuardado) : stockInicial;
  });
  
  const [isOpen, setIsOpen] = useState(false);

  // Guardar carrito en local Storage
  useEffect(() => {
    localStorage.setItem('carrito', JSON.stringify(carrito));
  }, [carrito]);

  useEffect(() => {
    sessionStorage.setItem('stocks', JSON.stringify(stocks));
  }, [stocks]);

  const agregarProducto = (producto) => {
    if (stocks[producto.id] <= 0) {
      alert('Producto sin stock');
      return;
    }

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

    // Reducir stock
    setStocks(prev => ({
      ...prev,
      [producto.id]: prev[producto.id] - 1
    }));
  };

  const quitarProducto = (id) => {
    const producto = carrito.find(item => item.id === id);
    if (producto) {
      // Restaurar stock
      setStocks(prev => ({
        ...prev,
        [id]: prev[id] + producto.cantidad
      }));
    }
    setCarrito(prevCarrito => prevCarrito.filter(item => item.id !== id));
  };

  const actualizarCantidad = (id, nuevaCantidad) => {
    const producto = carrito.find(item => item.id === id);
    if (!producto) return;

    const diferencia = nuevaCantidad - producto.cantidad;

    if (diferencia > 0) {
      if (stocks[id] < diferencia) {
        alert('No hay suficiente stock disponible');
        return;
      }
      setStocks(prev => ({
        ...prev,
        [id]: prev[id] - diferencia
      }));
    } else if (diferencia < 0) {
      setStocks(prev => ({
        ...prev,
        [id]: prev[id] - diferencia
      }));
    }

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
    // Restaurar todo el stock
    carrito.forEach(item => {
      setStocks(prev => ({
        ...prev,
        [item.id]: prev[item.id] + item.cantidad
      }));
    });
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

  const obtenerStock = (productoId) => {
    return stocks[productoId] || 0;
  };

  const tieneStock = (productoId) => {
    return stocks[productoId] > 0;
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
    setIsOpen,
    obtenerStock,
    tieneStock,
    stocks
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


  const { usuario, agregarPedido } = useAuth();
  const navigate = useNavigate();

  const formatearPrecio = (precio) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP'
    }).format(precio);
  };

  const handleCheckout = () => {
    if (carrito.length === 0) return;

    if (!usuario) {
      alert('Debes iniciar sesión para poder finalizar tu compra');
      setIsOpen(false);
      navigate('/login');
      return;
    }

    agregarPedido(carrito, obtenerTotal());
    
    alert(`Procesando compra por ${formatearPrecio(obtenerTotal())}`);
    vaciarCarrito();
    setIsOpen(false);
    navigate('/pedidos');
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
                onClick={vaciarCarrito}>
                Vaciar
              </button>
              <button 
                className="btn btn-primary"
                onClick={handleCheckout}
                style={{flex: 2}}>
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