// #ToDo:
// - Todas las páginas de la sección admin no deben verse en versión mobile

import './AdminLayout.css';

import PropTypes from 'prop-types';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/Sidebar/Sidebar';

const AdminLayout = () => {
  return (
    <>
      <div className='admin-layout'>
        <Sidebar />
        <section className='admin-inner-pages'>
          <Outlet />
        </section>
      </div>
    </>
  )
}

AdminLayout.propTypes = {
  children: PropTypes.node.isRequired
};

export { AdminLayout };