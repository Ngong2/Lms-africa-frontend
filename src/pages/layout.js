import { Outlet, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../assets/LMS-Africa_Logo (1).png';

const Layout = () => {
  return (
    <>
      <style>
        {`
          .hover-yellow:hover {
            color: #ffc107 !important; /* Bootstrap's yellow color */
            transform: translateY(-2px);
            transition: all 0.3s ease;
          }
          /* Custom styles for login/signup/donation buttons */
          .nav-button {
            margin-left: 10px; /* Space between buttons and other nav items */
            padding: 8px 15px; /* Adjust padding for button size */
            border-radius: 5px; /* Rounded corners for buttons */
            transition: all 0.3s ease;
          }
          .nav-button.btn-outline-light:hover {
            background-color: #ffc107; /* Yellow background on hover */
            color: #212529 !important; /* Dark text on yellow background */
            border-color: #ffc107;
          }
        `}
      </style>

      <nav className="navbar navbar-expand-lg navbar-dark bg-primary px-4">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand d-flex align-items-center">
            <img 
              src={logo} 
              alt="LMS-Africa Logo" 
              width="60"
              height="60"
              className="d-inline-block align-text-top me-2" 
            />
          </Link>

          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item"><Link to="/" className="nav-link text-white hover-yellow">Home</Link></li>
              <li className="nav-item"><Link to="/about" className="nav-link text-white hover-yellow">About</Link></li>
              <li className="nav-item"><Link to="/courses" className="nav-link text-white hover-yellow">Courses</Link></li>
              <li className="nav-item"><Link to="/contact" className="nav-link text-white hover-yellow">Contact</Link></li>
              {/* Login Button */}
              <li className="nav-item">
                <Link to="/login" className="btn btn-outline-light nav-button">
                  Login
                </Link>
              </li>
              {/* Sign up Button */}
              <li className="nav-item">
                <Link to="/register" className="btn btn-outline-light nav-button">
                  Sign up
                </Link>
              </li>
              {/* Donation Button */}
              <li className="nav-item">
                <Link to="/donationPage" className="btn btn-outline-light nav-button">
                  Donate
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <Outlet />
    </>
  );
};

export default Layout;