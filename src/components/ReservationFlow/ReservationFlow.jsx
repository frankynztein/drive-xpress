import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Spinner, Alert } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './ReservationFlow.css';

const ReservationFlow = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  
  const [car, setCar] = useState(location.state?.car || null);
  const [dateRange, setDateRange] = useState([null, null]);
  const [loading, setLoading] = useState(!location.state?.car);
  const [error, setError] = useState(null);
  const [bookedDates, setBookedDates] = useState([]);

  useEffect(() => {
    if (!location.state?.car) {
      const fetchCarData = async () => {
        try {
          setLoading(true);

          const carResponse = await fetch(`http://localhost:8080/api/cars/${id}`);
          if (!carResponse.ok) throw new Error('Coche no encontrado');
          const carData = await carResponse.json();
          setCar(carData);
          
          const notAvailableResponse = await fetch(
            `http://localhost:8080/api/cars/${id}/not-available-dates`
          );
          if (!notAvailableResponse.ok) throw new Error('Error al obtener fechas ocupadas');
          const notAvailableDates = await notAvailableResponse.json();
          setBookedDates(notAvailableDates);
          
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
      fetchCarData();
    } else {
      const fetchNotAvailableDates = async () => {
        try {
          setLoading(true);
          const response = await fetch(
            `http://localhost:8080/api/cars/${id}/not-available-dates`
          );
          if (!response.ok) throw new Error('Error al obtener fechas ocupadas');
          const dates = await response.json();
          setBookedDates(dates);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
      fetchNotAvailableDates();
    }
  }, [id, location.state]);

  const handleReservation = () => {
    if (!car || !dateRange[0] || !dateRange[1]) return;
    
    navigate(`/confirmar-reserva/${id}`, {
      state: {
        car,
        startDate: dateRange[0],
        endDate: dateRange[1],
        totalPrice: calculatePrice(car, dateRange[0], dateRange[1])
      }
    });
  };

  if (loading) return <Spinner animation="border" />;
  if (error) return <Alert variant="danger">{error}</Alert>;
  if (!car) return <Alert variant="warning">No se pudo cargar la información del vehículo</Alert>;

  return (
    <div className="reservation-flow">
      <h2>Reservar {car.model}</h2>
      
      <div className="calendar-container">
        <DatePicker
          selectsRange
          startDate={dateRange[0]}
          endDate={dateRange[1]}
          onChange={setDateRange}
          minDate={new Date()}
          filterDate={date => 
            !bookedDates.some(d => 
              new Date(d).toDateString() === date.toDateString()
            )
          }
          inline
          monthsShown={2}
          calendarClassName="reservation-calendar"
          dayClassName={date => 
            bookedDates.some(d => new Date(d).toDateString() === date.toDateString())
              ? 'react-datepicker__day--booked'
              : undefined
          }
          locale="es"
        />
      </div>

      <div className="reservation-summary">
        {dateRange[0] && dateRange[1] ? (
          <>
            <h4>Resumen de reserva</h4>
            <p><strong>Modelo:</strong> {car.model}</p>
            <p><strong>Transmisión:</strong> {car.transmission}</p>
            <p><strong>Fechas:</strong> {dateRange[0].toLocaleDateString()} - {dateRange[1].toLocaleDateString()}</p>
            <p><strong>Precio estimado:</strong> ${calculatePrice(car, dateRange[0], dateRange[1]).toFixed(2)}</p>
            
            <button 
              onClick={handleReservation}
              className="button primary-button"
            >
              Continuar con la reserva
            </button>
          </>
        ) : (
          <p>Selecciona las fechas de tu reserva</p>
        )}
      </div>
    </div>
  );
};

function calculatePrice(car, startDate, endDate) {
  if (!car || !car.dailyRentalCost || !startDate || !endDate) return 0;
  
  const days = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
  return car.dailyRentalCost * days;
}

export { ReservationFlow };