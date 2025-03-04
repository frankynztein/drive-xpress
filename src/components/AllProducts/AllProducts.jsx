import { useState, useEffect } from 'react';
import './AllProducts.css';

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const productsPerPage = 10;

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
      <h2>Todos los productos</h2>
      <div className="product-list">
        {getCurrentProducts().map((product) => (
          <div key={product.id} className="product-item">
            <img src={`http://localhost:8080/uploads/${product.mainPhotoUrl}`} alt={product.model} />
            <h3>{product.model}</h3>
            <p>Precio por día: ${product.dailyRentalCost}</p>
          </div>
        ))}
      </div>
      <div className="pagination">
        <button onClick={() => paginate(1)} disabled={currentPage === 1}>Inicio</button>
        <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>Anterior</button>
        <span>{currentPage} de {totalPages}</span>
        <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages}>Siguiente</button>
        <button onClick={() => paginate(totalPages)} disabled={currentPage === totalPages}>Último</button>
      </div>
    </div>
  );
};

export { AllProducts };
