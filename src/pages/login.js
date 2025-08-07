
import React, { useState } from "react";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo from '../assets/LMS-Africa_Logo (1).png';

const Login = () => {
  const [inputs, setInputs] = useState({ email: "", password: "" });
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotMessage, setForgotMessage] = useState("");
  const [forgotError, setForgotError] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const toggleShowPassword = () => setShowPassword(!showPassword);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await axios.post('https://backend-ilw9.onrender.com/api/users/login', inputs);

      localStorage.setItem('token', res.data.data.token);
      localStorage.setItem('userType', res.data.data.user.userType);

      toast.success(res.data.message, { position: "top-center" });

      const redirectPath = location.state?.from?.pathname;
      const userType = res.data.data.user.userType.toLowerCase();

      setTimeout(() => {
        if (redirectPath) {
          navigate(redirectPath, { replace: true });
        } else {
          switch(userType) {
            case 'admin':
              navigate('/admin');
              break;
            case 'student':
              navigate('/student');
              break;
            case 'instructor':
              navigate('/instructor');
              break;
            default:
              navigate('/');
          }
        }
      }, 1000);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Login failed", {
        position: "top-center",
        autoClose: 5000,
      });
      setShowErrorModal(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleForgotSubmit = async (e) => {
    e.preventDefault();
    setForgotMessage("");
    setForgotError("");

    try {
      const res = await axios.post('https://backend-ilw9.onrender.com/api/users/forgot-password', { email: forgotEmail });
      setForgotMessage(res.data.message);
    } catch (err) {
      setForgotError(err.response?.data?.message || "Something went wrong. Try again.");
    }
  };

  return (
    <div className="container-fluid px-3 py-4 d-flex justify-content-center align-items-center min-vh-100">
      <ToastContainer position="top-center" autoClose={5000} />

      <div className="card shadow-sm rounded-lg" style={{ width: "100%", maxWidth: "400px" }}>
        <div className="card-body p-3 p-md-4">
          <div className="text-center mb-4">
            <img
              src={logo}
              alt="LMS Logo"
              className="img-fluid"
              style={{ maxHeight: "80px" }}
              onError={(e) => {
                e.target.src = "https://placehold.co/150x50/FFFFFF/000000?text=LMS+Logo";
              }}
            />
          </div>
          <h1 className="card-title text-center text-primary mb-4" style={{ fontWeight: 'bold', fontSize: '1.75rem' }}>Sign in</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                name="email"
                value={inputs.email}
                onChange={handleChange}
                className="form-control rounded-md"
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <div className="input-group">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={inputs.password}
                  onChange={handleChange}
                  className="form-control rounded-md"
                  required
                />
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={toggleShowPassword}
                  style={{ borderTopRightRadius: '0.375rem', borderBottomRightRadius: '0.375rem' }}
                >
                  {showPassword ? (
                    <i className="bi bi-eye-slash"></i>
                  ) : (
                    <i className="bi bi-eye"></i>
                  )}
                </button>
              </div>
            
            </div>
            <div className="mb-3 form-check">
              <input type="checkbox" className="form-check-input" id="rememberMe" />
              <label className="form-check-label text-secondary" htmlFor="rememberMe">
                Remember my preference
              </label>
            </div>
            <p className="text-end mb-3">
              <span
                onClick={() => setShowForgotModal(true)}
                className="text-decoration-none text-primary"
                style={{ fontWeight: 'bold', cursor: 'pointer' }}
              >
                Forgot password?
              </span>
            </p>
            <button
              type="submit"
              className="btn btn-primary w-100 rounded-pill py-2 mt-3"
              style={{
                backgroundColor: isHovered ? '#20c997' : '#004494',
                borderColor: isHovered ? '#20c997' : '#004494',
                fontWeight: 'bold',
                transition: 'all 0.3s ease',
              }}
              disabled={isSubmitting}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {isSubmitting ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Signing In...
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>
          <p className="mt-4 text-center text-secondary">
            Don't have an account?{" "}
            <Link to="/register" className="text-decoration-none text-primary" style={{ fontWeight: 'bold' }}>
              Sign up
            </Link>
          </p>
        </div>
      </div>

      {/* Error Modal */}
      {showErrorModal && (
        <div className="modal fade show d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content rounded-lg">
              <div className="modal-header">
                <h5 className="modal-title text-danger">Login Failed</h5>
                <button type="button" className="btn-close" onClick={() => setShowErrorModal(false)} aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <p>Login failed. Please check your email and password and try again.</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-primary rounded-pill" onClick={() => setShowErrorModal(false)}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }} tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content rounded-lg">
              <div className="modal-header">
                <h5 className="modal-title text-primary">Reset Password</h5>
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={() => {
                    setShowForgotModal(false);
                    setForgotEmail("");
                    setForgotMessage("");
                    setForgotError("");
                  }}
                ></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleForgotSubmit}>
                  <div className="mb-3">
                    <label className="form-label">Enter your email</label>
                    <input
                      type="email"
                      className="form-control"
                      value={forgotEmail}
                      onChange={(e) => setForgotEmail(e.target.value)}
                      required
                    />
                  </div>
                  {forgotMessage && <div className="alert alert-success">{forgotMessage}</div>}
                  {forgotError && <div className="alert alert-danger">{forgotError}</div>}
                  <button type="submit" className="btn btn-primary rounded-pill w-100">
                    Send Reset Link
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;