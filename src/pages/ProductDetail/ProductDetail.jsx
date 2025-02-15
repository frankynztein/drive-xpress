import './ProductDetail.css';
import BackArrow from '../../assets/back-arrow-black.png';
import AudiA5 from '../../assets/audi-a5.png';
import AudiQ5 from '../../assets/audi-q5.png';
import Bmw1 from '../../assets/bmw-1.png';




const ProductDetail = () => {
  return (
    <>
      <div className='back-arrow'>
        <img src={BackArrow} alt="" />
        <p>Ir atrás</p>
      </div>
      <div className='product-info'>
        <h2>Mercedes-Benz EQS</h2>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Inventore explicabo porro delectus at, omnis voluptatum sint rerum fugit quod distinctio maxime eius officia, facere recusandae architecto facilis, esse tempora saepe?</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam magnam qui vitae quod? Rem quibusdam distinctio blanditiis nemo molestias hic fuga voluptatibus suscipit porro. Exercitationem obcaecati quas explicabo natus beatae?</p>
        <div className='product-gallery'>
          <img src={AudiA5} alt="" />
          <img src={AudiQ5} alt="" />
          <img src={Bmw1} alt="" />
        </div>
      </div>
    </>
  )
}

export { ProductDetail };