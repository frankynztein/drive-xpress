import { useState, useEffect } from 'react';
import { Carousel } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './CategoryCard.css';

const CategoryCard = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [groupSize, setGroupSize] = useState(4);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/cars');
        const data = await response.json();
        const uniqueCategories = extractCategories(data);
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const extractCategories = (cars) => {
    const categoryMap = new Map();
    cars.forEach(car => {
      car.categories?.forEach(cat => {
        if (!categoryMap.has(cat.id)) {
          categoryMap.set(cat.id, cat);
        }
      });
    });
    return Array.from(categoryMap.values());
  };

  const handleViewMore = (categoryId) => {
    navigate('/categorias', {
      state: { initialFilter: categoryId }
    });
  };

    useEffect(() => {
      const updateGroupSize = () => {
        if (window.innerWidth <= 767) {
          setGroupSize(1);
        } else if (window.innerWidth <= 1024) {
          setGroupSize(2);
        } else {
          setGroupSize(4);
        }
      };
  
      updateGroupSize();
      window.addEventListener('resize', updateGroupSize);
  
      return () => window.removeEventListener('resize', updateGroupSize);
    }, []);
  

    const categoryGroups = [];
    for (let i = 0; i < categories.length; i += groupSize) {
      categoryGroups.push(categories.slice(i, i + groupSize));
    }

  if (loading) {
    return <div className="text-center py-5">Cargando categorías...</div>;
  }

  return (
    <div className="category-carousel-container">
      <Carousel
        activeIndex={activeIndex}
        onSelect={setActiveIndex}
        indicators={categoryGroups.length > 1}
        interval={null}
        controls={categoryGroups.length > 1}
      >
        {categoryGroups.map((group, index) => (
          <Carousel.Item key={index}>
            <div className="d-flex flex-lg-nowrap flex-wrap justify-content-center gap-3 px-3">
              {group.map(category => {
              return (
                <div key={category.id} className="card">
                  <div className="card-img-top d-flex justify-content-center align-items-center">
                    <img 
                      src={`http://localhost:8080/uploads/${category.imageUrl}`} 
                      alt={category.title}
                      className="img-fluid"
                      style={{ height: 'unset', objectFit: 'cover' }}
                      onError={(e) => {
                        e.target.src = 'http://localhost:8080/uploads/default-image.jpg'; 
                      }}
                    />
                  </div>
                  <div className="card-body text-center">
                    <h3 className="card-title">{category.title}</h3>
                    <button 
                      className="button primary-button"
                      onClick={() => handleViewMore(category.id)}
                    >
                      Ver más
                    </button>
                  </div>
                </div>
              )}
              )}
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export { CategoryCard };