import './Admin.css';

const Admin = () => {
  return (
    <>
    <div className='mt-50 mr-50 mb-200 ml-50' style={{height: '100vh'}}>
      <div className='admin-content'>
        <h2>Panel de administración</h2>
        <a href="/administracion/agregar-coche" className="button primary-button">Agregar coche</a>
        <a href="/administracion/lista-de-coches" className="button primary-button">Lista de coches</a>
      </div>
      <div className='admin-no-mobile'>
        <h2>No se puede mostrar este contenido. Por favor, cargar en versión escritorio.</h2>
      </div>
    </div>
    </>
  )
}

export { Admin };