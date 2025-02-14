// import { Carousel } from 'react-bootstrap';
import './CategoryCard.css';
import CocheSedan from '../../assets/coche-sedan.png';
import CocheCompacto from '../../assets/coche-compacto.png';
import CocheConvertible from '../../assets/coche-convertible.png';
import CocheSUV from '../../assets/coche-suv.png';
import CocheHibrido from '../../assets/coche-hibrido.png';

const CategoryCard = () => {
  return (
    <>
      <div className='card-wrapper'>
        {/* Sedan */}
        <div className='card'>
          <div className='card-img'>
            <img src={CocheSedan} alt="Coche sedán" />
          </div>
          <div className='card-info'>
            <h3>Sedán</h3>
          </div>
          <div className='card-button'>
            <button className='button primary-button'>Ver más</button>
          </div>
        </div>
        {/* Compacto */}
        <div className='card'>
          <div className='card-img'>
            <img src={CocheCompacto} alt="Coche compacto" />
          </div>
          <div className='card-info'>
            <h3>Compacto</h3>
          </div>
          <div className='card-button'>
            <button className='button primary-button'>Ver más</button>
          </div>
        </div>
        {/* Convertible */}
        <div className='card'>
          <div className='card-img'>
            <img src={CocheConvertible} alt="Coche compacto" />
          </div>
          <div className='card-info'>
            <h3>Convertible</h3>
          </div>
          <div className='card-button'>
            <button className='button primary-button'>Ver más</button>
          </div>
        </div>
        {/* SUV */}
        <div className='card'>
          <div className='card-img'>
            <img src={CocheSUV} alt="Coche compacto" />
          </div>
          <div className='card-info'>
            <h3>SUV</h3>
          </div>
          <div className='card-button'>
            <button className='button primary-button'>Ver más</button>
          </div>
        </div>
        {/* Híbrido */}
        <div className='card'>
          <div className='card-img'>
            <img src={CocheHibrido} alt="Coche compacto" />
          </div>
          <div className='card-info'>
            <h3>Híbrido</h3>
          </div>
          <div className='card-button'>
            <button className='button primary-button'>Ver más</button>
          </div>
        </div>
      </div>

      {/* <Carousel>
        <Carousel.Item className='card-wrapper1'>
          <div className='card'>
            <div className='card-img'>
              <img src={CocheSedan} alt="Coche sedán" />
            </div>
            <div className='card-info'>
              <h3>Sedán</h3>
            </div>
            <div className='card-button'>
              <button>Ver más</button>
            </div>
          </div>
        </Carousel.Item>
        <Carousel.Item className='card-wrapper'>
          <div className='card'>
            <div className='card-img'>
              <img src={CocheCompacto} alt="Coche compacto" />
            </div>
            <div className='card-info'>
              <h3>Compacto</h3>
            </div>
            <div className='card-button'>
              <button>Ver más</button>
            </div>
          </div>
        </Carousel.Item>
      </Carousel> */}
    </>
  )
}

export { CategoryCard };