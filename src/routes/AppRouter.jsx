import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MainLayout } from '../layouts/MainLayout';
import { AdminLayout } from '../layouts/AdminLayout';

import { Home } from '../pages/Home/Home';
import { Admin } from '../pages/Admin/Admin';
import { AddCar } from '../pages/AddCar/AddCar';
import { ProductList } from '../pages/ProductList/ProductList';
import { ProductDetail } from '../pages/ProductDetail/ProductDetail';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/administracion" element={<AdminLayout />}>
            <Route index element={<Admin />} />
            <Route path="agregar-coche" element={<AddCar />} />
            <Route path="lista-de-coches" element={<ProductList />} />
          </Route>
          <Route path="/detalles/:model" element={<ProductDetail />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
};

export { AppRouter };