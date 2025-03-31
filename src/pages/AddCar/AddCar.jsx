// #ToDo:
// - Que se borre la info en el input de imágenes al enviar los datos del coche
// - Agregar modal o cambiar de ubicación los mensajes de error o éxito del formulario

import './AddCar.css';
import { useState, useRef, useContext, useEffect } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import axios from 'axios';

const AddCar = () => {
  const [car, setCar] = useState({
    model: '',
    //category: '',
    transmission: '',
    dailyRentalCost: '',
    description: '',
  });
  const [mainPhoto, setMainPhoto] = useState(null);
  const [gallery, setGallery] = useState([]);
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});
  const [features, setFeatures] = useState([]);
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [categories, setCategories] = useState([]); 
  const [selectedCategories, setSelectedCategories] = useState([]);
  const { user } = useContext(AuthContext);

  const mainPhotoRef = useRef(null);
  const galleryRef = useRef(null);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/features", { withCredentials: true })
      .then((response) => setFeatures(response.data))
      .catch((error) => console.error("Error fetching features:", error));

      axios
      .get("http://localhost:8080/api/categories", { withCredentials: true })
      .then((response) => setCategories(response.data))
      .catch((error) => console.error("Error fetching categories:", error));
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCar(prevState => ({
      ...prevState,
      [name]: value
    }));
    setErrors(prevErrors => ({ ...prevErrors, [name]: '' }));
  };

  const handleFileChange = (e) => {
    if (e.target.name === 'mainPhoto') {
      setMainPhoto(e.target.files[0]);
    } else if (e.target.name === 'gallery') {
      setGallery(Array.from(e.target.files));
    }
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setErrors({});

    const formData = new FormData();
    Object.keys(car).forEach(key => formData.append(key, car[key]));
    if (mainPhoto) formData.append('mainPhoto', mainPhoto);
    gallery.forEach(photo => formData.append('gallery', photo));
    selectedFeatures.forEach(featureId => formData.append('features', featureId));
    selectedCategories.forEach(categoryId => formData.append('categories', categoryId));
    console.log('selected categories', selectedCategories)

    try {
      const response = await axios.post('http://localhost:8080/api/cars', formData, {
        withCredentials: true,
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setMessage(`Coche registrado exitosamente con ID: ${response.data.id}`);
      setCar({ model: '', transmission: '', dailyRentalCost: '', description: '' });
      setMainPhoto(null);
      setGallery([]);
      setSelectedFeatures([]);
      setSelectedCategories([]);

      if (mainPhotoRef.current) mainPhotoRef.current.value = '';
      if (galleryRef.current) galleryRef.current.value = '';

      const checkboxes = document.querySelectorAll('input[type="checkbox"]');
      checkboxes.forEach(checkbox => checkbox.checked = false);
    } catch (error) {
      if (error.response) {
        if (error.response.status === 409) {
          setMessage(error.response.data);
        } else if (error.response.status === 400) {
          setErrors(error.response.data);
        }
      } else {
        setMessage('Error al registrar el coche');
      }
    }
  };

  return (
    <>
      <div className='mt-50 mr-50 mb-200 ml-50'>
        <h2>Agregar coche</h2>
        {message && <div className="message">{message}</div>}
        <div className='add-car-form'>
          <form onSubmit={handleSubmit}>
            <div className='add-car-input'>
              <label htmlFor="model">Modelo del coche</label>
              <input 
                type="text" 
                id="model" 
                name="model" 
                value={car.model} 
                onChange={handleChange} 
                required 
              />
              {errors.model && <span className="error">{errors.model}</span>}
            </div>

            <div className='add-car-input'>
              <label htmlFor="categories">Categorías del coche</label>
              <div className="category-options">
                {categories.map((category) => (
                  <div key={category.id} className='category-item'>
                    <input
                      className='form-check-input' 
                      type="checkbox"
                      value={category.id}
                      checked={selectedCategories.includes(category.id)}
                      onChange={() => handleCategoryChange(category.id)}
                    />
                    <label>
                      {category.title}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className='add-car-input'>
              <label htmlFor="transmission">Transmisión del coche</label>
              <input 
                type="text" 
                id="transmission" 
                name="transmission" 
                value={car.transmission} 
                onChange={handleChange} 
                required 
              />
              {errors.transmission && <span className="error">{errors.transmission}</span>}
            </div>

            <div className='add-car-input'>
              <label htmlFor="dailyRentalCost">Costo alquiler por día</label>
              <input 
                type="number" 
                id="dailyRentalCost" 
                name="dailyRentalCost" 
                value={car.dailyRentalCost} 
                onChange={handleChange} 
                required 
              />
              {errors.dailyRentalCost && <span className="error">{errors.dailyRentalCost}</span>}
            </div>

            <div className='add-car-input'>
              <label htmlFor="description">Descripción del coche</label>
              <textarea 
                id="description" 
                name="description" 
                value={car.description} 
                onChange={handleChange} 
                required 
              />
              {errors.description && <span className="error">{errors.description}</span>}
            </div>

            <div className='add-car-input'>
              <label htmlFor="mainPhoto">Foto principal</label>
              <input 
                type="file" 
                id="mainPhoto" 
                name="mainPhoto" 
                onChange={handleFileChange} 
                required 
                ref={mainPhotoRef}
              />
              {errors.mainPhoto && <span className="error">{errors.mainPhoto}</span>}
            </div>

            <div className='add-car-input'>
              <label htmlFor="gallery">Galería de fotos</label>
              <input 
                type="file" 
                id="gallery" 
                name="gallery" 
                multiple 
                onChange={handleFileChange} 
                ref={galleryRef}
              />
              {errors.gallery && <span className="error">{errors.gallery}</span>}
            </div>

            <div className="add-car-input">
              <h5>Características</h5>
              <div className="feature">
                {features.map((feature) => (
                  <div key={feature.id} className='feature-item'>
                    <input 
                      className='form-check-input' 
                      type="checkbox" 
                      id={feature.name}
                      checked={selectedFeatures.includes(feature.id)}
                      onChange={() => handleFeatureChange(feature.id)}
                    />
                    <label htmlFor={feature.name}>
                      <i className={`${feature.icon} feature-icon`}></i>
                      {feature.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <button className='button primary-button' type="submit">Agregar coche</button>
          </form>
        </div>
      </div>
    </>
  );
};

export { AddCar };