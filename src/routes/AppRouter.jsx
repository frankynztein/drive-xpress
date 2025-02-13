import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MainLayout } from '../layouts/MainLayout';

// Importa tus páginas aquí
import { Home } from '../pages/Home/Home';
import { Admin } from '../pages/Admin/Admin';
// import Login from '../pages/Login';
// import CarList from '../pages/CarList';
// import Reservation from '../pages/Reservation';
// etc...

const AppRouter = () => {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/administracion" element={<Admin />} />
          {/* Ejemplo de otras rutas que podrías necesitar:
          <Route path="/login" element={<Login />} />
          <Route path="/cars" element={<CarList />} />
          <Route path="/reservation" element={<Reservation />} /> 
          */}
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
};

export { AppRouter };