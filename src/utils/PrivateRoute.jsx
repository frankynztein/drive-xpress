import { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const PrivateRoute = ({ redirectTo = "/login", requiredAdmin = false }) => {
  const { user, setUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
        try {
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser);
        } catch (error) {
            console.error('Error al parsear el usuario:', error);
        }
    }
    setLoading(false);
}, [setUser]);

if (loading) {
  return <div>Cargando...</div>;
}

  if (!user) {
    console.log("No hay usuario autenticado, redirigiendo a login...");
    return <Navigate to={redirectTo} />;
  }

  if (requiredAdmin && !user.isAdmin) {
    console.log("El usuario no tiene permisos de admin, redirigiendo...");
    return <Navigate to={redirectTo = "/"} />;
  }

  return <Outlet />;
};

PrivateRoute.propTypes = {
    redirectTo: PropTypes.string,
    requiredAdmin: PropTypes.bool,
};

export { PrivateRoute };