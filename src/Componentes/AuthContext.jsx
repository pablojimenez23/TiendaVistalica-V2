import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const usuarioGuardado = localStorage.getItem('usuarioActivo');
    if (usuarioGuardado) {
      setUsuario(JSON.parse(usuarioGuardado));
    } else {
      setUsuario(null);
    }
    setCargando(false);
  }, []);

  // Función para iniciar sesion
  const iniciarSesion = (datosUsuario) => {
    setUsuario(datosUsuario);
    localStorage.setItem('usuarioActivo', JSON.stringify(datosUsuario));
  };

  // Función para cerrar sesion
  const cerrarSesion = () => {
    setUsuario(null);
    localStorage.removeItem('usuarioActivo');
  };

  // Funcion para verificar si el usuario esta autenticado
  const estaAutenticado = () => {
    return usuario !== null;
  };

  return (
    <AuthContext.Provider value={{ 
      usuario, 
      setUsuario, 
      iniciarSesion, 
      cerrarSesion, 
      estaAutenticado,
      cargando 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);