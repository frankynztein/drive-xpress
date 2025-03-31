import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './SearchResults.css';
import '../../components/RecommendationCard/RecommendationCard.css';

const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useState({});

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const queryParams = {
      category: params.get('category'),
      startDate: params.get('startDate'),
      endDate: params.get('endDate')
    };
    setSearchParams(queryParams);

    const fetchCars = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/cars/available', {
          params: {
            category: location.state?.searchParams?.category,
            startDate: location.state?.searchParams?.startDate?.toISOString(),
            endDate: location.state?.searchParams?.endDate?.toISOString()
          }
        });
        setCars(response.data);
      } catch (error) {
        console.error("Error fetching cars:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCars();
  }, [location.search]);

  if (loading) {
    return <div className="loading">Cargando resultados...</div>;
  }

  return (
    <div className="search-results-container">
      <h2>Resultados de búsqueda</h2>
      <div className="search-params">
        {searchParams.category && <p>Categoría: {searchParams.category}</p>}
        {searchParams.startDate && <p>Desde: {new Date(searchParams.startDate).toLocaleDateString()}</p>}
        {searchParams.endDate && <p>Hasta: {new Date(searchParams.endDate).toLocaleDateString()}</p>}
      </div>

      {cars.length === 0 ? (
        <div className="no-results">
          <p>No se encontraron coches con los criterios seleccionados.</p>
          <button onClick={() => navigate('/')}>Volver a buscar</button>
        </div>
      ) : (
        <div className="recomm-card-wrapper">
          {cars.map(car => (
            <div className="recomm-card" key={car.id}>
              <div 
                className="card-clickable" 
                onClick={() => navigate(`/detalles/${car.model}`)}
              >
                <div className="recomm-card-img">
                  <img 
                    src={`http://localhost:8080/uploads/${car.mainPhotoUrl}`} 
                    alt={car.model}
                    onError={(e) => {
                      e.target.onerror = null; 
                      e.target.src = '/default-image.jpg';
                    }}
                  />
                </div>
                <div className="recomm-card-info">
                  <div className="recomm-card-info--car">
                    <h3>{car.model}</h3>
                    <p>
                      {car.categories?.map(cat => (
                        <span key={cat.id}>{cat.name}</span>
                      ))}
                      <span>{car.transmission}</span>
                    </p>
                  </div>
                  <div className="recomm-card-info--rent">
                    <p>Kilómetros ilimitados</p>
                    <p><span>$ {car.dailyRentalCost}/día</span></p>
                    {searchParams.startDate && searchParams.endDate && (
                      <p className="rental-period">
                        {new Date(searchParams.startDate).toLocaleDateString()} - {new Date(searchParams.endDate).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <div className="recomm-card-button">
                <button 
                  className="button primary-button"
                  onClick={() => navigate(`/detalles/${car.model}`)}
                >
                  Seleccionar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export { SearchResults };