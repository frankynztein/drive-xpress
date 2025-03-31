//  #ToDo:
//  - Agregar mesaje de  "Se borró exitosamente el coche tal"
//  - Mejorar modal de edicion de coches

import { useState, useEffect } from 'react';
import './ProductList.css';
import PropTypes from "prop-types";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import axios from 'axios';

const ProductList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalState, setModalState] = useState('confirm');
  const [carToDelete, setCarToDelete] = useState(null);
  const [carToEdit, setCarToEdit] = useState(null);
  const [editMessage, setEditMessage] = useState('');
  const [errors, setErrors] = useState({});

  const [features, setFeatures] = useState([]);
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  useEffect(() => {
    fetchCars();
    fetchFeatures();
    fetchCategories();
  }, []);

  const fetchCars = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:8080/api/cars');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const cars = await response.json();
      setData(cars);
    } catch (err) {
      console.error("Error fetching cars:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchFeatures = async () => {
    setLoading(true);
    setError(null);
    try {
        const response = await axios.get('http://localhost:8080/api/features', { withCredentials: true });
        setFeatures(response.data);
    } catch (error) {
        console.error("Error fetching features:", error);
        setEditMessage('Error al cargar las características.');
    } finally {
      setLoading(false);
    }
};

  const fetchCategories = async () => {
    setLoading(true);
    setError(null);
    try {
        const response = await axios.get('http://localhost:8080/api/categories', { withCredentials: true });
        console.log('response categories', response);
        setCategories(response.data);
    } catch (error) {
        console.error("Error fetching categories:", error);
        setEditMessage('Error al cargar las categorias.');
    } finally {
      setLoading(false);
    }
};

  const handleDelete = (car) => {
    setCarToDelete(car);
    setModalState('confirm');
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
      setModalState('success');
      setTimeout(() => {
        setShowModal(false);
        setCarToDelete(null);
        setModalState('confirm');
      }, 1000);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEdit = (car) => {
    console.log('car', car);
    setCarToEdit(car);
    setModalState('edit');
    setShowModal(true);
    setErrors({});

    setSelectedFeatures(car.features.map(feature => feature.id));
    setSelectedCategories(car.categories.map(category => category.id));
  };

  const handleFeatureChange = (featureId) => {
    setSelectedFeatures(prev =>
      prev.includes(featureId)
        ? prev.filter(id => id !== featureId)
        : [...prev, featureId]
    );
  };

  const handleCategoryChange = (categoryId) => {
    setSelectedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };


  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setCarToEdit(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleEditFiles = (e) => {
    const { name, files } = e.target;

    if (name === 'mainPhoto') {
      setCarToEdit(prevState => ({
        ...prevState,
        mainPhoto: files[0]
      }));
    } else if (name === 'gallery') {
      setCarToEdit(prevState => ({
        ...prevState,
        gallery: Array.from(files)
      }));
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setEditMessage('');
    setErrors({});

    const formData = new FormData(e.target);

    selectedFeatures.forEach(featureId => formData.append('features', featureId));
    selectedCategories.forEach(categoryId => formData.append('categories', categoryId));

    try {
        const response = await axios.put(`http://localhost:8080/api/cars/${carToEdit.id}`, formData, {
            withCredentials: true,
            headers: { 'Content-Type': 'multipart/form-data' }
        });

        setEditMessage(`Coche actualizado exitosamente con ID: ${response.data.id}`);
        setCarToEdit(null);
        fetchCars();
    } catch (error) {
        console.error("Error updating car:", error);
        setEditMessage('Error al actualizar el coche.');
        if (error.response && error.response.data) {
            setErrors(error.response.data);
        }
    }
};

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!data || data.length === 0) return <div>No hay coches disponibles</div>;

  return (
    <>
      <div className='mt-50 mr-50 mb-200 ml-50'>
        <h3>Listado de coches</h3>
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
                    <button className="button tertiary-button mx-2" onClick={() => handleEdit(car)}>Editar</button>
                    <button className="button secondary-button" onClick={() => handleDelete(car)}>Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>

        <Modal className='product-list' show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>
              {modalState === 'edit' ? 'Editar coche' : 
                modalState === 'success' ? 'Coche eliminado' : 
                'Confirmar eliminación'}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {modalState === 'edit' && carToEdit ? (
              <form onSubmit={handleEditSubmit}>
                <div className='car-model-input'>
                  <label htmlFor="model">Modelo del coche</label>
                  <input 
                    type="text" 
                    id="model" 
                    name="model" 
                    value={carToEdit.model || ''} 
                    onChange={handleEditChange} 
                    required 
                  />
                </div>

                <div className="edit-car-input">
                  <p>Categorías</p>
                  <div className="category">
                    {categories.map((category) => (
                      <label key={category.id} htmlFor={`feature-${category.id}`} className='category-item'>
                        <input 
                          className='form-check-input' 
                          type="checkbox" 
                          id={`category-${category.id}`}
                          name={`category-${category.id}`}
                          value={category.id}
                          checked={selectedCategories.includes(category.id)}
                          onChange={() => handleCategoryChange(category.id)}
                        />
                          {category.title}
                        
                      </label>
                    ))}
                  </div>
                </div>
                <div className='edit-car-input'>
                  <label htmlFor="transmission">Transmisión del coche</label>
                  <input 
                    type="text" 
                    id="transmission" 
                    name="transmission" 
                    value={carToEdit.transmission || ''} 
                    onChange={handleEditChange} 
                    required 
                  />
                </div>
                <div className='edit-car-input'>
                  <label htmlFor="dailyRentalCost">Costo alquiler por día</label>
                  <input 
                    type="number" 
                    id="dailyRentalCost" 
                    name="dailyRentalCost" 
                    value={carToEdit.dailyRentalCost || ''} 
                    onChange={handleEditChange} 
                    required 
                  />
                </div>
                <div className='edit-car-input car-description-input'>
                  <label htmlFor="description">Descripción del coche</label>
                  <textarea 
                    id="description" 
                    name="description" 
                    value={carToEdit.description || ''} 
                    onChange={handleEditChange} 
                    required 
                  />
                </div>
                <div className='edit-car-input'>
                  <label htmlFor="mainPhoto">Foto principal</label>
                  {carToEdit.mainPhotoUrl && (
                    <p>Foto actual: {carToEdit.mainPhotoUrl}</p>
                  )}
                  <input 
                    type="file" 
                    id="mainPhoto" 
                    name="mainPhoto" 
                    onChange={handleEditFiles}
                  />
                </div>
                <div className='edit-car-input'>
                  <label htmlFor="gallery">Galería de fotos</label>
                  {carToEdit.photoGallery && carToEdit.photoGallery.length > 0 && (
                    <p>Fotos actuales: {carToEdit.photoGallery.join(', ')}</p>
                  )}
                  <input 
                    type="file" 
                    id="gallery" 
                    name="gallery" 
                    multiple 
                    onChange={handleEditFiles}
                  />
                </div>
                <div className="edit-car-input">
                  <p>Caracteristicas</p>
                  <div className="feature">
                    {features.map((feature) => (
                      <label key={feature.id} htmlFor={`feature-${feature.id}`} className='feature-item'>
                        <input 
                          className='form-check-input' 
                          type="checkbox" 
                          id={`feature-${feature.id}`}
                          name={`feature-${feature.id}`}
                          value={feature.id}
                          checked={selectedFeatures.includes(feature.id)}
                          onChange={() => handleFeatureChange(feature.id)}
                        />
                          {feature.name}
                      </label>
                    ))}
                  </div>
                </div>
                <button className='button primary-button' type="submit">Guardar cambios</button>
              </form>
            ) : modalState === 'success' ? (
              `Se borró con éxito el coche "${carToDelete?.model}"`
            ) : carToDelete ? (
              `¿Está seguro de que desea eliminar el coche "${carToDelete.model}"?`
            ) : (
              'Seleccione un coche para eliminar'
            )}
            {editMessage && <p>{editMessage}</p>}
          </Modal.Body>

          {modalState === 'confirm' && (
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowModal(false)}>
                Cancelar
              </Button>
              <Button variant="danger" onClick={confirmDelete}>
                Eliminar
              </Button>
            </Modal.Footer>
          )}
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