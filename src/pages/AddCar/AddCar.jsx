import './AddCar.css';

const AddCar = () => {
  return (
    <>
      <h1>Add car</h1>
      <div className='add-car-form'>
        <form action="/add-car" method="GET">
          <div className='add-car-input'>
            <label htmlFor="car-model">Modelo del auto</label>
            <input type="text" id="carModel" name="car-model" placeholder="Audi Q5"/>
          </div>

          <div className='add-car-input'>
            <label htmlFor="car-category">Categoría del auto</label>
            <input type="text" id="carCategory" name="car-category" placeholder="Sedán"/>
          </div>

          <div className='add-car-input'>
            <label htmlFor="car-transmission">Transmisión del auto</label>
            <input type="text" id="carTransmission" name="car-transmission" placeholder="Manual"/>
          </div>

          <div className='add-car-input'>
            <label htmlFor="rent">Costo alquiler por día</label>
            <input type="number" id="rent" name="rent" placeholder="50"/>
          </div>

          <div className='add-car-input'>
            <label htmlFor="car-description">Descripción del auto</label>
            <input type="text" id="carDescription" name="car-description" placeholder="Descripción del auto"/>
          </div>

          <div className='add-car-input'>
            <label htmlFor="main-photo">Foto principal</label>
            <input type="file" id="mainPhoto" name="main-photo"/>
          </div>

          <div className='add-car-input'>
            <label htmlFor="gallery">Galería de fotos</label>
            <input type="file" id="gallery" name="gallery"/>
          </div>

          <button className='button primary-button' type="submit">Agregar carro</button>
        </form>
      </div>
    </>
  )
}

export { AddCar };