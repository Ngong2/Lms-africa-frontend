
import React from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { FaGraduationCap, FaLightbulb, FaBriefcase, FaGlobeAfrica, FaTools, FaBrain, FaChalkboardTeacher, FaRobot, FaUsers, FaUserTie, FaUserCog } from 'react-icons/fa';
// Assuming Footer component is available and correctly imported
import Footer from './footer'; // Corrected import path

import { Link } from 'react-router-dom';

import HeroAboutImage from '../assets/image7.png'; // Adjust the path as necessary

// Placeholder for Link component if not provided in the environment

const About = () => {
    return (
        <>
            <Container className="my-5">
                {/* Hero Section */}
                <Row className="align-items-center mb-5">
                    <Col md={6}>
                        <h1 className="display-4 fw-bold mb-4">Empowering African Students Through Digital Education</h1>
                        <p className="lead mb-4">
                            Join our professional certification courses and gain the skills needed for the modern workforce.
                            Learn from industry experts and boost your career prospects.
                        </p>
                        <Button variant="primary" size="lg" className="me-3" as={Link} to="/courses">
                            Explore Courses
                        </Button>
                        <Button variant="outline-primary" size="lg" as={Link} to="/contact">
                            Contact Us
                        </Button>
                    </Col>
                    <Col md={6}>
                        <img
                            src={HeroAboutImage}
                            alt="African students learning together"
                            className="img-fluid rounded shadow"
                            style={{ maxHeight: '400px', objectFit: 'cover' }}
                        />
                    </Col>
                </Row>

                {/* About LMS-Africa Section */}
                <section className="mb-5 py-5">
                    <h2 className="text-center mb-4">About LMS-Africa</h2>
                    <Row className="justify-content-center">
                        <Col md={10}>
                            <p className="lead text-center">
                                LMS-Africa is a professional online learning platform focused on empowering students, reskilling professionals, and aspiring tech and software entrepreneurs across East Africa. We deliver affordable, hands-on courses in vital digital skills such as Web Development, Graphic Design, Cybersecurity, Digital Marketing, Data Analysis, and more, specifically tailored for the African context.
                            </p>
                        </Col>
                    </Row>
                </section>

                {/* Our Vision & Mission Section */}
                <section className="mb-5 py-5 bg-light rounded-3">
                    <h2 className="text-center mb-4">Our Vision & Mission</h2>
                    <Row className="justify-content-center g-4">
                        <Col md={6}>
                            <Card className="h-100 shadow-sm border-0">
                                <Card.Body className="text-center p-4">
                                    <div className="bg-primary bg-opacity-10 rounded-circle p-3 mb-3 mx-auto" style={{ width: '80px', height: '80px' }}>
                                        <FaLightbulb size={35} className="text-primary" />
                                    </div>
                                    <Card.Title className="h5 mb-3">Our Vision</Card.Title>
                                    <Card.Text>
                                        To become the leading online learning platform in Africa, transforming education and professional development by leveraging technology to create a skilled, competitive, and innovative workforce.
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={6}>
                            <Card className="h-100 shadow-sm border-0">
                                <Card.Body className="text-center p-4">
                                    <div className="bg-primary bg-opacity-10 rounded-circle p-3 mb-3 mx-auto" style={{ width: '80px', height: '80px' }}>
                                        <FaBriefcase size={35} className="text-primary" />
                                    </div>
                                    <Card.Title className="h5 mb-3">Our Mission</Card.Title>
                                    <Card.Text>
                                        To provide affordable, high-quality online professional training and certification programs tailored to Africa's workforce, enabling lifelong learning, career advancement, and economic growth across the continent.
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </section>

                {/* NEW: Our Instructors Section */}
                <section className="mb-5 py-5">
                    <h2 className="text-center mb-4">Our Instructors</h2>
                    <p className="text-center lead mb-5">
                        Our instructors are industry experts passionate about sharing their knowledge and empowering the next generation of African tech talent.
                    </p>
                    <Row xs={1} md={2} lg={3} className="g-4">
                        <Col>
                            <Card className="h-100 shadow-sm border-0 text-center">
                                <Card.Body className="p-4">
                                    <div className="bg-success bg-opacity-10 rounded-circle p-3 mb-3 mx-auto d-flex align-items-center justify-content-center" style={{ width: '70px', height: '70px' }}>
                                        <FaChalkboardTeacher size={35} className="text-success" />
                                    </div>
                                    <Card.Title className="h5 mb-2">Dr. Aisha Khan</Card.Title>
                                    <Card.Subtitle className="mb-3 text-muted">Lead Web Development Instructor</Card.Subtitle>
                                    <Card.Text>
                                        With over 10 years of experience in full-stack development, Dr. Khan brings a wealth of practical knowledge to her courses.
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col>
                            <Card className="h-100 shadow-sm border-0 text-center">
                                <Card.Body className="p-4">
                                    <div className="bg-info bg-opacity-10 rounded-circle p-3 mb-3 mx-auto d-flex align-items-center justify-content-center" style={{ width: '70px', height: '70px' }}>
                                        <FaUserCog size={35} className="text-info" />
                                    </div>
                                    <Card.Title className="h5 mb-2">Mr. David Ochieng</Card.Title>
                                    <Card.Subtitle className="mb-3 text-muted">Cybersecurity Expert</Card.Subtitle>
                                    <Card.Text>
                                        A certified ethical hacker and cybersecurity consultant, Mr. Ochieng provides cutting-edge insights into digital security.
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col>
                            <Card className="h-100 shadow-sm border-0 text-center">
                                <Card.Body className="p-4">
                                    <div className="bg-warning bg-opacity-10 rounded-circle p-3 mb-3 mx-auto d-flex align-items-center justify-content-center" style={{ width: '70px', height: '70px' }}>
                                        <FaBrain size={35} className="text-warning" />
                                    </div>
                                    <Card.Title className="h5 mb-2">Ms. Emily Mwale</Card.Title>
                                    <Card.Subtitle className="mb-3 text-muted">Data Analysis Specialist</Card.Subtitle>
                                    <Card.Text>
                                        Emily is a data scientist with a passion for teaching, making complex data concepts accessible and engaging.
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </section>

                {/* NEW: Our Leadership Team Section */}
                <section className="mb-5 py-5 bg-light rounded-3">
                    <h2 className="text-center mb-4">Our Leadership Team</h2>
                    <p className="text-center lead mb-5">
                        Meet the dedicated individuals guiding LMS-Africa towards its vision of transforming digital education across the continent.
                    </p>
                    <Row xs={1} md={2} lg={3} className="g-4">
                        <Col>
                            <Card className="h-100 shadow-sm border-0 text-center">
                                <Card.Body className="p-4">
                                    <div className="bg-primary bg-opacity-10 rounded-circle p-3 mb-3 mx-auto d-flex align-items-center justify-content-center" style={{ width: '70px', height: '70px' }}>
                                        <FaUserTie size={35} className="text-primary" />
                                    </div>
                                    <Card.Title className="h5 mb-2">Dr. Ken Mwangi</Card.Title>
                                    <Card.Subtitle className="mb-3 text-muted">CEO & Founder</Card.Subtitle>
                                    <Card.Text>
                                        A visionary leader with a deep commitment to digital literacy and economic empowerment in Africa.
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col>
                            <Card className="h-100 shadow-sm border-0 text-center">
                                <Card.Body className="p-4">
                                    <div className="bg-primary bg-opacity-10 rounded-circle p-3 mb-3 mx-auto d-flex align-items-center justify-content-center" style={{ width: '70px', height: '70px' }}>
                                        <FaUsers size={35} className="text-primary" />
                                    </div>
                                    <Card.Title className="h5 mb-2">Ms. Sarah Juma</Card.Title>
                                    <Card.Subtitle className="mb-3 text-muted">Chief Operating Officer</Card.Subtitle>
                                    <Card.Text>
                                        Sarah oversees the platform's operations, ensuring seamless learning experiences for all students.
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col>
                            <Card className="h-100 shadow-sm border-0 text-center">
                                <Card.Body className="p-4">
                                    <div className="bg-primary bg-opacity-10 rounded-circle p-3 mb-3 mx-auto d-flex align-items-center justify-content-center" style={{ width: '70px', height: '70px' }}>
                                        <FaRobot size={35} className="text-primary" />
                                    </div>
                                    <Card.Title className="h5 mb-2">Eng. Ben Carter</Card.Title>
                                    <Card.Subtitle className="mb-3 text-muted">Head of Technology</Card.Subtitle>
                                    <Card.Text>
                                        Ben leads the development of our innovative learning technologies and platform infrastructure.
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </section>

                {/* Our Impact & Future Vision with Cards (Previous section, kept for context, can be adjusted or removed if desired) */}
                <section className="mb-5 py-5">
                    <h2 className="text-center mb-4">Our Impact & Future Vision</h2>
                    <p className="text-center lead mb-5">
                        Even as we finalize our online platform, LMS-Africa is already transforming East Africa's educational landscape. We're proud of our journey so far, and our vision for the future is even more ambitious: to empower more lives and bridge the digital skills gap across the region. Here's how we're making a difference:
                    </p>
                    <Row xs={1} md={2} lg={3} className="g-4">
                        <Col>
                            <Card className="h-100 shadow-sm border-0">
                                <Card.Body className="p-4">
                                    <div className="bg-primary bg-opacity-10 rounded-circle p-3 mb-3 mx-auto d-flex align-items-center justify-content-center" style={{ width: '70px', height: '70px' }}>
                                        <FaGraduationCap size={35} className="text-primary" />
                                    </div>
                                    <Card.Title className="h5 text-center mb-3">Increased Access to Quality Education</Card.Title>
                                    <Card.Text>
                                        We are breaking down barriers, enabling students across Kenya, Uganda, Tanzania, South Sudan, and beyond to access world-class tech courses. Our future mobile-friendly platform and M-Pesa/mobile money support will make learning truly inclusive for all.
                                    </Card.
                                        Text>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col>
                            <Card className="h-100 shadow-sm border-0">
                                <Card.Body className="p-4">
                                    <div className="bg-primary bg-opacity-10 rounded-circle p-3 mb-3 mx-auto d-flex align-items-center justify-content-center" style={{ width: '70px', height: '70px' }}>
                                        <FaLightbulb size={35} className="text-primary" />
                                    </div>
                                    <Card.Title className="h5 text-center mb-3">Skills for the Digital Economy</Card.Title>
                                    <Card.Text>
                                        Our specialized courses in Web Development, Graphic Design, Cybersecurity, Data Analysis, and Digital Marketing provide the in-demand skills essential for the 21st-century job market. We empower youth for thriving careers in remote work, freelancing, and global tech companies.
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col>
                            <Card className="h-100 shadow-sm border-0">
                                <Card.Body className="p-4">
                                    <div className="bg-primary bg-opacity-10 rounded-circle p-3 mb-3 mx-auto d-flex align-items-center justify-content-center" style={{ width: '70px', height: '70px' }}>
                                        <FaBriefcase size={35} className="text-primary" />
                                    </div>
                                    <Card.Title className="h5 text-center mb-3">Boost in Employability & Entrepreneurship</Card.Title>
                                    <Card.Text>
                                        LMS-Africa equips students with practical, job-ready skills that are directly sought by employers. We also actively nurture entrepreneurial spirit, teaching skills that enable our graduates to launch successful freelance careers or innovative tech startups.
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col>
                            <Card className="h-100 shadow-sm border-0">
                                <Card.Body className="p-4">
                                    <div className="bg-primary bg-opacity-10 rounded-circle p-3 mb-3 mx-auto d-flex align-items-center justify-content-center" style={{ width: '70px', height: '70px' }}>
                                        <FaGlobeAfrica size={35} className="text-primary" />
                                    </div>
                                    <Card.Title className="h5 text-center mb-3">Bridging the Digital Divide</Card.Title>
                                    <Card.Text>
                                        We are committed to reducing the education gap between urban and rural areas by offering crucial digital access to learning. This provide equal learning opportunities for all, including marginalized students in refugee camps or informal settlements.
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col>
                            <Card className="h-100 shadow-sm border-0">
                                <Card.Body className="p-4">
                                    <div className="bg-primary bg-opacity-10 rounded-circle p-3 mb-3 mx-auto d-flex align-items-center justify-content-center" style={{ width: '70px', height: '70px' }}>
                                        <FaTools size={35} className="text-primary" />
                                    </div>
                                    <Card.Title className="h5 text-center mb-3">Hands-On, Affordable Learning</Card.Title>
                                    <Card.Text>
                                        Our programs emphasize practical, hands-on learning through video tutorials, live projects, and real-world assignments, leading to verifiable certification. Our affordable pricing and local payment options dismantle financial barriers, making quality education accessible.
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col>
                            <Card className="h-100 shadow-sm border-0">
                                <Card.Body className="p-4">
                                    <div className="bg-primary bg-opacity-10 rounded-circle p-3 mb-3 mx-auto d-flex align-items-center justify-content-center" style={{ width: '70px', height: '70px' }}>
                                        <FaBrain size={35} className="text-primary" />
                                    </div>
                                    <Card.Title className="h5 text-center mb-3">Self-Paced and Flexible Learning</Card.Title>
                                    <Card.Text>
                                        We understand diverse needs. Our platform allows students to learn at their own pace and schedule, making it ideal for working youth, school dropouts, or those balancing education with family responsibilities, ensuring everyone can learn.
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </section>
            </Container>

            {/* Added the Footer component here */}
            <Footer />
        </>
    );
};

export default About;