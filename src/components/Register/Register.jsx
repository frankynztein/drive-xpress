import './Register.css';

import { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prevState => ({
      ...prevState,
      [name]: value
    }));
    setErrors(prevErrors => ({ ...prevErrors, [name]: '' }));
  };

  const validateForm = () => {
    let formIsValid = true;
    let errors = {};

    if (!user.firstName.trim()) {
      errors.firstName = 'El nombre es obligatorio';
      formIsValid = false;
    } else if (user.firstName.length < 2 || user.firstName.length > 50) {
      errors.firstName = 'El nombre debe tener entre 2 y 50 caracteres';
      formIsValid = false;
    }

    if (!user.lastName.trim()) {
      errors.lastName = 'El apellido es obligatorio';
      formIsValid = false;
    } else if (user.lastName.length < 2 || user.lastName.length > 50) {
      errors.lastName = 'El apellido debe tener entre 2 y 50 caracteres';
      formIsValid = false;
    }

    if (!user.email.trim()) {
      errors.email = 'El email es obligatorio';
      formIsValid = false;
    } else if (!/\S+@\S+\.\S+/.test(user.email)) {
      errors.email = 'El email no es válido';
      formIsValid = false;
    }

    if (!user.password) {
      errors.password = 'La contraseña es obligatoria';
      formIsValid = false;
    } else if (user.password.length < 6) {
      errors.password = 'La contraseña debe tener al menos 6 caracteres';
      formIsValid = false;
    }

    setErrors(errors);
    return formIsValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        await axios.post('http://localhost:8080/api/users/register', user,
          { withCredentials: true }
        );
        setMessage('Usuario registrado exitosamente');
        setUser({ firstName: '', lastName: '', email: '', password: '' });
      } catch (error) {
        if (error.response && error.response.data) {
          setMessage(error.response.data);
        } else {
          setMessage('Error al registrar el usuario');
        }
      }
    }
  };

  return (
    <div className='register-container'>
      <h2>Registro de Usuario</h2>
      {message && <div className="message">{message}</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="firstName">Nombre</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={user.firstName}
            onChange={handleChange}
          />
          {errors.firstName && <span className="error">{errors.firstName}</span>}
        </div>
        <div>
          <label htmlFor="lastName">Apellido</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={user.lastName}
            onChange={handleChange}
          />
          {errors.lastName && <span className="error">{errors.lastName}</span>}
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={user.email}
            onChange={handleChange}
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>
        <div>
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            name="password"
            value={user.password}
            onChange={handleChange}
          />
          {errors.password && <span className="error">{errors.password}</span>}
        </div>
        <button type="submit" className='button primary-button'>Registrarse</button>
      </form>
    </div>
  );
};

export { Register };
