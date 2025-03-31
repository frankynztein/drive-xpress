// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './contexts/AuthProvider.jsx';
import { registerLocale } from "react-datepicker";
import es from 'date-fns/locale/es';

registerLocale('es', es);

import axios from 'axios';

// Configuración global de Axios
axios.defaults.withCredentials = true;

createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <App />
  </AuthProvider>,
)
