import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);
  
  // Cargar pedidos desde el local storage
  const [pedidos, setPedidos] = useState(() => {
    const pedidosGuardados = localStorage.getItem('pedidos');
    return pedidosGuardados ? JSON.parse(pedidosGuardados) : [];
  });

  // Cargar usuario al iniciar
  useEffect(() => {
    const usuarioGuardado = localStorage.getItem('usuarioActivo');
    if (usuarioGuardado) {
      setUsuario(JSON.parse(usuarioGuardado));
    } else {
      setUsuario(null);
    }
    setCargando(false);
  }, []);

  // Guardar pedidos en local storage
  useEffect(() => {
    localStorage.setItem('pedidos', JSON.stringify(pedidos));
  }, [pedidos]);

  const iniciarSesion = (datosUsuario) => {
    setUsuario(datosUsuario);
    localStorage.setItem('usuarioActivo', JSON.stringify(datosUsuario));
  };

  const cerrarSesion = () => {
    setUsuario(null);
    localStorage.removeItem('usuarioActivo');
  };

  const estaAutenticado = () => {
    return usuario !== null;
  };

  // Crear nuevo pedido
  const agregarPedido = (carrito, total) => {
    const nuevoPedido = {
      id: Date.now(),
      usuarioId: usuario?.id,
      fecha: new Date().toISOString(),
      productos: carrito,
      total: total,
      estado: 'Pendiente'
    };
    setPedidos(prev => [...prev, nuevoPedido]);
    return nuevoPedido;
  };

  // Obtener pedidos del usuario actual
  const obtenerPedidosUsuario = () => {
    if (!usuario) return [];
    return pedidos.filter(pedido => pedido.usuarioId === usuario.id);
  };

  return (
    <AuthContext.Provider value={{ 
      usuario, 
      setUsuario, 
      iniciarSesion, 
      cerrarSesion, 
      estaAutenticado,
      cargando,
      pedidos,
      agregarPedido,
      obtenerPedidosUsuario
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);