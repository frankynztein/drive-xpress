import { Link } from "react-router-dom";
import './Footer.css';
import logoFooter from '../../../assets/logo-footer.png';
import instagram from '../../../assets/instagram.png';
import facebook from '../../../assets/facebook.png';

const Footer = () => {
  return (
    <>
      <div className="footer-wrapper">
        <footer className="footer">
          <div>
            <Link to="/">
              <img className="footer-logo" src={logoFooter} alt="" />
            </Link>
            <p>© 2025 - All Rights Reserved.</p>
          </div>
          <div className="footer-links">
            <Link to="/">
              <img src={instagram} alt="" />
            </Link>
            <Link to="/">
              <img src={facebook} alt="" />
            </Link>
          </div>

        </footer>
      </div>
    </>
  )
}

export { Footer };