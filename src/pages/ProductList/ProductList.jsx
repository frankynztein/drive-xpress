import { useState, useEffect } from 'react';
import './ProductList.css';
import PropTypes from "prop-types";
import Table from "react-bootstrap/Table";

const ProductList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/cars');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const cars = await response.json();
        setData(cars);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <h3>Listado de autos</h3>

      <div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Modelo</th>
              <th>Alquiler por día</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {data.map((car) => (
              <tr key={car.id}>
                <td>{car.id}</td>
                <td>{car.model}</td>
                <td>${car.dailyRentalCost}</td>
                <td>
                  <button className='button tertiary-button mx-2'>Editar</button>
                  <button className='button secondary-button'>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
}

ProductList.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      model: PropTypes.string.isRequired,
      dailyRentalCost: PropTypes.number.isRequired,
    })
  )
};

export { ProductList };