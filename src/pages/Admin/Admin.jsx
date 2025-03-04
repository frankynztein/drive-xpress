import './Admin.css';

const Admin = () => {
  return (
    <>
    <div className='admin-content'>
      <h2>Panel de administración</h2>
      <a href="/administracion/agregar-carro" className="button primary-button">Agregar carro</a>
      <a href="/administracion/lista-de-carros" className="button primary-button">Lista de carros</a>
    </div>
    <div className='admin-no-mobile'>
      <h2>No se puede mostrar este contenido. Por favor, cargar en versión escritorio.</h2>
    </div>
    </>
  )
}

export { Admin };