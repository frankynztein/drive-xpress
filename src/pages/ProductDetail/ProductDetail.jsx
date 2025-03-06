// #ToDo:
//  - Mejorar mobile para esta página

import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Modal, Carousel } from 'react-bootstrap';
import './ProductDetail.css';
import BackArrow from '../../assets/back-arrow-black.png';

const ProductDetail = () => {
  const { model } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/cars/model/${model}`);
        if (!response.ok) {
          throw new Error('Failed to fetch car details');
        }
        const carData = await response.json();
        setCar(carData);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchCarDetails();
  }, [model]);

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleViewMore = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  if (loading) return <div>Cargando detalles del coche...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!car) return <div>Coche no encontrado</div>;

  const allImages = [car.mainPhotoUrl, ...(car.photoGallery || [])];
  const galleryImages = allImages.slice(0, 5);

  return (
    <>
      <div className='mt-50'>
        <div className='back-arrow' onClick={handleGoBack}>
          <img src={BackArrow} alt="Volver" />
          <p>Ir atrás</p>
        </div>
        <div className='product-info'>
          <div className='product-info_details'>
            <h2>{car.model}</h2>
            <p>{car.description}</p>
          </div>
          <div className='product-info_image'>
            <img src={`http://localhost:8080/uploads/${car.mainPhotoUrl}`} alt={car.model} />
          </div>
        </div>
        <div className='product-gallery'>
          {galleryImages.map((photo, index) => (
            <img 
              key={index} 
              src={`http://localhost:8080/uploads/${photo}`} 
              alt={`${car.model} gallery ${index}`} 
              className={`productImg${index + 1}`}
            />
          ))}
          <button className='button primary-button view-more' onClick={handleViewMore}>Ver más</button>
        </div>
      </div>

      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Imágenes de {car.model}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Carousel activeIndex={activeIndex} onSelect={(selectedIndex) => setActiveIndex(selectedIndex)}>
            {allImages.map((photo, index) => (
              <Carousel.Item key={index}>
                <img
                  className="d-block w-100"
                  src={`http://localhost:8080/uploads/${photo}`}
                  alt={`${car.model} slide ${index}`}
                />
              </Carousel.Item>
            ))}
          </Carousel>
          <div className="thumbnail-gallery mt-3">
            {allImages.map((photo, index) => (
              <img
                key={index}
                src={`http://localhost:8080/uploads/${photo}`}
                alt={`${car.model} thumbnail ${index}`}
                className={`thumbnail ${index === activeIndex ? 'active' : ''}`}
                onClick={() => setActiveIndex(index)}
              />
            ))}
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export { ProductDetail };