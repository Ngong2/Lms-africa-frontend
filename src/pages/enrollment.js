
// src/components/Enrollment.jsx
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

// Import the same coursesData object from CourseDetails for consistency
import { coursesData } from './coursesDetails'; 

const Enrollment = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const course = coursesData[id]; 

  const [method, setMethod] = useState('');
  const [name, setName] = useState('');
  const [amount, setAmount] = useState(course.price); 
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const isValid = () => {
    if (!name) {
      setMessage('Please enter your full name.');
      return false;
    }
    if (method !== 'MPesa' && !email) {
      setMessage('Please enter your email address.');
      return false;
    }
    if (method === 'MPesa' && !phone) {
      setMessage('Please enter your phone number.');
      return false;
    }
    setMessage(''); 
    return true;
  };

  const handleSuccessfulEnrollment = () => {
    setMessage(`Enrollment in ${course.title} successful! Redirecting to your dashboard...`);
    // After a successful payment, navigate to the student dashboard
    setTimeout(() => {
      navigate('/student'); 
    }, 2000); 
  };

  const handleSubmit = async () => {
    if (!isValid()) {
      return; 
    }

    setLoading(true);
    setMessage('');

    try {
      if (method === 'Flutterwave') {
        const res = await axios.post('https://backend-lms-africa.vercel.app/api/flutterwave/payment', {
          name,
          email,
          amount: amount,
          currency: 'KES', 
        });
        // Redirect to Flutterwave for payment completion
        window.location.href = res.data.paymentLink; 
        // Note: For external redirects like Flutterwave and Stripe,
        // the actual 'success' handling (and subsequent navigate)
        // usually happens on a designated callback/webhook route on your backend
        // after the external payment gateway confirms the transaction.
        // For simplicity, we'll assume the external redirect implies success here
        // or that your backend will handle the final student enrollment.
        // For a full client-side flow, you'd need a way to detect payment completion
        // after coming back from the redirect.
      } else if (method === 'MPesa') {
        const res = await axios.post('https://backend-lms-africa.vercel.app/api/mpesa/payment', {
          phone,
          amount: amount,
          AccountReference: course.title, 
          TransactionDesc: `Enrollment for ${course.title}`, 
        });
        setMessage(res.data.CustomerMessage || 'M-Pesa STK Push initiated. Check your phone.');
        // Assuming STK push initiation is considered a "successful start" to enrollment
        // The final enrollment confirmation would ideally come from an M-Pesa C2B callback to your backend.
        // For this frontend-only simulation, we'll navigate to dashboard after a delay.
        handleSuccessfulEnrollment(); // Navigate after initiating STK push
      } else if (method === 'Stripe') {
        const res = await axios.post('https://backend-lms-africa.vercel.app/api/stripe/payment', {
          name,
          email,
          amount: amount,
          currency: 'KES', 
          courseName: course.title,
        });
        // Redirect to Stripe Checkout for payment completion
        window.location.href = res.data.url;
        // Similar to Flutterwave, actual success handling for Stripe
        // typically involves webhooks on your backend and a success_url redirect.
      } else if (method === 'PayPal') {
        // PayPal logic is handled directly by PayPalButtons component
        setMessage('Use the PayPal button below to complete your payment.');
      }
    } catch (error) {
      console.error('Payment processing error:', error.response?.data || error.message);
      const errorMessage = error.response?.data?.error?.errorMessage || error.response?.data?.message || 'An unexpected error occurred during payment. Please try again.';
      setMessage(`Error: ${errorMessage}`);
    } finally {
      // For Flutterwave and Stripe, setLoading(false) might be better handled
      // on the success_url redirect after payment.
      // For MPesa, it can be set here.
      if (method === 'MPesa' || method === 'PayPal') { // Only set loading false if payment is client-side or initiation is confirmed
        setLoading(false);
      }
    }
  };

  if (!course) {
    return (
      <div className="container my-5 text-center">
        <h3 className="text-danger">Course not found 😢</h3>
        <button className="btn btn-primary mt-3" onClick={() => navigate('/courses')}>
          Browse All Courses
        </button>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <div className="row g-5">
        {/* Course Info */}
        <div className="col-md-6">
          <div className="card shadow-sm">
            {/* You might not have an image property in your coursesData,
                consider adding it or removing this img tag if not used */}
            {/* <img
              src={course.image}
              alt={course.title}
              className="card-img-top"
              style={{ height: '250px', objectFit: 'cover' }}
            /> */}
            <div className="card-body">
              <h4 className="card-title">{course.title}</h4>
              <p><strong>Price:</strong> KES {course.price.toLocaleString()}</p>
              <p><strong>Duration:</strong> {course.duration} month{course.duration > 1 ? 's' : ''}</p>
              <p><strong>Mode:</strong> Online / Self-paced</p>
            </div>
          </div>
        </div>

        {/* Enrollment & Payment */}
        <div className="col-md-6">
          <div className="card p-4 shadow-sm">
            <h3 className="mb-3">Enroll & Pay 💸</h3>

            {message && (
              <div className={`alert ${message.startsWith('Error:') ? 'alert-danger' : 'alert-info'}`}>
                {message}
              </div>
            )}

            <div className="mb-3">
              <label htmlFor="paymentMethod" className="form-label">Select Payment Method</label>
              <select
                id="paymentMethod"
                className="form-select"
                value={method}
                onChange={(e) => setMethod(e.target.value)}
              >
                <option value="">-- Choose Method --</option>
                <option value="Flutterwave">Flutterwave</option>
                <option value="MPesa">MPesa</option>
                <option value="Stripe">Stripe</option>
                <option value="PayPal">PayPal</option>
              </select>
            </div>

            {method && (
              <>
                <div className="mb-3">
                  <input
                    className="form-control"
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                   <label htmlFor="amount" className="form-label">Amount</label>
                  <input
                    className="form-control"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                  />
                </div>
                {method !== 'MPesa' && (
                  <div className="mb-3">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Email Address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required={method !== 'MPesa'}
                    />
                  </div>
                )}
                {method === 'MPesa' && (
                  <div className="mb-3">
                    <input
                      className="form-control"
                      placeholder="Phone (e.g. 2547XXXXXXXX)"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                    />
                  </div>
                )}
              </>
            )}

            {/* Action Buttons */}
            {method && method !== 'PayPal' && (
              <div className="d-grid mt-3">
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="btn btn-success btn-lg"
                >
                  {loading ? (
                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
                  ) : (
                    `Pay with ${method}`
                  )}
                </button>
              </div>
            )}

            {/* PayPal Payment */}
            {method === 'PayPal' && (
              <div className="mt-4 border rounded p-3 bg-light">
                <p className="text-center mb-3">Click the PayPal button below to proceed.</p>
                <PayPalScriptProvider options={{ 'client-id': 'AXuHsoRm_krCVaWiSF7OkTUdxCEaFCmTGuPnEkbBAj40Nn7-g47MT0qzvsylGHbmjQJHx73MVWiLLegG' }}>
                  <PayPalButtons
                    style={{ layout: 'horizontal', color: 'blue', shape: 'pill' }}
                    createOrder={(data, actions) => {
                      return actions.order.create({
                        purchase_units: [{ amount: { value: String(amount ? (amount / 100).toFixed(2) : '1.00'), currency_code: 'USD' } }],
                      });
                    }}
                    onApprove={(data, actions) => {
                      return actions.order.capture().then((details) => {
                        alert(`Payment successful! Thank you, ${details.payer.name.given_name}`);
                        handleSuccessfulEnrollment(); // Navigate to student dashboard after PayPal success
                      });
                    }}
                    onError={(err) => {
                      console.error("PayPal Error:", err);
                      setMessage("PayPal payment failed. Please try again.");
                    }}
                  />
                </PayPalScriptProvider>
              </div>
            )}

            <p className="text-muted mt-3 text-center small">
              Secure payment via Stripe, MPesa, Flutterwave, and PayPal.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Enrollment;