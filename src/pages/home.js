// lms-frontend/src/pages/home.js
import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Container } from 'react-bootstrap';

// Import Courses component
import Courses from './courses';

// Make sure the path here is correct relative to this file
import HeroAboutImage from '../assets/image6.png';

// Home component
const Home = () => {
    return (
        <>
            {/* Hero Section */}
            <div className="position-relative text-white text-center py-5" style={{
                minHeight: '400px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                position: 'relative',
            }}>
                <img
                    src={HeroAboutImage}
                    alt="African Student with Computer"
                    className="position-absolute w-100 h-100"
                    style={{
                        opacity: 0.8,
                        objectFit: 'cover',
                        top: 0,
                        left: 0,
                        zIndex: 0,
                    }}
                />
                <Container className="position-relative" style={{ zIndex: 1 }}>
                    <h2 className="text-uppercase mb-4 text-primary" style={{ fontWeight: 'bold' }}>
                        Welcome to LMS Africa
                    </h2>
                    <h1 className="display-4 fw-bold mb-3 text-primary">
                        Empowering Africa's Future Through Digital Learning!
                    </h1>

                    <p className="lead mb-2">
                        Join us in transforming lives through accessible and quality digital education.
                    </p>
                    <Button
                        variant="primary"
                        size="lg"
                        as={Link}
                        to="/courses"
                        className="me-3 hero-button"
                    >
                        Explore Courses <span className="ms-2" role="img" aria-label="graduate">🎓</span>
                    </Button>
                    <Button
                        variant="outline-light"
                        size="lg"
                        as={Link}
                        to="/contact"
                        className="hero-button"
                    >
                        Get in Touch <span className="ms-2" role="img" aria-label="envelope">✉️</span>
                    </Button>
                </Container>
            </div>

            {/* Courses Section */}
             <Courses />
        </>
    );
};

export default Home;