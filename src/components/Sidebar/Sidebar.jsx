import './Sidebar.css';
import CarIcon from '../../assets/car-icon.png';
import ListIcon from '../../assets/list-icon.png';
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <>
      <section className='sidebar'>
        <nav>
          <Link to="/administracion/agregar-coche"><img src={CarIcon} alt="" /></Link>
          <Link to="/administracion/lista-de-coches"><img src={ListIcon} alt="" /></Link>
          <Link to="/administracion/agregar-coche"><li className="button no-background-button">Agregar coche</li></Link>
          <Link to="/administracion/lista-de-coches"><li className="button no-background-button">Lista de coches</li></Link>
        </nav>
      </section>
    </>
  )
}

export { Sidebar };