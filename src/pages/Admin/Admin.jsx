import './Admin.css';

const Admin = () => {
  return (
    <>
      <h1>Admin</h1>
      <a href="/agregar-carro" className="button primary-button">Agregar carro</a>
      <a href="/lista-de-carros" className="button primary-button">Lista de carros</a>
    </>
  )
}

export { Admin };