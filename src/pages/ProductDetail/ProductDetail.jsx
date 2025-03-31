// #ToDo:
//  - Mejorar mobile para esta página

import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Modal, Carousel ,Container, Row, Col, Card } from 'react-bootstrap';
import './ProductDetail.css';
import BackArrow from '../../assets/back-arrow-black.png';
import HeartIcon from '../../assets/heart-empty.png';
import HeartFilledIcon from '../../assets/heart-full.png';
import { ShareButton } from '../../components/ShareButton/ShareButton';
import { RatingSystem } from '../../components/RatingSystem/RatingSystem';

const ProductDetail = () => {
  const { model } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isCheckingFavorite, setIsCheckingFavorite] = useState(true);
  const [showFavoriteModal, setShowFavoriteModal] = useState(false);
  const [favoriteMessage, setFavoriteMessage] = useState('');

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/cars/model/${model}`);
        console.log('response', response)
        if (!response.ok) {
          throw new Error('Failed to fetch car details');
        }
        const carData = await response.json();
        setCar(carData);
        console.log('cardataaaaaaa---', carData)
        setLoading(false);
        checkFavoriteStatus(carData.id);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    const checkFavoriteStatus = async (carId) => {
      try {
        const response = await fetch(`http://localhost:8080/api/favorites/check/${carId}`, {
          credentials: 'include'
        });
        
        if (response.ok) {
          const data = await response.json();
          setIsFavorite(data.isFavorite);
        }
      } catch (err) {
        console.error('Error checking favorite status:', err);
      } finally {
        setIsCheckingFavorite(false);
      }
    };

    fetchCarDetails();
  }, [model]);



  const toggleFavorite = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/favorites/toggle/${car.id}`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      const data = await response.json();
      
      if (!response.ok) {
        if (response.status === 401) {
          alert('Tu sesión ha expirado. Por favor, vuelve a iniciar sesión.');
          navigate('/login');
          return;
        }
        throw new Error(data.message || 'Error al actualizar favorito');
      }
  
      setIsFavorite(data.isFavorite);
      const message = data.isFavorite ? '❤️ Añadido a favoritos' : '💔 Eliminado de favoritos';
      setFavoriteMessage(message);
      setShowFavoriteModal(true);
      
      setTimeout(() => {
        setShowFavoriteModal(false);
      }, 1000);
      
    } catch (err) {
      console.error('Error:', err);
      alert(err.message || 'Error al actualizar favoritos');
    }
  };

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

  const policies = [
    {
      id: 1,
      title: "Instrucciones de alquiler",
      description:
        "Familiarícese con todos los controles del vehículo alquilado antes de conducir. Ajuste los espejos y el asiento a una posición cómoda. Utilice siempre el cinturón de seguridad y respete las normas de tráfico para garantizar una conducción segura durante su alquiler.",
    },
    {
      id: 2,
      title: "Precauciones de Seguridad",
      description:
        "No conduzca bajo los efectos del alcohol o drogas. Evite el uso del teléfono móvil mientras conduce. Mantenga una distancia segura con otros vehículos y reduzca la velocidad en condiciones climáticas adversas para evitar accidentes durante su alquiler.",
    },
    {
      id: 3,
      title: "Mantenimiento del Vehículo Alquilado",
      description:
        "Revise regularmente el nivel de combustible y la presión de los neumáticos. Informe de cualquier problema mecánico de inmediato para asegurar un alquiler seguro y sin contratiempos. Nuestro equipo se encarga del mantenimiento preventivo.",
    },
    {
      id: 4,
      title: "Condiciones de Garantía",
      description:
        "Nuestros vehículos alquilados están asegurados para su tranquilidad. Consulte los términos de cobertura y asistencia en carretera incluidos en su contrato de alquiler para conocer los detalles específicos.",
    },
  ]

  return (
    <>
      <div>
        <div className='product-detail-header'>
          <div className='back-arrow' onClick={handleGoBack}>
            <img src={BackArrow} alt="Volver" />
            <p>Ir atrás</p>
          </div>
          <div className='user-options'>
            {/* Favorite button */}
            <div className='favorite-button-container'>
              {!isCheckingFavorite && (
                <button 
                  className="favorite-button"
                  onClick={toggleFavorite}
                  aria-label={isFavorite ? "Quitar de favoritos" : "Añadir a favoritos"}
                >
                  <img 
                    src={isFavorite ? HeartFilledIcon : HeartIcon} 
                    alt={isFavorite ? "Favorito" : "No favorito"} 
                  />
                </button>
              )}
            </div>
            {/* Share button */}
            <div className='share-button'>
              <ShareButton
                product={car}
                shareText={`¡Mira este coche! ${car.model}`}
                shareUrl={`http://localhost:3000/detalles/${car.model}`}
                shareImage={`http://localhost:8080/uploads/${car.mainPhotoUrl}`}  
              />
            </div>
          </div>

        </div>
        <div className='product-info'>
          <div className='product-info_details'>
            <h2>{car.model}</h2>
            <p>{car.description}</p>
            <div className='reservation-button'>
              <button 
                onClick={() => navigate(`/reservar/${car.id}`)}
                className="button primary-button reserve-button"
              >
                Ver disponibilidad y reservar
              </button>
            </div>
          </div>
          <div className='product-info_image'>
            <img src={`http://localhost:8080/uploads/${car.mainPhotoUrl}`} alt={car.model} />
          </div>
        </div>
        <div className='product-gallery mt-50'>
          {galleryImages.map((photo, index) => (
            <img 
              key={index} 
              src={`http://localhost:8080/uploads/${photo}`} 
              alt={`${car.model} gallery ${index}`} 
              className={`productImg${index + 1}`}
            />
          ))}
          <div className='view-more-container'>
            <button className='button primary-button' onClick={handleViewMore}>Ver más</button>
          </div>
        </div>
        <div className='product-features'>
          <h3>Características</h3>
          <ul>
            {car.features.map((feature, index) => (
              <li key={index}>
                <i className={feature.icon}></i> {feature.name}
              </li>
            ))}
          </ul>
        </div>
        <div className='product-categories'>
          <h3>Categorías</h3>
          <ul>
            {car.categories.map((category, index) => (
              <li key={index}>
                {category.title}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className='ratings'>
        <RatingSystem 
          productId={car.id} 
          isAuthenticated={true}
        />
      </div>

      <Container fluid className="policy-container">
        <div className="policy-title-container">
          <h2 className="policy-main-title">Política de Uso del Vehículo</h2>
        </div>
        <Row>
          {policies.map((policy) => (
            <Col key={policy.id} xs={12} md={6} lg={3} className="mb-4">
              <Card className="policy-card h-100">
                <Card.Body>
                  <Card.Title className="policy-title">{policy.title}</Card.Title>
                  <Card.Text>{policy.description}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Modal para imágenes */}
      <Modal className='gallery-modal' show={showModal} onHide={handleCloseModal} size="lg">
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

      {/* Modal para el feedback de favoritos */}
      <Modal 
        show={showFavoriteModal} 
        onHide={() => setShowFavoriteModal(false)}
        centered
        size="sm"
      >
        <Modal.Body className="text-center py-4">
          <p style={{ fontSize: '1.2rem', marginBottom: '0' }}>
            {favoriteMessage}
          </p>
        </Modal.Body>
      </Modal>
    </>
  );
};

export { ProductDetail };