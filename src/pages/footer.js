import React, { useState } from 'react';
import { Container, Row, Col, Button, ListGroup, Form } from 'react-bootstrap';
import {
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaInstagram,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaYoutube
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify'; // Import toast and ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Import toastify CSS

export const Footer = () => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false); // State to manage submission loading

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true); // Disable button during submission

    try {
      const response = await fetch('https://backend-lms-africa.vercel.app/api/contact/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: newsletterEmail }),
      });

      if (response.ok) {
        toast.success(`Thank you for subscribing, ${newsletterEmail}!`);
        setNewsletterEmail(''); // Clear the input after submission
      } else {
        const errorData = await response.json();
        toast.error(`Subscription failed: ${errorData.message || 'Something went wrong.'}`);
      }
    } catch (error) {
      console.error("Error subscribing to newsletter:", error);
      toast.error("Network error. Please try again later.");
    } finally {
      setIsSubmitting(false); // Re-enable button
    }
  };

  return (
    <footer className="bg-dark text-white pt-5 pb-4">
      <Container>
        <Row className="mb-4">
          <Col lg={3} md={6} className="mb-4 mb-md-0">
            <h5 className="text-uppercase mb-4">LMS-Africa</h5>
            <p>
              Empowering African learners with digital skills through quality training programs in Africa.
            </p>
            <div className="mt-4">
              <a href="https://www.facebook.com/LMSAfrica" className="text-white me-3"><FaFacebook size={20} /></a>
              <a href="https://twitter.com/LMSAfrica" className="text-white me-3"><FaTwitter size={20} /></a>
              <a href="https://www.linkedin.com/company/lms-africa" className="text-white me-3"><FaLinkedin size={20} /></a>
              <a href="https://www.instagram.com/lmsafrica/" className="text-white me-3"><FaInstagram size={20} /></a>
              <a href="https://www.youtube.com/LMSAfrica" className="text-white"><FaYoutube size={20} /></a>
            </div>
          </Col>

          <Col lg={3} md={6} className="mb-4 mb-md-0">
            <h5 className="text-uppercase mb-4">Quick Links</h5>
            <ListGroup variant="flush" className="bg-dark">
              <ListGroup.Item action className="bg-dark text-white border-0 ps-0">
                <Link to="/" className="text-white text-decoration-none">Home</Link>
              </ListGroup.Item>
              <ListGroup.Item action className="bg-dark text-white border-0 ps-0">
                <Link to="/courses" className="text-white text-decoration-none">All Courses</Link>
              </ListGroup.Item>
              <ListGroup.Item action className="bg-dark text-white border-0 ps-0">
                <Link to="/about" className="text-white text-decoration-none">About Us</Link>
              </ListGroup.Item>
              <ListGroup.Item action className="bg-dark text-white border-0 ps-0">
                <Link to="/contact" className="text-white text-decoration-none">Contact Us</Link>
              </ListGroup.Item>
            </ListGroup>
          </Col>

          <Col lg={3} md={6} className="mb-4 mb-md-0">
            <h5 className="text-uppercase mb-4">Contact Info</h5>
            <ListGroup variant="flush" className="bg-dark">
              <ListGroup.Item className="bg-dark text-white border-0 ps-0">
                <FaMapMarkerAlt className="me-2" />
                Kakuma, Kenya
              </ListGroup.Item>
              <ListGroup.Item className="bg-dark text-white border-0 ps-0">
                <FaPhone className="me-2" />
                +254 700 123 456
              </ListGroup.Item>
              <ListGroup.Item className="bg-dark text-white border-0 ps-0">
                <FaEnvelope className="me-2" />
                info@lmsafrica.com
              </ListGroup.Item>
            </ListGroup>
          </Col>

          <Col lg={3} md={6} className="mb-4 mb-md-0">
            <h5 className="text-uppercase mb-4">Newsletter</h5>
            <p>Subscribe for course updates and digital skills news from LMS-Africa.</p>
            <Form onSubmit={handleNewsletterSubmit}>
              <Form.Group className="mb-3" controlId="newsletterEmail">
                <Form.Control
                  type="email"
                  placeholder="Your Email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  required
                />
              </Form.Group>
              <Button variant="primary" type="submit" className="w-100" disabled={isSubmitting}>
                {isSubmitting ? 'Subscribing...' : 'Subscribe'}
              </Button>
            </Form>
          </Col>
        </Row>

        <hr className="mb-4" />

        <Row>
          <Col md={12} className="text-center">
            <p className="mb-0">
              © {new Date().getFullYear()} LMS-Africa. All rights reserved.
            </p>
          </Col>
        </Row>
      </Container>
      <ToastContainer position="bottom-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    </footer>
  );
};

export default Footer;