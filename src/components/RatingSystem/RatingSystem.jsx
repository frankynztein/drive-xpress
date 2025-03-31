import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Modal, Form } from 'react-bootstrap';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import './RatingSystem.css';

const RatingSystem = ({ productId, isAuthenticated }) => {
  const [reviews, setReviews] = useState([
    {
      id: 1,
      userId: 101,
      userName: "Usuario Ejemplo 1",
      rating: 4,
      comment: "Muy buen producto, lo recomiendo!",
      date: "2023-10-15"
    },
    {
      id: 2,
      userId: 102,
      userName: "Usuario Ejemplo 2",
      rating: 5,
      comment: "Excelente calidad, superó mis expectativas",
      date: "2023-10-18"
    }
  ]);

  const [averageRating, setAverageRating] = useState(0);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [showReviewsModal, setShowReviewsModal] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [userComment, setUserComment] = useState("");
  const [hasRated, setHasRated] = useState(false);

  useEffect(() => {
    if (reviews.length > 0) {
      const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
      setAverageRating(sum / reviews.length);
    }
  }, [reviews]);

  useEffect(() => {
    setHasRated(false);
  }, [productId]);

  const handleRatingSubmit = (e) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      alert("Por favor inicia sesión para valorar este producto");
      return;
    }

    const newReview = {
      id: reviews.length + 1,
      userId: 999, 
      userName: "Tú", 
      rating: userRating,
      comment: userComment,
      date: new Date().toISOString().split('T')[0]
    };

    setReviews([...reviews, newReview]);
    setUserRating(0);
    setUserComment("");
    setShowRatingModal(false);
    setHasRated(true);
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<FaStar key={i} className="star filled" />);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<FaStarHalfAlt key={i} className="star half-filled" />);
      } else {
        stars.push(<FaRegStar key={i} className="star empty" />);
      }
    }

    return stars;
  };

  return (
    <div className="rating-system">
      <h3>Valoraciones del producto</h3>
      
      <div className="average-rating">
        <div className="stars">
          {renderStars(averageRating)}
          <span className="rating-number">{averageRating.toFixed(1)}</span>
        </div>
        <p className="review-count">{reviews.length} valoraciones</p>
      </div>

      <div className="buttons-container">
        {isAuthenticated && !hasRated && (
          <button 
            onClick={() => setShowRatingModal(true)}
            className='button primary-button'
          >
            Valorar este producto
          </button>
        )}

        <button 
          onClick={() => setShowReviewsModal(true)}
          className='button no-background-button'
        >
          Mostrar valoraciones
        </button>
      </div>

      {/* Modal para valorar producto */}
      <Modal className='rating-modal' show={showRatingModal} onHide={() => setShowRatingModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Valorar este producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleRatingSubmit}>
            <div className="rating-input">
              <p>Selecciona tu puntuación:</p>
              <div className="stars-input">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    onClick={() => setUserRating(star)}
                  >
                    {star <= (hoverRating || userRating) ? (
                      <FaStar className="star filled" />
                    ) : (
                      <FaRegStar className="star empty" />
                    )}
                  </span>
                ))}
              </div>
            </div>

            <Form.Group className="mb-3">
              <Form.Label>Comentario (opcional):</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={userComment}
                onChange={(e) => setUserComment(e.target.value)}
                placeholder="Comparte tu experiencia con este producto..."
              />
            </Form.Group>

            <button className='button primary-button' type="submit" disabled={userRating === 0}>
              Enviar valoración
            </button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Modal para mostrar valoraciones */}
      <Modal 
      className='reviews-modal'
        show={showReviewsModal} 
        onHide={() => setShowReviewsModal(false)} 
        centered
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Valoraciones del producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="reviews-list">
            {reviews.length > 0 ? (
              reviews.map((review) => (
                <div key={review.id} className="review-item">
                  <div className="review-header">
                    <div className="stars">{renderStars(review.rating)}</div>
                    <div className="review-meta">
                      <span className="user-name">{review.userName}</span>
                      <span className="review-date">{review.date}</span>
                    </div>
                  </div>
                  {review.comment && (
                    <p className="review-comment">{review.comment}</p>
                  )}
                </div>
              ))
            ) : (
              <p>No hay valoraciones aún</p>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button className='button tertiary-button' onClick={() => setShowReviewsModal(false)}>
            Cerrar
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

RatingSystem.propTypes = {
  productId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

export { RatingSystem };