import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import "../Css/Estilo.css";

const Pedidos = () => {
  const { usuario, obtenerPedidosUsuario, cargando } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!cargando && !usuario) {
      navigate('/login');
    }
  }, [usuario, cargando, navigate]);

  if (cargando) {
    return <div className="text-center py-5">Cargando pedidos...</div>;
  }

  if (!usuario) return null;

  const pedidosUsuario = obtenerPedidosUsuario();

  const formatearFecha = (fecha) => {
    const date = new Date(fecha);
    return date.toLocaleDateString('es-CL', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatearPrecio = (precio) => {
    if (typeof precio === 'string') {
      precio = parseFloat(precio.replace(/[$.]/g, ''));
    }
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP'
    }).format(precio);
  };

  const getEstadoClass = (estado) => {
    switch(estado) {
      case 'Pendiente': return 'warning';
      case 'Enviado': return 'info';
      case 'Entregado': return 'success';
      case 'Cancelado': return 'danger';
      default: return 'secondary';
    }
  };

  return (
    <section className="container py-5">
      <div className="row">
        <div className="col-12">
          <h2 className="mb-4">Mis Pedidos</h2>

          {pedidosUsuario.length === 0 ? (
            <div className="text-center py-5">
              <i className="bi bi-inbox display-1 text-muted"></i>
              <h3 className="mt-3">No tienes pedidos aún</h3>
              <p className="text-muted">Explora nuestro catálogo y realiza tu primera compra</p>
              <button 
                className="btn btn-primary mt-3"
                onClick={() => navigate('/catalogo')}
              >
                <i className="bi bi-shop me-2"></i>
                Ir al Catálogo
              </button>
            </div>
          ) : (
            <div className="row g-4">
              {pedidosUsuario.map((pedido) => (
                <div key={pedido.id} className="col-12">
                  <div className="card shadow-sm">
                    <div className="card-header bg-light">
                      <div className="row align-items-center">
                        <div className="col-md-4">
                          <strong>Pedido #{pedido.id}</strong>
                        </div>
                        <div className="col-md-4">
                          <small className="text-muted">
                            <i className="bi bi-calendar me-1"></i>
                            {formatearFecha(pedido.fecha)}
                          </small>
                        </div>
                        <div className="col-md-4 text-md-end">
                          <span className={`badge bg-${getEstadoClass(pedido.estado)}`}>
                            {pedido.estado}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="card-body">
                      <h6 className="mb-3">Productos:</h6>
                      <div className="table-responsive">
                        <table className="table table-sm">
                          <thead>
                            <tr>
                              <th>Producto</th>
                              <th className="text-center">Cantidad</th>
                              <th className="text-end">Precio</th>
                            </tr>
                          </thead>
                          <tbody>
                            {pedido.productos.map((producto, index) => (
                              <tr key={index}>
                                <td>
                                  <div className="d-flex align-items-center">
                                    <img 
                                      src={producto.imagen} 
                                      alt={producto.nombre}
                                      style={{width: '50px', height: '50px', objectFit: 'cover'}}
                                      className="rounded me-2"
                                    />
                                    <span>{producto.nombre}</span>
                                  </div>
                                </td>
                                <td className="text-center">{producto.cantidad}</td>
                                <td className="text-end">{formatearPrecio(producto.precio)}</td>
                              </tr>
                            ))}
                          </tbody>
                          <tfoot>
                            <tr>
                              <td colSpan="2" className="text-end"><strong>Total:</strong></td>
                              <td className="text-end">
                                <strong>{formatearPrecio(pedido.total)}</strong>
                              </td>
                            </tr>
                          </tfoot>
                        </table>
                      </div>
                    </div>

                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Pedidos;