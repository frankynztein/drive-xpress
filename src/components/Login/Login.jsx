import { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import './Login.css';

const Login = () => {
    const { setUser } = useContext(AuthContext);
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const response = await axios.post('http://localhost:8080/api/users/login', {
                email: credentials.email,
                password: credentials.password
            }, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            });

            if (response.data && response.data.email && response.data.isAdmin !== undefined) {
                setUser(response.data);
                localStorage.setItem('user', JSON.stringify(response.data));
                navigate('/');
            } else {
                throw new Error('Respuesta de login inesperada');
            }
        } catch (err) {
            if (axios.isAxiosError(err)) {
                setError(err.response?.data?.message || 'Error en la autenticación');
            } else {
                setError('Error inesperado. Por favor, intenta de nuevo.');
            }
            console.error('Error de login:', err);
        }
    };
    
    

    return (
        <div className="login-container">
            <h2>Iniciar Sesión</h2>
            {error && <div className="error-message">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Correo electrónico</label>
                    <input
                        type="email"
                        placeholder="Correo electrónico"
                        value={credentials.email}
                        onChange={(e) => setCredentials({...credentials, email: e.target.value})}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Contraseña</label>
                    <input
                        type="password"
                        placeholder="Contraseña"
                        value={credentials.password}
                        onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                        required
                    />
                </div>
                <button type="submit" className='button primary-button'>Ingresar</button>
            </form>
        </div>
    );
};

export { Login };