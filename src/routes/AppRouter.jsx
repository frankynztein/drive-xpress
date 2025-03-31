// #ToDo:
//  - Crear página de Not Found

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MainLayout } from '../layouts/MainLayout';
import { AdminLayout } from '../layouts/AdminLayout';

import { Home } from '../pages/Home/Home';
import { Register } from '../components/Register/Register';
import { Admin } from '../pages/Admin/Admin';
import { AddCar } from '../pages/AddCar/AddCar';
import { ProductList } from '../pages/ProductList/ProductList';
import { ProductDetail } from '../pages/ProductDetail/ProductDetail';
import { Login } from '../components/Login/Login';
import { UserInfo } from '../pages/UserInfo/UserInfo';
import { PrivateRoute } from '../utils/PrivateRoute';
import { UsersListPage } from '../pages/UsersListPage/UsersListPage';
import { CarAssets } from '../pages/CarAssets/CarAssets';
import { CarCategory } from '../pages/CarCategory/CarCategory';
import { CarCategoryFilter } from '../pages/CarCategoryFilter/CarCategoryFilter';
import { SearchResults } from '../pages/SearchResults/SearchResults';
import { ReservationFlow } from '../components/ReservationFlow/ReservationFlow';
// import { NotFound } from '../pages/NotFound/NotFound'; // Nuevo componente

const AppRouter = () => {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route element={<PrivateRoute />}>
            <Route path="/user-info" element={<UserInfo />} />
          </Route>
          <Route element={<PrivateRoute requiredAdmin={true} />}>
            <Route path="/administracion" element={<AdminLayout />}>
              <Route index element={<Admin />} />
              <Route path="agregar-coche" element={<AddCar />} />
              <Route path="lista-de-coches" element={<ProductList />} />
              <Route path="lista-de-usuarios" element={<UsersListPage />} />
              <Route path="caracteristicas-de-coches" element={<CarAssets />} />
              <Route path="categorias-de-coches" element={<CarCategory />} />
            </Route>
          </Route>
          <Route path="/detalles/:model" element={<ProductDetail />} />
          <Route path="/categorias" element={<CarCategoryFilter />} />
          <Route path="/categorias/:categoryId" element={<CarCategoryFilter />} />
          <Route path="/resultados-busqueda" element={<SearchResults />} />
          <Route path="/reservar/:id" element={<ReservationFlow />} />
          {/* <Route path="/confirmar-reserva/:id" element={<ConfirmReservation />} /> */}
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
};

export { AppRouter };