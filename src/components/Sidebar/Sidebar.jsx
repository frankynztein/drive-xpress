import './Sidebar.css';
import CarIcon from '../../assets/car-icon.png';
import ListIcon from '../../assets/list-icon.png';
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <>
      <section className='sidebar'>
        <nav>
          <Link to="/administracion/agregar-carro"><img src={CarIcon} alt="" /></Link>
          <Link to="/administracion/lista-de-carros"><img src={ListIcon} alt="" /></Link>
          <Link to="/administracion/agregar-carro"><li className="button no-background-button">Agregar carro</li></Link>
          <Link to="/administracion/lista-de-carros"><li className="button no-background-button">Lista de carros</li></Link>
        </nav>
      </section>
    </>
  )
}

export { Sidebar };