// import { Carousel } from 'react-bootstrap';
import './CategoryCard.css';
import CocheSedan from '../../assets/peugeot-208.png';
import CocheCompacto from '../../assets/peugeot-308.png';
import CocheCoupe from '../../assets/audi-a5-sportback.png';
import CocheSUV from '../../assets/peugeot-2008.png';
import CocheFamiliar from '../../assets/peugeot-2008.png';

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
        {/* Coupe */}
        <div className='card'>
          <div className='card-img'>
            <img src={CocheCoupe} alt="Coche compacto" />
          </div>
          <div className='card-info'>
            <h3>Coupé</h3>
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
        {/* Eléctrico */}
        <div className='card'>
          <div className='card-img'>
            <img src={CocheFamiliar} alt="Coche compacto" />
          </div>
          <div className='card-info'>
            <h3>Familiar</h3>
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