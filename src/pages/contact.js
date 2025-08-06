import React, { useState } from 'react';
import {
    Container,
    Row,
    Col,
    Form,
    Button,
    Card,
    ListGroup,
    Toast,
    ToastContainer
} from 'react-bootstrap';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaPaperPlane } from 'react-icons/fa';
import axios from 'axios';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastVariant, setToastVariant] = useState('success');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('https://backend-lms-africa.vercel.app/api/contact/contact', formData);

            if (response.status === 200) {
                setToastMessage('Your message has been sent successfully! We will get back to you soon.');
                setToastVariant('success');
                setShowToast(true);

                setFormData({
                    name: '',
                    email: '',
                    subject: '',
                    message: ''
                });
            }
        } catch (error) {
            console.error('Error sending message:', error);
            setToastMessage('Failed to send message. Please try again later.');
            setToastVariant('danger');
            setShowToast(true);
        }
    };

    return (
        <Container className="my-5 position-relative">
            {/* Toast Message */}
            <ToastContainer
                className="position-absolute start-50 translate-middle-x"
                style={{ top: 20, zIndex: 1060 }}
            >
                <Toast
                    bg={toastVariant}
                    show={showToast}
                    onClose={() => setShowToast(false)}
                    delay={5000}
                    autohide
                >
                    <Toast.Body className="text-white">{toastMessage}</Toast.Body>
                </Toast>
            </ToastContainer>

            <h1 className="text-center mb-4">Contact Us</h1>
            <p className="lead text-center mb-5">
                Have questions? Get in touch with our team for more information about our courses and programs.
            </p>

            <Row className="g-4">
                {/* Contact Form Column */}
                <Col lg={6}>
                    <Card className="shadow">
                        <Card.Body>
                            <Card.Title className="mb-4">
                                <FaPaperPlane className="me-2" />
                                Send us a Message
                            </Card.Title>
                            <Form onSubmit={handleSubmit}>
                                <Row>
                                    <Col md={6} className="mb-3">
                                        <Form.Group controlId="formName">
                                            <Form.Label>Full Name</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="name"
                                                placeholder="Enter your name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                required
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6} className="mb-3">
                                        <Form.Group controlId="formEmail">
                                            <Form.Label>Email Address</Form.Label>
                                            <Form.Control
                                                type="email"
                                                name="email"
                                                placeholder="Enter your email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Form.Group className="mb-3" controlId="formSubject">
                                    <Form.Label>Subject</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="subject"
                                        placeholder="What's this about?"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formMessage">
                                    <Form.Label>Message</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        name="message"
                                        rows={5}
                                        placeholder="Your message here..."
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>
                                <div className="d-grid">
                                    <Button variant="primary" type="submit" size="lg">
                                        Send Message
                                    </Button>
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>

                {/* Location and Contact Info Column */}
                <Col lg={6}>
                    <Card className="shadow mb-4">
                        <Card.Body>
                            <Card.Title className="mb-4">Our Location & Contact Info</Card.Title>
                            <div className="ratio ratio-16x9 mb-4">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4032.973285347689!2d34.866653099999996!3d3.709505099999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x172e915ffdf0d527%3A0xc8504a1e10621a1e!2sKakuma%2C%20Kenya!5e0!3m2!1sen!2ske!4v1720951552545!5m2!1sen!2ske"
                                    allowFullScreen=""
                                    loading="lazy"
                                    title="Our Location in East Africa"
                                ></iframe>
                            </div>

                            <ListGroup variant="flush">
                                <ListGroup.Item className="d-flex align-items-center">
                                    <FaMapMarkerAlt className="me-3 text-primary" size={20} />
                                    <div>
                                        <h6 className="mb-0">Headquarters</h6>
                                        <p className="mb-0">Hong Kong town, Kenya</p>
                                    </div>
                                </ListGroup.Item>
                                <ListGroup.Item className="d-flex align-items-center">
                                    <FaPhone className="me-3 text-primary" size={20} />
                                    <div>
                                        <h6 className="mb-0">Phone</h6>
                                        <p className="mb-0">+254 110667278</p>
                                    </div>
                                </ListGroup.Item>
                                <ListGroup.Item className="d-flex align-items-center">
                                    <FaEnvelope className="me-3 text-primary" size={20} />
                                    <div>
                                        <h6 className="mb-0">Email</h6>
                                        <p className="mb-0">info@lmsafrica.com</p>
                                    </div>
                                </ListGroup.Item>
                            </ListGroup>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Contact;
