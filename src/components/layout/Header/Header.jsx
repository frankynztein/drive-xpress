import { Link } from "react-router-dom";
import './Header.css';
import logo from '../../../assets/logo.png';

const Header = () => {
  return (
    <>
      <div className="header-wrapper">
        <header className='header'>
          <div>
              <Link to="/">
                <img src={logo} className="header-logo" alt="Drive Xpress logo" />
              </Link>
          </div>
          <nav className='header_nav'>
            <ul>
              <a href="/"><li className="header-button">Crear cuenta</li></a>
              <a href="/"><li className="header-button sign-in">Iniciar sesión</li></a>
            </ul>
          </nav>
        </header>
      </div>
    </>
  )
}

export { Header };