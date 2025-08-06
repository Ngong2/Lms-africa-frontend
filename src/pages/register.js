import { useState } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo from '../assets/LMS-Africa_Logo (1).png';

const Register = () => {
  const [inputs, setInputs] = useState({
    fullName: "",
    email: "",
    phone: "",
    userType: "student",
    password: "",
    confirm: ""
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputs(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!inputs.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!inputs.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inputs.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!inputs.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[0-9]{12}$/.test(inputs.phone)) {
      newErrors.phone = "Phone number must be exactly 12 digits (e.g., 254712345678)";
    }

    if (!inputs.password) {
      newErrors.password = "Password is required";
    } else {
      if (inputs.password.length < 8) {
        newErrors.password = "Password must be at least 8 characters";
      }
      if (!/[a-z]/.test(inputs.password)) {
        newErrors.password = "Include at least one lowercase letter";
      }
      if (!/[A-Z]/.test(inputs.password)) {
        newErrors.password = "Include at least one uppercase letter";
      }
      if (!/[0-9]/.test(inputs.password)) {
        newErrors.password = "Include at least one number";
      }
    }

    if (inputs.password !== inputs.confirm) {
      newErrors.confirm = "Passwords don't match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix the form errors");
      return;
    }
    
    setIsSubmitting(true);

    try {
      const { confirm, ...userData } = inputs;
      const res = await axios.post('https://backend-lms-africa.vercel.app/api/users/register', userData);

      if (res.data.status === "00") {
        toast.success("Registration successful!");
        setRegistrationSuccess(true);
      } else {
        toast.error(res.data.message || "Registration failed");
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 
                         err.message || 
                         "Registration failed. Please try again.";
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (registrationSuccess) {
    return (
      <div style={{
        backgroundColor: "lightblue",
        width: "350px",
        margin: "0 auto",
        padding: "20px",
        textAlign: "center"
      }}>
        <h2>Registration Successful!</h2>
        <p>Your account has been created.</p>
        <Link to="/login" className="btn btn-primary">
          Proceed to Login
        </Link>
      </div>
    );
  }

  return (
    <div className="container my-5 d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
      <ToastContainer 
        position="top-center" 
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
      />
      
      <div className="card shadow-sm rounded-lg" style={{ maxWidth: "400px", width: "100%" }}>
        <div className="card-body p-4">
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

          <h1 className="card-title text-center text-primary mb-4" style={{ fontWeight: 'bold' }}>Sign up</h1>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Full Name:</label>
              <input
                type="text"
                name="fullName"
                value={inputs.fullName}
                onChange={handleChange}
                className={`form-control ${errors.fullName ? 'is-invalid' : ''}`}
              />
              {errors.fullName && <div className="invalid-feedback">{errors.fullName}</div>}
            </div>

            <div className="mb-3">
              <label className="form-label">Email:</label>
              <input
                type="email"
                name="email"
                value={inputs.email}
                onChange={handleChange}
                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
              />
              {errors.email && <div className="invalid-feedback">{errors.email}</div>}
            </div>

            <div className="mb-3">
              <label className="form-label">Phone Number:</label>
              <input
                type="tel"
                name="phone"
                value={inputs.phone}
                onChange={handleChange}
                className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                placeholder="e.g., 254712345678"
              />
              {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
            </div>

            <div className="mb-3">
              <label className="form-label">User Type:</label>
              <select
                name="userType"
                value={inputs.userType}
                onChange={handleChange}
                className="form-control"
              >
                <option value="student">Student</option>
                <option value="instructor">Instructor</option>
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">Password:</label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={inputs.password}
                onChange={handleChange}
                className={`form-control ${errors.password ? 'is-invalid' : ''}`}
              />
              <small className="text-muted">At least 8 chars, 1 upper, 1 lower, 1 number</small>
              {errors.password && <div className="invalid-feedback">{errors.password}</div>}
            </div>

            <div className="mb-3">
              <label className="form-label">Confirm Password:</label>
              <input
                type={showPassword ? "text" : "password"}
                name="confirm"
                value={inputs.confirm}
                onChange={handleChange}
                className={`form-control ${errors.confirm ? 'is-invalid' : ''}`}
              />
              {errors.confirm && <div className="invalid-feedback">{errors.confirm}</div>}
            </div>

            <div className="form-check mb-3">
              <input
                className="form-check-input"
                type="checkbox"
                id="togglePassword"
                checked={showPassword}
                onChange={(e) => setShowPassword(e.target.checked)}
              />
              <label className="form-check-label" htmlFor="togglePassword">
                Show Password
              </label>
            </div>

            <button
              type="submit"
              className="btn btn-primary w-100 rounded-pill py-2 mt-3"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  <span>Sign up</span>
                </>
              ) : (
                "Sign up"
              )}
            </button>

            <p className="mt-4 text-center text-secondary">
              Already have an account?{" "}
              <Link to="/login" className="text-decoration-none text-primary" style={{ fontWeight: 'bold' }}>
                Login here
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;