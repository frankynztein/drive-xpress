import { useContext, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from '../../../contexts/AuthContext';
import { UserAvatar } from '../../UserAvatar/UserAvatar';
import './Header.css';
import logo from '../../../assets/logo.png';

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="header-wrapper">
      <header className='header'>
        <div>
          <Link to="/">
            <img src={logo} className="header-logo" alt="Drive Xpress logo" />
          </Link>
        </div>
        <button className="menu-toggle" onClick={toggleMenu}>☰</button>
        <nav className={`header_nav ${isMenuOpen ? 'active' : ''}`}>
          <ul>
            {user ? (
              <>
                <p className="welcome-message">¡Bienvenid@, {user.firstName || "tú"}!</p>
                <UserAvatar user={user} />
                {user.isAdmin === true && (
                  <Link to="/administracion">
                    <li className="button primary-button">Panel de Admin</li>
                  </Link>
                )}
                <button onClick={handleLogout} className="button no-background-button">Cerrar sesión</button>
              </>
            ) : (
              <>
                <Link to="/register">
                  <li className="button no-background-button">Crear cuenta</li>
                </Link>
                <Link to="/login">
                  <li className="button primary-button">Iniciar sesión</li>
                </Link>
              </>
            )}
          </ul>
        </nav>
      </header>
    </div>
  );
}

export { Header };