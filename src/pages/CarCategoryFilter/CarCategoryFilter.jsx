import { useState, useEffect, useMemo } from "react";
import { BsX, BsFunnel, BsChevronDown, BsChevronUp } from "react-icons/bs";
import { useLocation, useNavigate } from 'react-router-dom';
import './CarCategoryFilter.css';

const CarCategoryFilter = () => {
  const [allCars, setAllCars] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [categories, setCategories] = useState([]);
  const [categoryCount, setCategoryCount] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state?.initialFilter) {
      setSelectedCategories([location.state.initialFilter]);
    }
    fetchData();
  }, [location.state?.initialFilter]);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const carsResponse = await fetch('http://localhost:8080/api/cars');
      if (!carsResponse.ok) throw new Error('Error al obtener coches');
      const carsData = await carsResponse.json();
      setAllCars(carsData);
      
      const { uniqueCategories, counts } = processCategoriesFromCars(carsData);
      setCategories(uniqueCategories);
      setCategoryCount(counts);
    } catch (err) {
      console.error('Error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const processCategoriesFromCars = (cars) => {
    const categoryMap = new Map();
    const counts = {};
    
    cars.forEach(car => {
      if (car.categories && car.categories.length > 0) {
        car.categories.forEach(cat => {
          if (!categoryMap.has(cat.id)) {
            categoryMap.set(cat.id, cat);
            counts[cat.id] = 0;
          }
          counts[cat.id]++;
        });
      }
    });
    
    return {
      uniqueCategories: Array.from(categoryMap.values()),
      counts
    };
  };

  const filteredCars = useMemo(() => {
    if (selectedCategories.length === 0) return allCars;
    
    return allCars.filter(car => {
      if (!car.categories || car.categories.length === 0) return false;
      return car.categories.some(cat => selectedCategories.includes(cat.id));
    });
  }, [selectedCategories, allCars]);

  const handleCategoryChange = (categoryId) => {
    setSelectedCategories(prev => 
      prev.includes(categoryId) 
        ? prev.filter(id => id !== categoryId) 
        : [...prev, categoryId]
    );
  };

  const removeFilter = (categoryId) => {
    setSelectedCategories(prev => prev.filter(id => id !== categoryId));
  };

  const clearAllFilters = () => {
    setSelectedCategories([]);
  };

  const getCategoryName = (id) => {
    const category = categories.find(cat => cat.id === id);
    return category ? category.title : 'Categoría';
  };

  if (loading) {
    return <div className="">Cargando...</div>;
  }

  if (error) {
    return (
      <div className="">
        <div className="error-message">Error: {error}</div>
        <button onClick={() => window.location.reload()}>Reintentar</button>
      </div>
    );
  }

  return (
    <div className="">
      <h2 className="page-title">Productos</h2>
      
      <div className="results-bar">
        <p className="results-count">
          Mostrando <span className="count-highlight">{filteredCars.length}</span> de{" "}
          <span className="count-highlight">{allCars.length}</span> coches
        </p>
        
        <button 
          className="filter-button"
          onClick={() => setShowFilters(!showFilters)}
        >
          <BsFunnel className="icon" />
          Filtros
          {showFilters ? <BsChevronUp className="icon" /> : <BsChevronDown className="icon" />}
        </button>
      </div>
      
      {selectedCategories.length > 0 && (
        <div className="filter-tags">
          {selectedCategories.map(categoryId => (
            <div key={categoryId} className="filter-tag">
              {getCategoryName(categoryId)}
              <BsX 
                className="tag-remove" 
                onClick={() => removeFilter(categoryId)} 
              />
            </div>
          ))}
          <button 
            className="button no-background-button"
            onClick={clearAllFilters}
          >
            Limpiar todos
          </button>
        </div>
      )}
      
      <div className="main-grid">
        <div className={`filters-container ${showFilters ? 'active' : ''}`}>
          <div className="filter-panel">
            <div className="filter-content">
              <h3 className="filter-heading">Categorías</h3>
              <div className="separator"></div>
              <div className="filter-scroll">
                <div className="category-list">
                  {categories.map(category => (
                    <div key={category.id} className="category-item">
                      <input 
                        type="checkbox" 
                        id={`category-${category.id}`} 
                        checked={selectedCategories.includes(category.id)}
                        onChange={() => handleCategoryChange(category.id)}
                      />
                      <label 
                        htmlFor={`category-${category.id}`}
                        className="category-label"
                      >
                        <span>{category.title}</span>
                        <span className="category-count">({categoryCount[category.id] || 0})</span>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <div className="products-grid">
            {filteredCars.map(car => (
              <div 
                key={car.id} 
                className="product-card"
                onClick={() => navigate(`/detalles/${car.model}`)}
                style={{ cursor: 'pointer' }}
              >
                <div className="product-image-container">
                  <img 
                    src={`http://localhost:8080/uploads/${car.mainPhotoUrl}`}
                    alt={car.model}
                    className="product-image"
                    width={300}
                    height={300}
                  />
                </div>
                <div className="product-details">
                  <h3 className="product-name">{car.model}</h3>
                  <p className="product-category">
                    {car.categories?.map(c => c.title).join(', ') || 'Sin categoría'}
                  </p>
                  <p className="product-price">{car.dailyRentalCost?.toFixed(2)} €</p>
                </div>
              </div>
            ))}
          </div>
          
          {filteredCars.length === 0 && (
            <div className="no-results">
              <p className="no-results-message">No se encontraron coches con los filtros seleccionados.</p>
              <button 
                className="reset-link"
                onClick={clearAllFilters}
              >
                Limpiar filtros
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export { CarCategoryFilter };