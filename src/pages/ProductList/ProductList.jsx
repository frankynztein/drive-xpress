import { useState, useEffect } from 'react';
import './ProductList.css';
import PropTypes from "prop-types";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const ProductList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [carToDelete, setCarToDelete] = useState(null);

  useEffect(() => {
    fetchCars();
  }, []);

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

  const handleDelete = (car) => {
    setCarToDelete(car);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/cars/${carToDelete.id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete car');
      }
      setData(data.filter(car => car.id !== carToDelete.id));
      setShowModal(false);
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <div className='mt-50 mr-50 mb-200 ml-50'>
        <h3>Listado de coches</h3>
        {/* Tabla de productos */}
        <div className='table-container'>
          <Table striped bordered hover style={{ display: 'table', width: '100%' }}>
            <thead style={{ position: 'sticky', top: 0, backgroundColor: 'white', zIndex: 1, boxShadow: '0 0px 6px rgba(0,0,0,0.1)' }}>
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
                    <button className="button tertiary-button mx-2">Editar</button>
                    <button className="button secondary-button" onClick={() => handleDelete(car)}>Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>

        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Confirmar eliminación</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {carToDelete ? (
              `¿Está seguro de que desea eliminar el coche "${carToDelete.model}"?`
            ) : (
              'Seleccione un coche para eliminar'
            )}
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cancelar
            </Button>
            <Button variant="danger" onClick={confirmDelete}>
              Eliminar
            </Button>
          </Modal.Footer>
        </Modal>
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