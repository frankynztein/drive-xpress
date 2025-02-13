import './SearchBar.css';

const SearchBar = () => {
  return (
    <>
      <div className="search-bar">
        <form action="/search-cars" method="GET">
          <div className='search-bar-input'>
            <label htmlFor="car-category">Categoría del coche</label>
            <input type="text" id="carCategory" name="car-category" placeholder="Deportivo"/>
          </div>

          <div className='search-bar-input'>
            <label htmlFor="pickup-date">Recogida</label>
            <input type="date" id="pickup-date" name="pickup-date"/>
            <input type="time" id="pickup-time" name="pickup-time"/>
          </div>

          <div className='search-bar-input'>
            <label htmlFor="dropoff-date">Devolución</label>
            <input type="date" id="dropoff-date" name="dropoff-date"/>
            <input type="time" id="dropoff-time" name="dropoff-time"/>
          </div>

          <button type="submit">Buscar</button>
        </form>
      </div>
    </>
  )
}

export { SearchBar };