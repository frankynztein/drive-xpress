import './Sidebar.css';
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <>
      <section className='sidebar'>
        <nav>
          <Link to="/administracion"><li className="button no-background-button">Panel</li></Link>
          <Link to="/administracion/agregar-coche"><li className="button no-background-button">Agregar coche</li></Link>
          <Link to="/administracion/lista-de-coches"><li className="button no-background-button">Coches</li></Link>
          <Link to="/administracion/caracteristicas-de-coches"><li className="button no-background-button">Características</li></Link>
          <Link to="/administracion/categorias-de-coches"><li className="button no-background-button">Categorías</li></Link>
          <Link to="/administracion/lista-de-usuarios"><li className="button no-background-button">Usuarios</li></Link>
        </nav>
      </section>
    </>
  )
}

export { Sidebar };