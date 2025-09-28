import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../Css/Estilo.css";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    correo: '',
    password: ''
  });
  const [errors, setErrors] = useState({});

  // Validar correo electrónico
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    let error = '';
    if (name === 'correo') {
      error = validarCorreoElectronico(value);
    } else if (name === 'password') {
      error = validarPassword(value);
    }

    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const correoError = validarCorreoElectronico(formData.correo);
    const passwordError = validarPassword(formData.password);

    setErrors({
      correo: correoError,
      password: passwordError
    });

    const correoValido = !correoError;
    const passValida = !passwordError;

    if (correoValido && passValida) {
      alert('Sesión iniciada correctamente');
      setFormData({ correo: '', password: '' });
      navigate('/');
    }
  };

  return (
    <section className="py-5 bg-light">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-5">
            <h2 className="mb-4 text-center">Iniciar Sesión</h2>
            <form id="loginForm" onSubmit={handleSubmit} noValidate>
              <div className="mb-3">
                <label htmlFor="loginCorreo" className="form-label">
                  Correo electrónico
                </label>
                <input 
                  type="email" 
                  className={`form-control ${errors.correo ? 'is-invalid' : ''}`}
                  id="loginCorreo" 
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

              <div className="mb-3">
                <label htmlFor="loginPassword" className="form-label">
                  Contraseña
                </label>
                <input 
                  type="password" 
                  className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                  id="loginPassword" 
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required 
                />
                {errors.password && (
                  <span className="text-danger">{errors.password}</span>
                )}
                <div className="invalid-feedback">Por favor, ingresa tu contraseña.</div>
              </div>

              <button type="submit" className="btn btn-primary w-100">
                Ingresar
              </button>
            </form>
            
            <div className="text-center mt-3">
              <Link to="/registro">¿No tiene una cuenta?</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;