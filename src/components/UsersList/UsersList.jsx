import { useEffect, useState, useContext } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import { AuthContext } from '../../contexts/AuthContext';
import axios from 'axios';

const UsersList = () => {
  const { user } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log('Current user:', user);
    console.log('Is admin:', user?.isAdmin);
    console.log('User roles:', user?.roles);
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    setIsLoading(true);
    const currentUser = JSON.parse(localStorage.getItem('user'));
    console.log('Fetching users with user:', currentUser);
    
    axios.get('http://localhost:8080/api/users', { 
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        console.log('Users response:', response.data);
        setUsers(response.data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
        console.error('Error response:', error.response?.data);
        setIsLoading(false);
      });
  };

  const handleDelete = (user) => {
    setUserToDelete(user);
    setShowModal(true);
  };

  const confirmDelete = () => {
    axios.delete(`http://localhost:8080/api/users/${userToDelete.id}`, { withCredentials: true })
      .then(() => {
        setUsers(users.filter(u => u.id !== userToDelete.id));
        setShowModal(false);
      })
      .catch(error => console.error('Error deleting user:', error));
  };

const handleAdminChange = (userId, newIsAdmin) => {
  console.log(`Cambiando admin para usuario ${userId} a ${newIsAdmin}`);

  axios.put(`http://localhost:8080/api/users/${userId}/admin`, { isAdmin: newIsAdmin }, { 
    withCredentials: true,
    headers: { 'Content-Type': 'application/json' }
  })
    .then(() => {
      setUsers(prevUsers =>
        prevUsers.map(user => 
          user.id === userId ? { ...user, isAdmin: newIsAdmin } : user
        )
      );
    })
    .catch(error => {
      console.error('Error actualizando admin:', error);
    });
};

  return (
    <div className='mt-4 mx-4'>
      {isLoading ? (
        <p>Cargando usuarios...</p>
      ) : (
        <div className='table-container'>
          <Table striped bordered hover>
            <thead className='thead-light'>
              <tr>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Email</th>
                <th>Admin</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.email}</td>
                  <td>
                    <Form.Check 
                      type="switch"
                      id={`admin-switch-${user.id}`}
                      checked={user.admin}
                      onChange={(e) => handleAdminChange(user.id, e.target.checked)}
                    />
                  </td>
                  <td>
                    <button className='button secondary-button' onClick={() => handleDelete(user)}>
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Está seguro de que desea eliminar a {userToDelete?.firstName} {userToDelete?.lastName}?
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={() => setShowModal(false)}>
            Cancelar
          </Button>
          <Button variant='danger' onClick={confirmDelete}>
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export { UsersList };