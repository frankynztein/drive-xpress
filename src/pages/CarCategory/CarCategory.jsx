import './CarCategory.css';
import { useEffect, useState, useContext, useRef } from "react";
import { AuthContext } from '../../contexts/AuthContext';
import axios from "axios";
import { Modal, Button, Alert } from 'react-bootstrap';

const CarCategory = () => {
  const { user } = useContext(AuthContext);
  const [categories, setCategories] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const fileInputRef = useRef(null);
  
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const [deleteStatus, setDeleteStatus] = useState({
    loading: false,
    success: false,
    message: ''
  });

  useEffect(() => {
    fetchCategories();
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    if (imageFile) {
      formData.append('image', imageFile);
    }

    const url = editingId
      ? `http://localhost:8080/api/categories/${editingId}`
      : "http://localhost:8080/api/categories";

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      withCredentials: true
    };

    try {
      if (editingId) {
        await axios.put(url, formData, config);
      } else {
        await axios.post(url, formData, config);
      }

      resetForm();
      fetchCategories();
    } catch (error) {
      console.error("Error saving category:", error.response?.data || error.message);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setImageFile(null);
    setEditingId(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleEdit = (category) => {
    setEditingId(category.id);
    setTitle(category.title);
    setDescription(category.description);
  };

  const confirmDelete = (category) => {
    setCategoryToDelete(category);
    setDeleteStatus({ loading: false, success: false, message: '' });
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    if (!categoryToDelete) return;
    
    setDeleteStatus({ ...deleteStatus, loading: true });
    
    try {
      await axios.delete(`http://localhost:8080/api/categories/${categoryToDelete.id}`, {
        withCredentials: true,
      });
      
      setDeleteStatus({
        loading: false,
        success: true,
        message: `Categoría "${categoryToDelete.title}" eliminada correctamente`
      });
      
      fetchCategories();
      setTimeout(() => {
        setShowDeleteModal(false);
      }, 1000);
    } catch (error) {
      console.error("Error deleting category:", error.response?.data || error.message);
      setDeleteStatus({
        loading: false,
        success: false,
        message: error.response?.data?.message || "Error al eliminar la categoría"
      });
    }
  };

  const handleCloseModal = () => {
    setShowDeleteModal(false);
    if (deleteStatus.success) {
      setDeleteStatus({ loading: false, success: false, message: '' });
      setCategoryToDelete(null);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/categories", {
        withCredentials: true,
      });
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error.response?.data || error.message);
    }
  };

  return (
    <div className="category-admin-container">
      <h2>Categorías de coches</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nombre:</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Nombre"
            required
          />
        </div>
        
        <div className="form-group">
          <label>Descripción:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Descripción"
            required
          />
        </div>
        
        <div className="form-group">
          <label>Imagen:</label>
          <input
            type="file"
            onChange={handleFileChange}
            accept="image/*"
            ref={fileInputRef}
            required={!editingId}
          />
          {editingId && (
            <p className="image-note">Dejar en blanco para mantener la imagen actual</p>
          )}
        </div>
        
        <div className="form-actions">
          <button type="submit" className="button primary-button">
            {editingId ? "Actualizar" : "Agregar"}
          </button>
          <button
            type="button"
            className="button no-background-button"
            onClick={resetForm}
          >
            Cancelar
          </button>
        </div>
      </form>

      <div className="categories-table table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Título</th>
              <th>Descripción</th>
              <th>Imagen</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category.id}>
                <td>{category.title}</td>
                <td>{category.description}</td>
                <td>
                  {category.imageUrl && (
                    <img 
                      src={`http://localhost:8080/uploads/${category.imageUrl}`} 
                      alt={category.title}
                      className="category-thumbnail"
                      onError={(e) => {
                        e.target.src = '/default-car.png';
                      }}
                    />
                  )}
                </td>
                <td>
                  <button 
                    className="button tertiary-button btn-sm me-2" 
                    onClick={() => handleEdit(category)}
                  >
                    Editar
                  </button>
                  <button 
                    className="button secondary-button btn-sm" 
                    onClick={() => confirmDelete(category)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal de confirmación */}
      <Modal show={showDeleteModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            {deleteStatus.success ? 'Operación Exitosa' : 'Confirmar Eliminación'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {deleteStatus.success ? (
            <Alert variant="success" className="mb-0">
              {deleteStatus.message}
            </Alert>
          ) : (
            <>
              <p>{`¿Estás seguro de eliminar la categoría "${categoryToDelete?.title}"?`}</p>
              
              {categoryToDelete?.cars?.length > 0 && (
                <Alert variant="warning" className="mt-2">
                  <strong>Advertencia:</strong> Esta categoría tiene {categoryToDelete.cars.length} coche(s) asociado(s).
                  <br />
                  Los coches serán desvinculados de esta categoría.
                </Alert>
              )}
              
              {deleteStatus.message && !deleteStatus.success && (
                <Alert variant="danger" className="mt-2">
                  {deleteStatus.message}
                </Alert>
              )}
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          {deleteStatus.success ? (
            <Button variant="success" onClick={handleCloseModal}>
              Cerrar
            </Button>
          ) : (
            <>
              <Button 
                variant="secondary" 
                onClick={handleCloseModal}
                disabled={deleteStatus.loading}
              >
                Cancelar
              </Button>
              <Button 
                variant="danger" 
                onClick={handleDelete}
                disabled={deleteStatus.loading}
              >
                {deleteStatus.loading ? 'Eliminando...' : 'Eliminar'}
              </Button>
            </>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export { CarCategory };