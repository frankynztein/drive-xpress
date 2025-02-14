import './RecommendationCard.css';
import Peugeot308 from '../../assets/peugeot-308.png';
import Peugeot208 from '../../assets/peugeot-208.png';
import Peugeot2008 from '../../assets/peugeot-2008.png';
import Bmw1 from '../../assets/bmw-1.png';
import AudiQ5 from '../../assets/audi-q5.png';

const RecommendationCard = () => {
  return (
    <>
      <div className='recomm-card-wrapper'>
        {/* Car 1 */}
        <div className='recomm-card'>
          <div className='recomm-card-img'>
            <img src={Peugeot308} alt="Coche sedán" />
          </div>
          <div className='recomm-card-info'>
            <div className='recomm-card-info--car'>
              <h3>Peugeot 308</h3>
              <p><span>Sedán</span> <span>manual</span></p>
            </div>
            <div className='recomm-card-info--rent'>
              <p>Kilómetros ilimitados disponibles</p>
              <p><span>$ 30,50/día</span> <span>Total: $ 150</span></p>
            </div>

          </div>
          <div className='recomm-card-button'>
            <button className='button primary-button'>Seleccionar</button>
          </div>
        </div>
        {/* Car 2 */}
        <div className='recomm-card'>
          <div className='recomm-card-img'>
            <img src={Peugeot208} alt="Coche sedán" />
          </div>
          <div className='recomm-card-info'>
            <div className='recomm-card-info--car'>
              <h3>Peugeot 208</h3>
              <p><span>Sedán</span> <span>manual</span></p>
            </div>
            <div className='recomm-card-info--rent'>
              <p>Kilómetros ilimitados disponibles</p>
              <p><span>$ 30,50/día</span> <span>Total: $ 150</span></p>
            </div>

          </div>
          <div className='recomm-card-button'>
            <button className='button primary-button'>Seleccionar</button>
          </div>
        </div>
        {/* Car 3 */}
        <div className='recomm-card'>
          <div className='recomm-card-img'>
            <img src={Peugeot2008} alt="Coche sedán" />
          </div>
          <div className='recomm-card-info'>
            <div className='recomm-card-info--car'>
              <h3>Peugeot 2008</h3>
              <p><span>SUV</span> <span>manual</span></p>
            </div>
            <div className='recomm-card-info--rent'>
              <p>Kilómetros ilimitados disponibles</p>
              <p><span>$ 30,50/día</span> <span>Total: $ 150</span></p>
            </div>

          </div>
          <div className='recomm-card-button'>
            <button className='button primary-button'>Seleccionar</button>
          </div>
        </div>
        {/* Car 4 */}
        <div className='recomm-card'>
          <div className='recomm-card-img'>
            <img src={Bmw1} alt="Coche sedán" />
          </div>
          <div className='recomm-card-info'>
            <div className='recomm-card-info--car'>
              <h3>BMW Serie 1</h3>
              <p><span>Sedán</span> <span>automático</span></p>
            </div>
            <div className='recomm-card-info--rent'>
              <p>Kilómetros ilimitados disponibles</p>
              <p><span>$ 30,50/día</span> <span>Total: $ 150</span></p>
            </div>

          </div>
          <div className='recomm-card-button'>
            <button className='button primary-button'>Seleccionar</button>
          </div>
        </div>
        {/* Car 5 */}
        <div className='recomm-card'>
          <div className='recomm-card-img'>
            <img src={AudiQ5} alt="Coche sedán" />
          </div>
          <div className='recomm-card-info'>
            <div className='recomm-card-info--car'>
              <h3>Audi Q5</h3>
              <p><span>SUV</span> <span>automático</span></p>
            </div>
            <div className='recomm-card-info--rent'>
              <p>Kilómetros ilimitados disponibles</p>
              <p><span>$ 30,50/día</span> <span>Total: $ 150</span></p>
            </div>

          </div>
          <div className='recomm-card-button'>
            <button className='button primary-button'>Seleccionar</button>
          </div>
        </div>
        {/* Car 1 */}
        <div className='recomm-card'>
          <div className='recomm-card-img'>
            <img src={Peugeot308} alt="Coche sedán" />
          </div>
          <div className='recomm-card-info'>
            <div className='recomm-card-info--car'>
              <h3>Peugeot 308</h3>
              <p><span>Sedán</span> <span>manual</span></p>
            </div>
            <div className='recomm-card-info--rent'>
              <p>Kilómetros ilimitados disponibles</p>
              <p><span>$ 30,50/día</span> <span>Total: $ 150</span></p>
            </div>

          </div>
          <div className='recomm-card-button'>
            <button className='button primary-button'>Seleccionar</button>
          </div>
        </div>
        {/* Car 2 */}
        <div className='recomm-card'>
          <div className='recomm-card-img'>
            <img src={Peugeot208} alt="Coche sedán" />
          </div>
          <div className='recomm-card-info'>
            <div className='recomm-card-info--car'>
              <h3>Peugeot 208</h3>
              <p><span>Sedán</span> <span>manual</span></p>
            </div>
            <div className='recomm-card-info--rent'>
              <p>Kilómetros ilimitados disponibles</p>
              <p><span>$ 30,50/día</span> <span>Total: $ 150</span></p>
            </div>

          </div>
          <div className='recomm-card-button'>
            <button className='button primary-button'>Seleccionar</button>
          </div>
        </div>
        {/* Car 3 */}
        <div className='recomm-card'>
          <div className='recomm-card-img'>
            <img src={Peugeot2008} alt="Coche sedán" />
          </div>
          <div className='recomm-card-info'>
            <div className='recomm-card-info--car'>
              <h3>Peugeot 2008</h3>
              <p><span>SUV</span> <span>manual</span></p>
            </div>
            <div className='recomm-card-info--rent'>
              <p>Kilómetros ilimitados disponibles</p>
              <p><span>$ 30,50/día</span> <span>Total: $ 150</span></p>
            </div>

          </div>
          <div className='recomm-card-button'>
            <button className='button primary-button'>Seleccionar</button>
          </div>
        </div>
        {/* Car 4 */}
        <div className='recomm-card'>
          <div className='recomm-card-img'>
            <img src={Bmw1} alt="Coche sedán" />
          </div>
          <div className='recomm-card-info'>
            <div className='recomm-card-info--car'>
              <h3>BMW Serie 1</h3>
              <p><span>Sedán</span> <span>automático</span></p>
            </div>
            <div className='recomm-card-info--rent'>
              <p>Kilómetros ilimitados disponibles</p>
              <p><span>$ 30,50/día</span> <span>Total: $ 150</span></p>
            </div>

          </div>
          <div className='recomm-card-button'>
            <button className='button primary-button'>Seleccionar</button>
          </div>
        </div>
        {/* Car 5 */}
        <div className='recomm-card'>
          <div className='recomm-card-img'>
            <img src={AudiQ5} alt="Coche sedán" />
          </div>
          <div className='recomm-card-info'>
            <div className='recomm-card-info--car'>
              <h3>Audi Q5</h3>
              <p><span>SUV</span> <span>automático</span></p>
            </div>
            <div className='recomm-card-info--rent'>
              <p>Kilómetros ilimitados disponibles</p>
              <p><span>$ 30,50/día</span> <span>Total: $ 150</span></p>
            </div>

          </div>
          <div className='recomm-card-button'>
            <button className='button primary-button'>Seleccionar</button>
          </div>
        </div>
      </div>
    </>
  )
}

export { RecommendationCard };