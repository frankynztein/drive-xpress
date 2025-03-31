import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { AuthContext } from './AuthContext';
import axios from 'axios';

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const loadUserData = async () => {
            const storedUser = localStorage.getItem('user');
            if (storedUser) {
                try {
                    const parsedUser = JSON.parse(storedUser);
                    setUser(parsedUser);
                    await fetchFavorites(parsedUser.id);
                } catch (error) {
                    console.error("Error parsing user data:", error);
                    localStorage.removeItem('user');
                }
            }
        };
        loadUserData();
    }, []);

    const fetchFavorites = async (userId) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/favorites`, {
                params: { userId },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`, // Si usas JWT
                },
            });
            setFavorites(response.data);
        } catch (error) {
            console.error("Error fetching favorites:", error);
        }
    };

    const login = async (userData) => {
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
        await fetchFavorites(userData.id);
    };

    const logout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        setUser(null);
        setFavorites([]);
    };

    const toggleFavorite = async (productId) => {
        try {
            const response = await axios.post(
                `http://localhost:8080/api/favorites/toggle/${productId}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                }
            );
            if (response.data.isFavorite) {
                setFavorites(prev => [...prev, response.data.product]);
            } else {
                setFavorites(prev => prev.filter(fav => fav.id !== productId));
            }
        } catch (error) {
            console.error("Error toggling favorite:", error);
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                login,
                logout,
                favorites,
                toggleFavorite, // Reemplaza addFavorite/removeFavorite
                isFavorite: (productId) => favorites.some(fav => fav.id === productId),
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};