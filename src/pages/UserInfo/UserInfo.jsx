import './UserInfo.css';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { ListGroup, Button, Badge, Card, Spinner } from 'react-bootstrap';
import { FaTrash, FaHeart } from 'react-icons/fa';
import axios from 'axios';

const UserInfo = () => {
    const { user } = useContext(AuthContext);
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    console.log(favorites);

    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/favorites`, {
                    params: { userId: user.id },
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    }
                });
                console.log(response.data)
                setFavorites(response.data.map(fav => ({
                    id: fav.car.id,
                    name: fav.car.model,
                    description: fav.car.description,
                    image: fav.car.main_photo_url
                })));
            } catch (err) {
                setError("Error al cargar favoritos");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        if (user) {
            fetchFavorites();
        }
    }, [user]);

    const handleRemoveFavorite = async (carId) => {
        try {
            await axios.post(
                `http://localhost:8080/api/favorites/toggle/${carId}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    }
                }
            );
            setFavorites(prev => prev.filter(fav => fav.id !== carId));
        } catch (err) {
            console.error("Error al eliminar favorito:", err);
        }
    };

    if (!user) {
        return <div>No se pudo encontrar al usuario</div>;
    }

    if (loading) {
        return <Spinner animation="border" />;
    }

    if (error) {
        return <div className="text-danger">{error}</div>;
    }

    return (
        <div className="user-info-container">
            <Card className="mb-4">
                <Card.Body>
                    <Card.Title>Información del Usuario</Card.Title>
                    <Card.Text>
                        <strong>Nombre:</strong> {user.firstName}<br />
                        <strong>Apellido:</strong> {user.lastName}<br />
                        <strong>Correo:</strong> {user.email}
                    </Card.Text>
                </Card.Body>
            </Card>

            <Card>
                <Card.Body>
                    <Card.Title>
                        <FaHeart className="text-danger me-2" />
                        Mis favoritos
                        <Badge bg="secondary" className="ms-2">
                            {favorites.length}
                        </Badge>
                    </Card.Title>

                    {favorites.length > 0 ? (
                        <ListGroup variant="flush">
                            {favorites.map((car) => (
                                <ListGroup.Item key={car.id} className="d-flex justify-content-between align-items-center">
                                    <div className="d-flex align-items-center">
                                        <img 
                                            src={`http://localhost:8080/uploads/${car.mainPhotoUrl}`} 
                                            alt={car.name}
                                            style={{ width: '80px', height: '60px', objectFit: 'cover', marginRight: '15px' }}
                                        />
                                        <div>
                                            <h5>{car.name}</h5>
                                            {car.description && (
                                                <p className="mb-0 text-muted">
                                                    {car.description.substring(0, 60)}...
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                    <Button 
                                        variant="outline-danger" 
                                        size="sm"
                                        onClick={() => handleRemoveFavorite(car.id)}
                                        title="Eliminar de favoritos"
                                    >
                                        <FaTrash />
                                    </Button>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    ) : (
                        <Card.Text className="text-muted">
                            No tienes coches favoritos aún.
                        </Card.Text>
                    )}
                </Card.Body>
            </Card>
        </div>
    );
};

export { UserInfo };