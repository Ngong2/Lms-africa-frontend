import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaCheckCircle } from 'react-icons/fa';

// Updated coursesData object with slugs as keys
export const coursesData = { 
  'react-development': {
    id: 1,
    title: 'React Development',
    description: 'Learn React from scratch and build modern web applications.',
    price: 1500, 
    duration: 6,
    modules: [
      'React Basics & JSX',
      'State, Props & Component Lifecycle',
      'Hooks & Context API',
      'React Router DOM',
      'Form Handling & Validation',
      'Building a Full-Stack React App',
    ],
  },
  'python-programming': {
    id: 2,
    title: 'Python Programming',
    description: 'Master Python for data science, automation, and web development.',
    price: 1200,
    duration: 5,
    modules: [
      'Getting Started with Python',
      'Data Structures & Algorithms',
      'Object-Oriented Programming (OOP)',
      'File Handling & Exception Handling',
      'Web Development with Flask/Django',
      'Data Analysis with Pandas',
    ],
  },
  'mongodb-database': {
    id: 3,
    title: 'MongoDB Database',
    description: 'Learn NoSQL database design and implementation with MongoDB for modern applications.',
    price: 1000,
    duration: 4,
    modules: [
      'Introduction to NoSQL & MongoDB',
      'CRUD Operations',
      'Indexing & Aggregation Pipeline',
      'Schema Design & Data Modeling',
      'Integration with Node.js/Python',
      'Database Security & Best Practices',
    ],
  },
  'nodejs-backend': {
    id: 4,
    title: 'Node.js Backend',
    description: 'Build scalable and robust server-side applications using Node.js, Express, and databases.',
    price: 1500,
    duration: 6,
    modules: [
      'Node.js Fundamentals & NPM',
      'Asynchronous JavaScript & Event Loop',
      'Express.js Framework',
      'RESTful APIs Development',
      'Database Integration (MongoDB/PostgreSQL)',
      'Authentication & Authorization',
      'Deployment & Scaling',
    ],
  },
  'graphic-design': {
    id: 5,
    title: 'Graphic Design',
    description: 'Master industry-standard tools like Photoshop and Canva to create stunning visual content for web and print.',
    price: 1500,
    duration: 3,
    modules: [
      'Design Principles & Color Theory',
      'Adobe Photoshop Essentials',
      'Canva for Quick Designs',
      'Typography & Layout',
      'Branding & Logo Design',
      'Portfolio Development',
    ],
  },
  'cyber-security': {
    id: 6,
    title: 'Cyber Security',
    description: 'Understand fundamental cybersecurity concepts, threats, and defensive strategies to protect digital assets.',
    price: 1000,
    duration: 5,
    modules: [
      'Introduction to Cyber Security',
      'Network Security Fundamentals',
      'Threats, Attacks & Vulnerabilities',
      'Cryptography Basics',
      'Incident Response & Forensics',
      'Security Best Practices',
    ],
  },
  'html-css-fundamentals': {
    id: 7,
    title: 'HTML & CSS Fundamentals',
    description: 'Build the foundational structure and style of responsive web pages from scratch.',
    price: 8000,
    duration: 2,
    modules: [
      'HTML Structure & Elements',
      'CSS Styling & Selectors',
      'Box Model & Positioning',
      'Responsive Design with Flexbox & Grid',
      'Transitions & Animations',
      'Introduction to Web Accessibility',
    ],
  },
  'javascript-essentials': {
    id: 8,
    title: 'JavaScript Essentials',
    description: 'Dive into the core concepts of JavaScript to create dynamic and interactive web experiences.',
    price: 1000,
    duration: 3,
    modules: [
      'JS Syntax & Data Types',
      'Control Flow & Functions',
      'DOM Manipulation',
      'Events & Asynchronous JavaScript',
      'ES6+ Features',
      'Introduction to APIs',
    ],
  },
  'wordpress-website-development': {
    id: 9,
    title: 'WordPress Website Development',
    description: 'Create and manage powerful, customizable websites without coding using the world\'s most popular CMS.',
    price: 1700,
    duration: 4,
    modules: [
      'WordPress Installation & Setup',
      'Themes & Plugins Management',
      'Content Creation & Management',
      'Customization with Elementor/Page Builders',
      'E-commerce with WooCommerce',
      'Security & Maintenance',
    ],
  },
  'digital-marketing-strategy': {
    id: 10,
    title: 'Digital Marketing Strategy',
    description: 'Master SEO, social media marketing, content marketing, and email campaigns to boost online presence and drive growth.',
    price: 1300,
    duration: 5,
    modules: [
      'Introduction to Digital Marketing',
      'Search Engine Optimization (SEO)',
      'Social Media Marketing',
      'Content Marketing',
      'Email Marketing',
      'Analytics & Reporting',
    ],
  },
  
};

const CoursesDetails = () => {
  const { id } = useParams(); // 'id' will be the slug (e.g., 'react-development')
  const navigate = useNavigate();
  const course = coursesData[id]; // Access course data using the slug

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
      <div className="row g-5 align-items-start">
        <div className="col-md-7">
          <h2 className="mb-3">{course.title}</h2>
          <p className="lead">{course.description}</p>
          <h5 className="mt-4">What You'll Learn:</h5>
          <ul className="list-group list-group-flush">
            {course.modules.map((module, index) => (
              <li key={index} className="list-group-item d-flex align-items-center">
                <FaCheckCircle className="me-2 text-success" />
                <span><strong>Module {index + 1}:</strong> {module}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Section */}
        <div className="col-md-5">
          <div className="card p-4 shadow-sm border-0">
            <h4 className="mb-3">Course Summary</h4>
            {/* Corrected to use course.price and course.duration */}
            <p><strong>Price:</strong> <span className="text-success">KES {course.price.toLocaleString()}</span></p>
            <p><strong>Duration:</strong> {course.duration} month{course.duration > 1 ? 's' : ''}</p>
            <p><strong>Mode:</strong> Online / Self-paced</p>

            <button
              className="btn btn-primary btn-lg mt-3 w-100"
              onClick={() => navigate(`/enroll/${id}`)} // Use the slug for enrollment as well
            >
              Enroll Now &rarr;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursesDetails;