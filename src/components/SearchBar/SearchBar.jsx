import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Modal } from 'react-bootstrap';
import axios from 'axios';
import './SearchBar.css';

const SearchBar = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [dateRange, setDateRange] = useState([null, null]);
  const [suggestions, setSuggestions] = useState([]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [categories, setCategories] = useState([]);
  const [startDate, endDate] = dateRange;

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/categories');
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    
    fetchCategories();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    
    try {
      const params = {
        startDate: startDate?.toISOString(),
        endDate: endDate?.toISOString()
      };

      if (searchTerm.trim()) {
        params.category = searchTerm.trim();
      }

      console.log("Parámetros enviados:", params);

      const response = await axios.get('http://localhost:8080/api/cars/available', { 
        params
      });

      console.log("Respuesta del servidor:", response.data);

      navigate('/resultados-busqueda', { 
        state: { 
          cars: response.data,
          searchParams: { 
            category: searchTerm, 
            startDate, 
            endDate 
          }
        }
      });
      
    } catch (error) {
      console.error("Error fetching available cars:", error);
      alert("Error al buscar coches. Por favor intenta nuevamente.");
    }
  };

  const handleSearchTermChange = (value) => {
    setSearchTerm(value);
    
    if (value.trim().length > 0) {
      axios.get('http://localhost:8080/api/categories/search', {
        params: { term: value },
        withCredentials: true
      })
      .then(response => {
        setSuggestions(response.data.map(cat => ({
          value: cat.title,
          original: cat.title
        })));
      })
      .catch(error => {
        if (error.response?.status === 403) {
          console.error("Acceso no autorizado - Verifica tu autenticación");
        } else {
          console.error("Error searching categories:", error);
        }
        setSuggestions([]);
      });
    } else {
      setSuggestions([]);
    }
  };

  const formatSelectedDates = () => {
    if (!startDate && !endDate) return "Seleccionar fechas";
    if (startDate && !endDate) return `${startDate.toLocaleDateString('es')} - Seleccionar fin`;
    return `${startDate.toLocaleDateString('es')} - ${endDate.toLocaleDateString('es')}`;
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion.original);
    setSuggestions([]);
  };

  return (
    <div className="search-bar">
      <h2>Encuentra el coche perfecto para tu viaje</h2>
      <p>Busca por categoría</p>
      
      <form onSubmit={handleSearch}>
        <div className='search-bar-input'>
          <label htmlFor="car-search">Buscar por categoría</label>
          <input 
            type="text" 
            id="car-search"
            value={searchTerm}
            onChange={(e) => handleSearchTermChange(e.target.value)}
            placeholder="Ej: SUV, Deportivo, Familiar"
            autoComplete="off"
          />
          {suggestions.length > 0 && (
            <ul className="suggestions-list">
              {suggestions.map((item, index) => (
                <li 
                  key={index} 
                  onClick={() => handleSuggestionClick(item)}
                >
                  {item.original}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className='search-bar-input'>
          <label>Rango de fechas</label>
          <button
            type="button"
            className="date-picker-button"
            onClick={() => setShowDatePicker(true)}
          >
            {formatSelectedDates()}
          </button>
        </div>

        <Modal 
          show={showDatePicker} 
          onHide={() => setShowDatePicker(false)}
          centered
          size="lg"
        >
          <Modal.Header closeButton>
            <Modal.Title>Seleccionar fechas</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <DatePicker
              selectsRange
              startDate={startDate}
              endDate={endDate}
              onChange={(update) => {
                setDateRange(update);
                if (update[0] && update[1]) {
                  setShowDatePicker(false);
                }
              }}
              minDate={new Date()}
              monthsShown={2}
              inline
              showPreviousMonths
              dateFormat="dd/MM/yyyy"
              calendarClassName="dual-calendar"
              locale="es"
            />
          </Modal.Body>
          <Modal.Footer>
            <button 
              className='button tertiary-button'
              type="button" 
              onClick={() => setShowDatePicker(false)}
            >
              Cerrar
            </button>
            <button 
              className='button primary-button'
              type="button" 
              onClick={() => setShowDatePicker(false)}
              disabled={!startDate || !endDate}
            >
              Confirmar fechas
            </button>
          </Modal.Footer>
        </Modal>

        <button 
          className='button primary-button' 
          type="submit"
          disabled={!startDate || !endDate}
        >
          Realizar búsqueda
        </button>
      </form>
    </div>
  );
};

export { SearchBar };