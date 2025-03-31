// #ToDo:
// - Que el card lleve a los detalles del coche
// - Mejorar el aspecto de esta sección o del card

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AllProducts.css';

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const productsPerPage = 10;
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/cars');
      const data = await response.json();
      setProducts(data);
      setTotalPages(Math.ceil(data.length / productsPerPage));
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const getCurrentProducts = () => {
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    return products.slice(indexOfFirstProduct, indexOfLastProduct);
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className='all-products'>
      <h2 className='mb-50'>Todos los productos</h2>
      <div className="product-list">
        {getCurrentProducts().map((product) => (
          <div 
            key={product.id} 
            className="product-item"
            onClick={() => navigate(`/detalles/${product.model}`)}
            style={{ cursor: 'pointer' }}
          >
            <img src={`http://localhost:8080/uploads/${product.mainPhotoUrl}`} alt={product.model} />
            <h3>{product.model}</h3>
          </div>
        ))}
      </div>
      <div className="pagination">
        <button className='button' onClick={() => paginate(1)} disabled={currentPage === 1}>Inicio</button>
        <button className='button' onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>Anterior</button>
        <span>{currentPage} de {totalPages}</span>
        <button className='button' onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages}>Siguiente</button>
        <button className='button' onClick={() => paginate(totalPages)} disabled={currentPage === totalPages}>Último</button>
      </div>
    </div>
  );
};

export { AllProducts };