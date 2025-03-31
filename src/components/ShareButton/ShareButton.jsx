import { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'react-bootstrap';
import FacebookIcon from '../../assets/facebook-icon.png';
import TwitterIcon from '../../assets/twitter-icon.png';
import WhatsappIcon from '../../assets/whatsapp-icon.png';
import EmailIcon from '../../assets/email-icon.png';
import LinkIcon from '../../assets/link-icon.png';
import LinkIconEmpty from '../../assets/link-icon-empty.png';
import './ShareButton.css';

const ShareButton = ({ product }) => {
  const [showModal, setShowModal] = useState(false);
  const [customMessage, setCustomMessage] = useState(`¡Mira este increíble ${product.model} que encontré!`);

  const handleShare = (platform) => {
    const productUrl = `${window.location.origin}/producto/${product.model}`;
    const shareText = `${customMessage}\n\n${productUrl}`;
    const encodedText = encodeURIComponent(shareText);
    const encodedUrl = encodeURIComponent(productUrl);

    switch (platform) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedText}`, '_blank');
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodedText}`, '_blank');
        break;
      case 'whatsapp':
        window.open(`https://wa.me/?text=${encodedText}`, '_blank');
        break;
      case 'email':
        window.open(`mailto:?subject=${encodeURIComponent(`Recomendación: ${product.model}`)}&body=${encodedText}`);
        break;
      case 'copy':
        navigator.clipboard.writeText(shareText);
        alert('Enlace copiado al portapapeles!');
        break;
      default:
        break;
    }
  };

  return (
    <>
      <button onClick={() => setShowModal(true)}>
        <img 
          src={LinkIconEmpty} 
          alt="Compartir" 
        />
      </button>

      <Modal className='share-button-modal' show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Compartir {product.model}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="share-preview">
            <img 
              src={`http://localhost:8080/uploads/${product.mainPhotoUrl}`} 
              alt={product.model} 
              className="share-preview-image"
            />
            <div className="share-preview-text">
              <h5>{product.model}</h5>
              <p>{product.description.substring(0, 100)}...</p>
            </div>
          </div>

          <div className="share-message">
            <label htmlFor="customMessage">Añade un mensaje:</label>
            <textarea
              id="customMessage"
              value={customMessage}
              onChange={(e) => setCustomMessage(e.target.value)}
              maxLength="200"
            />
          </div>

          <div className="share-platforms">
            <button onClick={() => handleShare('facebook')} className="share-platform">
              <img src={FacebookIcon} alt="Facebook" />
              <span>Facebook</span>
            </button>
            <button onClick={() => handleShare('twitter')} className="share-platform">
              <img src={TwitterIcon} alt="Twitter" />
              <span>Twitter</span>
            </button>
            <button onClick={() => handleShare('whatsapp')} className="share-platform">
              <img src={WhatsappIcon} alt="WhatsApp" />
              <span>WhatsApp</span>
            </button>
            <button onClick={() => handleShare('email')} className="share-platform">
              <img src={EmailIcon} alt="Email" />
              <span>Email</span>
            </button>
            <button onClick={() => handleShare('copy')} className="share-platform">
              <img src={LinkIcon} alt="Copiar enlace" />
              <span>Copiar enlace</span>
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

ShareButton.propTypes = {
  product: PropTypes.shape({
    model: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    mainPhotoUrl: PropTypes.string.isRequired,
  }).isRequired,
};

export { ShareButton };