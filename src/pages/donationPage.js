

import React, { useState } from 'react';
import axios from 'axios';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

const DonationPage = () => {
  const [method, setMethod] = useState('');
  const [amount, setAmount] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const isValid = () => {
    if (!amount || !name || (method !== 'MPesa' && !email)) return false;
    if (method === 'MPesa' && !phone) return false;
    return true;
  };

  const handleSubmit = async () => {
    if (!isValid()) {
      setMessage('Please fill all required fields.');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      if (method === 'Flutterwave') {
        const res = await axios.post('https://backend-lms-africa.vercel.app/api/flutterwave/payment', { name, email, amount });
        console.log(res);
        window.location.href = res.data.paymentLink;

      } else if (method === 'MPesa') {
        const res = await axios.post('https://backend-lms-africa.vercel.app/api/mpesa/payment', { phone, amount });
        console.log(res.data.CustomerMessage);
        setMessage(res.data.CustomerMessage || "Something went wrong please try again");

      } else if (method === 'Stripe') {
        const res = await axios.post('https://backend-lms-africa.vercel.app/api/stripe/payment', { name, email, amount });
        window.location.href = res.data.url;

      } else if (method === 'PayPal') {
        setMessage('Use the PayPal button below.');
      }
    } catch (error) {
      console.log(error)
      console.log("Something went wrong: ", error.message);
      setMessage("Something went wrong please try again: "+ error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-7 col-md-10">
          <div className="card shadow-lg border-0 rounded-4 p-4 mb-4">
            <h2 className="text-center text-primary">LMS Africa</h2>
            <h4 className="text-center mb-3">Our Vision</h4>
            <p className="text-center">
              To become the leading online learning platform in Africa, transforming education and professional development by leveraging technology to create a skilled, competitive, and innovative workforce.
            </p>
            <h4 className="text-center mb-3">Our Mission</h4>
            <p className="text-center">
              To provide affordable, high-quality online professional training and certification programs tailored to Africa's workforce, enabling lifelong learning, career advancement, and economic growth across the continent.
            </p>
          </div>

          <div className="card shadow-lg border-0 rounded-4 p-4 mb-4">
            <h2 className="text-primary">LMS Africa Donation</h2>
            <p>
              Your donation helps us provide free digital skills training, mentorship, laptops, internet access, and safe learning spaces for African youth—especially those in underserved communities.
            </p>
            <p>
              Every contribution directly supports our programs, instructors, and tools that empower learners to transition from curiosity to career-ready professionals.
            </p>
            <p>
              Together, we can bridge the digital divide in Africa and build a brighter, tech-driven future for the next generation.
            </p>
            <p className="fw-bold">
              Donate today and help us transform lives through technology!
            </p>
          </div>

          <div className="card shadow-lg border-0 rounded-4 p-4">
            <h2 className="text-center text-primary mb-3">Make a Donation</h2>
            <p className="text-center text-muted">Support LMS-AFRICA by donating securely via your preferred method.</p>

            {message && (
              <div className="alert alert-info text-center" role="alert">
                {message}
              </div>
            )}

            <div className="mb-3">
              <label className="form-label">Select Payment Method</label>
              <select className="form-select" value={method} onChange={(e) => setMethod(e.target.value)}>
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
                  />
                </div>
                {method !== 'MPesa' && (
                  <div className="mb-3">
                    <input
                      className="form-control"
                      type="email"
                      placeholder="Email Address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                )}
                {method === 'MPesa' && (
                  <div className="mb-3">
                    <input
                      className="form-control"
                      placeholder="Phone Number (e.g. 2547XXXXXXX)"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                )}
                <div className="mb-4">
                  <input
                    className="form-control"
                    type="number"
                    placeholder="Amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>
              </>
            )}

            {method && method !== 'PayPal' && (
              <div className="d-grid">
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="btn btn-primary"
                >
                  {loading ? (
                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  ) : (
                    `Donate with ${method}`
                  )}
                </button>
              </div>
            )}

            {method === 'PayPal' && (
              <div className="mt-4 border rounded p-3 bg-light">
                <PayPalScriptProvider options={{ 'client-id': 'AXuHsoRm_krCVaWiSF7OkTUdxCEaFCmTGuPnEkbBAj40Nn7-g47MT0qzvsylGHbmjQJHx73MVWiLLegG' }}>
                  <PayPalButtons
                    style={{ layout: 'horizontal', color: 'blue', shape: 'pill' }}
                    createOrder={(data, actions) => {
                      return actions.order.create({
                        purchase_units: [{ amount: { value: amount || '1.00' } }],
                      });
                    }}
                    onApprove={(data, actions) => {
                      return actions.order.capture().then((details) => {
                        alert(`Donation successful! Thank you, ${details.payer.name.given_name}`);
                      });
                    }}
                  />
                </PayPalScriptProvider>
              </div>
            )}
            <p className="text-center text-muted mt-4 small">Secure payment Via Stripe, MPesa, Flutterwave, and PayPal.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonationPage;