import './CarAssetsList.css';
import { useEffect, useState, useContext } from "react";
import { AuthContext } from '../../contexts/AuthContext';
import axios from "axios";
import { Modal, Button } from 'react-bootstrap';

const CarAssetsList = () => {
  const { user } = useContext(AuthContext);
  const [features, setFeatures] = useState([]);
  const [name, setName] = useState("");
  const [icon, setIcon] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [featureToDelete, setFeatureToDelete] = useState(null);
  const [carsCount, setCarsCount] = useState(0);
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    
    fetchFeatures();
  }, [user]);


  useEffect(() => {
    let timer;
    if (showSuccessModal) {
      timer = setTimeout(() => {
        setShowSuccessModal(false);
      }, 1000);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [showSuccessModal]);

  const fetchFeatures = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/features", {
        withCredentials: true,
      });
      setFeatures(response.data);
    } catch (error) {
      setError("Error al cargar las características");
      console.error("Error fetching features:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    
    const url = editingId
      ? `http://localhost:8080/api/features/${editingId}`
      : "http://localhost:8080/api/features";

    try {
      if (editingId) {
        await axios.put(url, { name, icon }, { withCredentials: true });
        setSuccessMessage(`"${name}" actualizada correctamente`);
      } else {
        await axios.post(url, { name, icon }, { withCredentials: true });
        setSuccessMessage(`"${name}" creada correctamente`);
      }

      setName("");
      setIcon("");
      setEditingId(null);
      setShowSuccessModal(true);
      fetchFeatures();
    } catch (error) {
      const errorMessage = error.response?.data?.message || 
                            error.response?.data || 
                            "Error al guardar la característica";
      setError(errorMessage);
      console.error("Error saving feature:", error);
    }
  };

  const handleEdit = (feature) => {
    setEditingId(feature.id);
    setName(feature.name);
    setIcon(feature.icon);
    setError(null);
  };

  const confirmDelete = async (feature) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/features/${feature.id}/cars-count`,
        { withCredentials: true }
      );
      setCarsCount(response.data);
      setFeatureToDelete(feature);
      setShowDeleteModal(true);
    } catch (error) {
      if (error.response?.status === 404) {
        setCarsCount(0);
        setFeatureToDelete(feature);
        setShowDeleteModal(true);
      } else {
        setError("Error al obtener información de coches asociados");
        console.error("Error fetching cars count:", error);
      }
    }
  };

  const handleDelete = async () => {
    setShowDeleteModal(false);
    setError(null);
    
    try {
      await axios.delete(
        `http://localhost:8080/api/features/${featureToDelete.id}`, 
        { withCredentials: true }
      );
      setSuccessMessage(
        `"${featureToDelete.name}" eliminada correctamente. ` +
        `Se actualizaron ${carsCount} coche(s) asociado(s).`
      );
      setShowSuccessModal(true);
      fetchFeatures();
    } catch (error) {
      let errorMessage = `No se pudo eliminar "${featureToDelete.name}"`;
      
      if (error.response) {
        if (error.response.status === 404) {
          errorMessage = `La característica "${featureToDelete.name}" no existe`;
        } else if (error.response.data && error.response.data.message) {
          errorMessage = error.response.data.message;
        }
      }
      
      setError(errorMessage);
      console.error("Error deleting feature:", error);
    }
  };

  const resetForm = () => {
    setName("");
    setIcon("");
    setEditingId(null);
    setError(null);
  };

  return (
    <div className="car-assets-container">
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="mb-4">
        <div className="row g-3">
          <div className="col-md-5">
            <input
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nombre"
              required
            />
          </div>
          <div className="col-md-5">
            <input
              className="form-control"
              value={icon}
              onChange={(e) => setIcon(e.target.value)}
              placeholder="Ícono (ej. fa-car)"
              required
            />
          </div>
          <div className="col-md-2">
            <button type="submit" className="button primary-button me-2">
              {editingId ? "Actualizar" : "Agregar"}
            </button>
            {editingId && (
              <button
                type="button"
                className="btn btn-secondary"
                onClick={resetForm}
              >
                Cancelar
              </button>
            )}
          </div>
        </div>
      </form>

      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Ícono</th>
              <th>Nombre</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {features.map((feature) => (
              <tr key={feature.id}>
                <td>
                  <i className={feature.icon}></i>
                </td>
                <td>{feature.name}</td>
                <td>
                  <button 
                    className="button tertiary-button btn-sm me-2" 
                    onClick={() => handleEdit(feature)}
                  >
                    Editar
                  </button>
                  <button 
                    className="button secondary-button btn-sm" 
                    onClick={() => confirmDelete(feature)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal de confirmación para eliminar */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Estás seguro que deseas eliminar la característica: 
          <br />
          <strong className="fs-5">{`"${featureToDelete?.name}"`}</strong>?
          <br /><br />
          Esta acción afectará a <strong>{carsCount} coche(s)</strong> que tienen esta característica.
          <br />
          <span className="text-danger">Esta acción no se puede deshacer.</span>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Confirmar Eliminación
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal de éxito */}
      <Modal show={showSuccessModal} onHide={() => setShowSuccessModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Operación exitosa</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {successMessage}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={() => setShowSuccessModal(false)}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export { CarAssetsList };