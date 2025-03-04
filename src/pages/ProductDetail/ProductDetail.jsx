import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ProductDetail.css';
import BackArrow from '../../assets/back-arrow-black.png';

const ProductDetail = () => {
  const { model } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading) return <div>Cargando detalles del coche...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!car) return <div>Coche no encontrado</div>;

  return (
    <>
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
        {car.photoGallery && car.photoGallery.map((photo, index) => (
          <img key={index} src={`http://localhost:8080/uploads/${photo}`} alt={`${car.model} gallery ${index + 1}`} />
        ))}
      </div>
    </>
  );
};

export { ProductDetail };