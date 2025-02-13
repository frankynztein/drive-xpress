import PropTypes from 'prop-types';
import { Header } from '../components/layout/Header/Header'
import { Footer } from '../components/layout/Footer/Footer';

const MainLayout = ({ children }) => {
  return (
    <>
      <Header />
      <main className='main'>
        {children}
      </main>
      <Footer />
    </>
  )
}

MainLayout.propTypes = {
  children: PropTypes.node.isRequired
};

export { MainLayout };