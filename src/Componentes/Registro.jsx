import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "./AuthContext";
import "../Css/Estilo.css";

const Registro = () => {
  const navigate = useNavigate();
  const { iniciarSesion } = useAuth();
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    genero: '',
    correo: '',
    password: '',
    passwordConfirm: ''
  });
  const [errors, setErrors] = useState({});

  // Validar nombre 
  const validarNombre = (value) => {
    const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
    if (value.trim() === '') {
      return 'El nombre es obligatorio.';
    } else if (!regex.test(value.trim())) {
      return 'El nombre solo puede contener letras y espacios.';
    }
    return '';
  };

  // Validar apellido
  const validarApellido = (value) => {
    const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
    if (value.trim() === '') {
      return 'El apellido es obligatorio.';
    } else if (!regex.test(value.trim())) {
      return 'El apellido solo puede contener letras y espacios.';
    }
    return '';
  };

  // Validar genero
  const validarGenero = (value) => {
    if (value === '' || value === null) {
      return 'Por favor, selecciona un género.';
    }
    return '';
  };

  // Validar correo 
  const validarCorreoElectronico = (value) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (value.trim() === '') {
      return 'El correo es obligatorio.';
    } else if (!regex.test(value.trim())) {
      return 'El correo no es válido.';
    }
    return '';
  };

  // Validar contraseña
  const validarPassword = (value) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (value.trim() === '') {
      return 'La contraseña es obligatoria.';
    } else if (!regex.test(value.trim())) {
      return 'Debe tener mínimo 8 caracteres, al menos una mayúscula, una minúscula y un número.';
    }
    return '';
  };

  // Validar confirmacion de contraseña
  const validarPasswordConfirm = (password, confirmPassword) => {
    if (confirmPassword.trim() === '') {
      return 'Debe confirmar la contraseña.';
    } else if (password.trim() !== confirmPassword.trim()) {
      return 'Las contraseñas no coinciden.';
    }
    return '';
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    let error = '';
    switch (name) {
      case 'nombre':
        error = validarNombre(value);
        break;
      case 'apellido':
        error = validarApellido(value);
        break;
      case 'genero':
        error = validarGenero(value);
        break;
      case 'correo':
        error = validarCorreoElectronico(value);
        break;
      case 'password':
        error = validarPassword(value);
        if (formData.passwordConfirm) {
          const confirmError = validarPasswordConfirm(value, formData.passwordConfirm);
          setErrors(prev => ({ ...prev, passwordConfirm: confirmError }));
        }
        break;
      case 'passwordConfirm':
        error = validarPasswordConfirm(formData.password, value);
        break;
      default:
        break;
    }

    setErrors(prev => ({ ...prev, [name]: error }));
  };

  // Manejar envios del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const nombreError = validarNombre(formData.nombre);
    const apellidoError = validarApellido(formData.apellido);
    const generoError = validarGenero(formData.genero);
    const correoError = validarCorreoElectronico(formData.correo);
    const passwordError = validarPassword(formData.password);
    const passwordConfirmError = validarPasswordConfirm(formData.password, formData.passwordConfirm);

    setErrors({
      nombre: nombreError,
      apellido: apellidoError,
      genero: generoError,
      correo: correoError,
      password: passwordError,
      passwordConfirm: passwordConfirmError
    });

    const formValido = !nombreError && !apellidoError && !generoError && 
                       !correoError && !passwordError && !passwordConfirmError;

    if (formValido) {
      // Obtener usuarios existentes del localStorage
      const usuariosExistentes = JSON.parse(localStorage.getItem('usuarios')) || [];
      
      // Verificar si el correo ya existe
      const correoExiste = usuariosExistentes.some(user => user.correo === formData.correo);
      
      if (correoExiste) {
        setErrors(prev => ({ ...prev, correo: 'Este correo ya está registrado.' }));
        return;
      }
      
      // Crear objeto de usuario
      const nuevoUsuario = {
        id: Date.now(),
        nombre: formData.nombre,
        apellido: formData.apellido,
        genero: formData.genero,
        correo: formData.correo,
        password: formData.password,
        fechaRegistro: new Date().toISOString()
      };
      
      // Agregar nuevo usuario al array
      usuariosExistentes.push(nuevoUsuario);
      
      // Guardar en local storage
      localStorage.setItem('usuarios', JSON.stringify(usuariosExistentes));
      
      // Crear objeto de usuario activo
      const usuarioActivo = {
        id: nuevoUsuario.id,
        nombre: nuevoUsuario.nombre,
        apellido: nuevoUsuario.apellido,
        correo: nuevoUsuario.correo,
        genero: nuevoUsuario.genero
      };
      
      iniciarSesion(usuarioActivo);
      
      alert('Cuenta registrada correctamente');
      
      setFormData({
        nombre: '',
        apellido: '',
        genero: '',
        correo: '',
        password: '',
        passwordConfirm: ''
      });
      
      navigate('/');
    }
  };

  return (
    <section className="py-5 bg-light">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-5">
            <h2 className="mb-4 text-center">Crear Cuenta</h2>
            <form id="registerForm" onSubmit={handleSubmit} noValidate>
              
              {/*Campo para el nombre*/}
              <div className="mb-3">
                <label htmlFor="registerNombre" className="form-label">Nombre</label>
                <input 
                  type="text" 
                  className={`form-control ${errors.nombre ? 'is-invalid' : ''}`}
                  id="registerNombre" 
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleInputChange}
                  required 
                />
                {errors.nombre && (
                  <span className="text-danger">{errors.nombre}</span>
                )}
                <div className="invalid-feedback">Por favor, ingresa tu nombre.</div>
              </div>

              {/*Campo para el apellido*/}
              <div className="mb-3">
                <label htmlFor="registerApellido" className="form-label">Apellido</label>
                <input 
                  type="text" 
                  className={`form-control ${errors.apellido ? 'is-invalid' : ''}`}
                  id="registerApellido" 
                  name="apellido"
                  value={formData.apellido}
                  onChange={handleInputChange}
                  required 
                />
                {errors.apellido && (
                  <span className="text-danger">{errors.apellido}</span>
                )}
                <div className="invalid-feedback">Por favor, ingresa tu apellido.</div>
              </div>

              {/*Campo para el genero*/}
              <div className="mb-3">
                <label htmlFor="genero" className="form-label">Género</label>
                <select 
                  className={`form-select form-select-lg ${errors.genero ? 'is-invalid' : ''}`}
                  id="genero" 
                  name="genero" 
                  value={formData.genero}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Selecciona un género</option>
                  <option value="masculino">Masculino</option>
                  <option value="femenino">Femenino</option>
                  <option value="prefiero-no-decir">Prefiero no decirlo</option>
                  <option value="otro">Otro</option>
                </select>
                {errors.genero && (
                  <span className="text-danger">{errors.genero}</span>
                )}
                <div className="invalid-feedback">Por favor, selecciona un género.</div>
              </div>

              {/*Campo para el correo*/}
              <div className="mb-3">
                <label htmlFor="registerCorreo" className="form-label">Correo electrónico</label>
                <input 
                  type="email" 
                  className={`form-control ${errors.correo ? 'is-invalid' : ''}`}
                  id="registerCorreo" 
                  name="correo"
                  value={formData.correo}
                  onChange={handleInputChange}
                  required 
                />
                {errors.correo && (
                  <span className="text-danger">{errors.correo}</span>
                )}
                <div className="invalid-feedback">Por favor, ingresa un correo válido.</div>
              </div>

              {/*Campo para la contraseña*/}
              <div className="mb-3">
                <label htmlFor="registerPassword" className="form-label">Contraseña</label>
                <input 
                  type="password" 
                  className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                  id="registerPassword" 
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required 
                />
                {errors.password && (
                  <span className="text-danger">{errors.password}</span>
                )}
                <div className="invalid-feedback">Por favor, ingresa una contraseña.</div>
              </div>

              {/*Campo para confirmar la contraseña*/}
              <div className="mb-3">
                <label htmlFor="registerPasswordConfirm" className="form-label">Confirmar contraseña</label>
                <input 
                  type="password" 
                  className={`form-control ${errors.passwordConfirm ? 'is-invalid' : ''}`}
                  id="registerPasswordConfirm" 
                  name="passwordConfirm"
                  value={formData.passwordConfirm}
                  onChange={handleInputChange}
                  required 
                />
                {errors.passwordConfirm && (
                  <span className="text-danger">{errors.passwordConfirm}</span>
                )}
                <div className="invalid-feedback">Por favor, confirma tu contraseña.</div>
              </div>

              <button type="submit" className="btn btn-primary w-100">
                Crear Cuenta
              </button>
            </form>
            
            <div className="text-center mt-3">
              <Link to="/login">¿Ya tienes cuenta? Iniciar sesión</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Registro;