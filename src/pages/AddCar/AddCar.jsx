import './AddCar.css';
import { useState } from 'react';
import axios from 'axios';

const AddCar = () => {
  const [car, setCar] = useState({
    model: '',
    category: '',
    transmission: '',
    dailyRentalCost: '',
    description: '',
  });
  const [mainPhoto, setMainPhoto] = useState(null);
  const [gallery, setGallery] = useState([]);
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setErrors({});

    const formData = new FormData();
    Object.keys(car).forEach(key => formData.append(key, car[key]));
    if (mainPhoto) formData.append('mainPhoto', mainPhoto);
    gallery.forEach(photo => formData.append('gallery', photo));

    try {
      const response = await axios.post('http://localhost:8080/api/cars', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setMessage(`Coche registrado exitosamente con ID: ${response.data.id}`);
      setCar({ model: '', category: '', transmission: '', dailyRentalCost: '', description: '' });
      setMainPhoto(null);
      setGallery([]);
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
      <h1>Add car</h1>
      {message && <div className="message">{message}</div>}
      <div className='add-car-form'>
        <form onSubmit={handleSubmit}>
          <div className='add-car-input'>
            <label htmlFor="model">Modelo del auto</label>
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
            <label htmlFor="category">Categoría del auto</label>
            <input 
              type="text" 
              id="category" 
              name="category" 
              value={car.category} 
              onChange={handleChange} 
              required 
            />
            {errors.category && <span className="error">{errors.category}</span>}
          </div>

          <div className='add-car-input'>
            <label htmlFor="transmission">Transmisión del auto</label>
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
            <label htmlFor="description">Descripción del auto</label>
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
            />
            {errors.gallery && <span className="error">{errors.gallery}</span>}
          </div>

          <button className='button primary-button' type="submit">Agregar carro</button>
        </form>
      </div>
    </>
  );
};

export { AddCar };