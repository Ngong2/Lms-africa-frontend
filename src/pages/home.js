import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Container } from 'react-bootstrap';
import Courses from './courses';

const Home = () => {
    return (
        <>
            {/* Hero Section - Enhanced with Professional Video */}
            <section className="position-relative vh-100 overflow-hidden d-flex align-items-center justify-content-center text-white text-center">
                {/* Video Background with Fallback */}
                <div className="position-absolute top-0 start-0 w-100 h-100">
                    <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-100 h-100"
                        style={{ objectFit: 'cover' }}
                        poster="https://via.placeholder.com/1920x1080?text=LMS+Africa"
                    >
                        <source src="https://videocdn.cdnpk.net/videos/eb945a32-8a96-4732-a3b2-d09b858004e3/horizontal/previews/clear/large.mp4?token=exp=1754567856~hmac=62f688c8f0557e8efae838f91caa629d3f66d657a9ebb49a23f351109a15de0e" type="video/mp4" />
                        {/* Fallback image if video doesn't load */}
                        <img 
                            src="https://via.placeholder.com/1920x1080?text=LMS+Africa" 
                            alt="Digital Learning Platform" 
                            className="w-100 h-100"
                            style={{ objectFit: 'cover' }}
                        />
                    </video>
                    {/* Overlay for better text readability */}
                    <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark opacity-50"></div>
                </div>

                {/* Hero Content */}
                <Container className="position-relative px-4">
                    <h2 className="text-uppercase mb-4 fw-bold text-white text-shadow">
                        Welcome to LMS Africa
                    </h2>
                    <h1 className="display-4 fw-bold mb-3 text-white text-shadow">
                        Empowering Africa's Future Through Digital Learning!
                    </h1>

                    <p className="lead mb-4 fs-3 text-white text-shadow">
                        Join thousands of learners transforming their lives with our cutting-edge courses
                    </p>
                    
                    <div className="d-flex justify-content-center flex-wrap gap-3">
                        <Button
                            variant="primary"
                            size="lg"
                            as={Link}
                            to="/courses"
                            className="px-4 py-3 rounded-pill fw-semibold shadow hero-button"
                        >
                            Explore Courses <span className="ms-2" role="img" aria-label="graduate">🎓</span>
                        </Button>
                        <Button
                            variant="outline-light"
                            size="lg"
                            as={Link}
                            to="/contact"
                            className="px-4 py-3 rounded-pill fw-semibold shadow hero-button"
                        >
                            Get in Touch <span className="ms-2" role="img" aria-label="envelope">✉️</span>
                        </Button>
                    </div>
                </Container>
            </section>

            {/* Courses Section */}
            <Courses />
        </>
    );
};

export default Home;