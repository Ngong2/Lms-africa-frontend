
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Card, Button, Row, Col, Container, Form
} from 'react-bootstrap';
import {
  FaReact, FaPython, FaPaintBrush, FaShieldAlt, FaChartBar,
  FaCode, FaWordpress
} from 'react-icons/fa';
import {
  SiMongodb, SiNodedotjs, SiJavascript
} from 'react-icons/si';
import Footer from './footer';

// Import the centralized coursesData for consistency
import { coursesData } from './coursesDetails';

// Helper to get slug from course title
const getSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-');
};

// Transform coursesData into an array for mapping in CoursesComponent
const courses = Object.keys(coursesData).map(slug => ({
  ...coursesData[slug],
  slug: getSlug(coursesData[slug].title),
  icon: (function() {
    switch(slug) {
      case 'react-development': return <FaReact size={40} className="text-primary" />;
      case 'python-programming':
      case 'python': return <FaPython size={40} className="text-info" />;
      case 'mongodb-database': return <SiMongodb size={40} className="text-success" />;
      case 'nodejs-backend': return <SiNodedotjs size={40} className="text-success" />;
      case 'graphic-design': return <FaPaintBrush size={40} className="text-danger" />;
      case 'cyber-security': return <FaShieldAlt size={40} className="text-warning" />;
      case 'html-css-fundamentals': return <FaCode size={40} className="text-secondary" />;
      case 'javascript-essentials': return <SiJavascript size={40} className="text-warning" />;
      case 'wordpress-website-development': return <FaWordpress size={40} className="text-primary" />;
      case 'digital-marketing-strategy': return <FaChartBar size={40} className="text-info" />;
      default: return <FaCode size={40} className="text-secondary" />;
    }
  })(),
  category: (function() {
    if (slug.includes('react') || slug.includes('html') || slug.includes('css') || slug.includes('node') || slug.includes('web')) return 'web';
    if (slug.includes('python') || slug.includes('javascript')) return 'programming';
    if (slug.includes('mongo')) return 'database';
    if (slug.includes('design')) return 'design';
    if (slug.includes('security')) return 'security';
    if (slug.includes('marketing') || slug.includes('ecommerce')) return 'business';
    return 'other';
  })()
}));

const Courses = ({ user, setUser }) => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const isLoggedIn = !!user;
  const categories = ['all', ...new Set(courses.map(course => course.category))];

  const filteredCourses = courses.filter(course => {
    const matchesCategory = activeCategory === 'all' || course.category === activeCategory;
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <Container className="my-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="mb-0">Explore Our Diverse Courses</h2>
          {isLoggedIn && (
            <Button
              variant="outline-danger"
              onClick={() => setUser(null)}
            >
              Log Out ({user.name})
            </Button>
          )}
        </div>

        {/* Search Field */}
        <Form.Group className="mb-4">
          <Form.Control
            type="text"
            placeholder="Search courses by title or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Form.Group>

        {/* Category Filter */}
        <div className="text-center mb-4">
          {categories.map(category => (
            <Button
              key={category}
              variant={activeCategory === category ? 'primary' : 'outline-primary'}
              className="me-2 mb-2 text-capitalize"
              onClick={() => setActiveCategory(category)}
            >
              {category.replace('-', ' ')}
            </Button>
          ))}
        </div>

        {/* Courses Grid */}
        <Row xs={1} md={2} lg={3} className="g-4">
          {filteredCourses.length > 0 ? (
            filteredCourses.map(course => (
              <Col key={course.slug}>
                <Card className="h-100 shadow-sm">
                  <Card.Body className="text-center">
                    <div className="mb-3">
                      {course.icon}
                    </div>
                    <Card.Title>{course.title}</Card.Title>
                    <Card.Text>{course.description}</Card.Text>
                    <div className="mt-3">
                      <p className="mb-1"><strong>Price:</strong> <span className="text-success">KES {course.price.toLocaleString()}</span></p>
                      <p className="mb-0"><strong>Duration:</strong> {course.duration} month{course.duration > 1 ? 's' : ''}</p>
                    </div>
                  </Card.Body>
                  <Card.Footer className="text-center bg-transparent">
                    <div className="d-flex justify-content-center">
                      <Link to={`/courses/${course.slug}`} className="btn btn-outline-primary me-2">
                        Learn More
                      </Link>
                      <Button variant="primary" onClick={() => navigate(`/enroll/${course.slug}`)}>
                        🎓 Enroll Now
                      </Button>
                    </div>
                  </Card.Footer>
                </Card>
              </Col>
            ))
          ) : (
            <Col className="text-center py-5">
              <h4>No courses found matching your criteria</h4>
              <Button variant="outline-primary" onClick={() => {
                setActiveCategory('all');
                setSearchTerm('');
              }}>
                Reset Filters
              </Button>
            </Col>
          )}
        </Row>
      </Container>

      <Footer />
    </>
  );
};

export default Courses;