import { useState, useEffect } from 'react';
import './ProductList.css';
import PropTypes from "prop-types";
import Table from "react-bootstrap/Table";

const ProductList = () => {
  // Paso 1: Crear el estado para almacenar los datos
  const [data, setData] = useState([]);

  // Paso 2: Simular la carga de datos con useEffect
  useEffect(() => {
    // Simulamos una llamada a una API con setTimeout
    setTimeout(() => {
      const dummyData = [
        { id: 1, nombre: "Coche A", alquiler: 50 },
        { id: 2, nombre: "Coche B", alquiler: 60 },
        { id: 3, nombre: "Coche C", alquiler: 70 },
      ];
      setData(dummyData);  // Establece los datos en el estado
    }, 1000);  // Simulamos que la carga de datos tarda 1 segundo
  }, []);  // Solo se ejecuta una vez al montar el componente

  return (
    <>
      <h3>Listado de autos</h3>

      <div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Alquiler por día</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {/* Si data está vacía, mostramos un mensaje de carga */}
            {data.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center">Cargando datos...</td>
              </tr>
            ) : (
              // Cuando los datos se cargan, renderizamos la tabla
              data.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.nombre}</td>
                  <td>${item.alquiler}</td>
                  <td>
                    <button className='button tertiary-button mx-2'>Editar</button>
                    <button className='button secondary-button'>Eliminar</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </div>
    </>
  );
}

// PropTypes solo si decides pasar `data` como prop en el futuro
ProductList.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      nombre: PropTypes.string.isRequired,
      alquiler: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export { ProductList };