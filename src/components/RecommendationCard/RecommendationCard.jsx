// #ToDo: 
// - Que el card completo lleve a los detalles del coche, no solo el botón
// - De acuerdo a las user stories, el máximo de productos a mostrar debe ser 10, por lo tanto, puden ser menos porque 10 parece ser mucho

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './RecommendationCard.css';

const RecommendationCard = () => {
    const [recommendations, setRecommendations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRecommendations = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/cars');
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();

                // Obtener elementos aleatorios de array
                const getRandom = (arr, n) => {
                    let result = new Array(n);
                    let len = arr.length;
                    let taken = new Array(len);
                    if (n > len)
                        throw new Error("getRandom: more elements taken than available");
                    while (n--) {
                        let x = Math.floor(Math.random() * len);
                        result[n] = arr[x in taken ? taken[x] : x];
                        taken[x] = --len in taken ? taken[len] : len;
                    }
                    return result;
                }

                // 10 recomendaciones aleatorias
                const randomRecommendations = getRandom(data, Math.min(10, data.length));

                setRecommendations(randomRecommendations);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchRecommendations();
    }, []);

    if (loading) return <div>Cargando recomendaciones...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <>
            <div className='recomm-card-wrapper'>
                {recommendations.map((car) => {
                    return (
                        <div className='recomm-card' key={car.id}>
                            <div className='recomm-card-img'>
                                <img src={`http://localhost:8080/uploads/${car.mainPhotoUrl}`} alt={car.model} />
                            </div>
                            <div className='recomm-card-info'>
                                <div className='recomm-card-info--car'>
                                    <h3>{car.model}</h3>
                                    <p><span>{car.category}</span> <span>{car.transmission}</span></p>
                                </div>
                                <div className='recomm-card-info--rent'>
                                    <p>Kilómetros ilimitados disponibles</p>
                                    <p><span>$ {car.dailyRentalCost}/día</span></p>
                                </div>
                            </div>
                            <div className='recomm-card-button'>
                                <Link to={`/detalles/${car.model}`}>
                                    <button className='button primary-button'>Seleccionar</button>
                                </Link>
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    );
}

export { RecommendationCard };