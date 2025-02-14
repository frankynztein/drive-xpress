import './Admin.css';
import TrashCan from '../../assets/trash-can.png';
import Edit from '../../assets/edit.png';

const Admin = () => {
  return (
    <>
      <h1>Admin</h1>
      <h3>Listado de autos</h3>
      <ol>
        <li>Peugeot 308 - Sedán manual - $30,50/día <span><img src={Edit} alt="" /></span> <span><img src={TrashCan} alt="" /></span></li>
        <li>Peugeot 308 - Sedán manual - $30,50/día <span><img src={Edit} alt="" /></span> <span><img src={TrashCan} alt="" /></span></li>
        <li>Peugeot 308 - Sedán manual - $30,50/día <span><img src={Edit} alt="" /></span> <span><img src={TrashCan} alt="" /></span></li>
        <li>Peugeot 308 - Sedán manual - $30,50/día <span><img src={Edit} alt="" /></span> <span><img src={TrashCan} alt="" /></span></li>
        <li>Peugeot 308 - Sedán manual - $30,50/día <span><img src={Edit} alt="" /></span> <span><img src={TrashCan} alt="" /></span></li>
        
      </ol>
      <a href="/agregar-carro" className="button primary-button">Agregar carro</a>
    </>
  )
}

export { Admin };