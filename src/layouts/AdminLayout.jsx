import PropTypes from 'prop-types';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/Sidebar/Sidebar';

const AdminLayout = () => {
  return (
    <>
      <Sidebar />
      <section className='admin'>
        <Outlet />
      </section>
    </>
  )
}

AdminLayout.propTypes = {
  children: PropTypes.node.isRequired
};

export { AdminLayout };