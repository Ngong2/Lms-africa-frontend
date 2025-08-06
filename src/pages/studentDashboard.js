
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  FaBook, FaClipboardList, FaMedal, FaCertificate,
  FaPlusCircle, FaTachometerAlt, FaSignOutAlt, FaBell,
  FaUserGraduate, FaTasks,
} from 'react-icons/fa';
import { ProgressBar, Button, Card, Badge, Modal, Form, Alert } from 'react-bootstrap';

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('dashboard');
  const [showEnrollModal, setShowEnrollModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState('');
  const availableCourses = [
    { id: 1, title: 'React Development' },
    { id: 2, title: 'Python Programming' },
    { id: 3, title: 'MongoDB Database' },
    { id: 4, title: 'Node.js Backend' },
    { id: 5, title: 'Graphic Design' },
    { id: 6, title: 'Cyber Security' },
    { id: 7, title: 'HTML & CSS Fundamentals' },
    { id: 8, title: 'JavaScript Essentials' },
    { id: 9, title: 'WordPress Website Development' },
    { id: 10, title: 'Digital Marketing Strategy' }
  ];
  const [courses, setCourses] = useState([
    { id: 1, title: 'React Development', progress: 70 },
    { id: 2, title: 'Python Programming', progress: 45 },
  ]);
  const [quizzes, setQuizzes] = useState([
    { id: 1, course: 'React Development', title: 'Quiz 1', due: '2025-07-25' },
    { id: 2, course: 'Python Programming', title: 'Quiz 2', due: '2025-07-30' },
  ]);
  const [assignments, setAssignments] = useState([
    { id: 1, course: 'Python Programming', title: 'Assignment 1', due: '2025-07-28' },
  ]);
  const [badges, setBadges] = useState(['Top Scorer', 'Active Learner', 'Consistency Star']);
  const [certificates, setCertificates] = useState(['Python Programming', 'React development']);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Simulate initial notifications
    setNotifications([
      { id: 1, type: 'info', message: 'Welcome back! Check out your new assignments.' },
      { id: 2, type: 'success', message: 'You completed "HTML & CSS Mastery" and earned a certificate!' },
    ]);
  }, []);

  const addNotification = (type, message) => {
    const newNotification = {
      id: notifications.length + 1,
      type,
      message,
    };
    setNotifications((prevNotifications) => [...prevNotifications, newNotification]);
  };

  const clearNotification = (id) => {
    setNotifications((prevNotifications) => prevNotifications.filter((n) => n.id !== id));
  };

  const handleEnroll = () => {
    if (selectedCourse) {
      const courseToEnroll = availableCourses.find(course => course.id === parseInt(selectedCourse));
      if (courseToEnroll) {
        if (courses.some(c => c.id === courseToEnroll.id)) {
          addNotification('warning', `You are already enrolled in "${courseToEnroll.title}".`);
          setShowEnrollModal(false);
          setSelectedCourse('');
          return;
        }

        setCourses([...courses, { ...courseToEnroll, progress: 0 }]);

        const newQuizId = quizzes.length + 1;
        setQuizzes([...quizzes, {
          id: newQuizId,
          course: courseToEnroll.title,
          title: `Quiz ${newQuizId}`,
          due: '2025-08-15'
        }]);

        const newAssignmentId = assignments.length + 1;
        setAssignments([...assignments, {
          id: newAssignmentId,
          course: courseToEnroll.title,
          title: `Assignment ${newAssignmentId}`,
          due: '2025-08-20'
        }]);

        addNotification('success', `Successfully enrolled in "${courseToEnroll.title}"! 🎉`);
        setShowEnrollModal(false);
        setSelectedCourse('');
        setActiveSection('courses');
      }
    }
  };

  const handleLogout = () => {
    addNotification('info', 'You have been logged out.');
    localStorage.removeItem("token");
    navigate('/login');
  };

  const updateCourseProgress = (courseId, newProgress) => {
    setCourses(prevCourses => {
      const updatedCourses = prevCourses.map(course =>
        course.id === courseId ? { ...course, progress: newProgress } : course
      );

      const updatedCourse = updatedCourses.find(c => c.id === courseId);

      if (updatedCourse && newProgress === 100 && !certificates.includes(updatedCourse.title)) {
        setCertificates([...certificates, updatedCourse.title]);
        addNotification('success', `Congratulations! You earned a certificate for "${updatedCourse.title}"! 🎓`);
        if (!badges.includes('Course Completer')) {
          setBadges([...badges, 'Course Completer']);
          addNotification('info', 'You earned the "Course Completer" badge!');
        }
      }
      return updatedCourses;
    });
  };

  // Sidebar menu items with colors and icons
  const menuItems = [
    { 
      id: 'dashboard',
      title: 'Dashboard',
      icon: <FaTachometerAlt className="me-2" />,
      color: 'primary',
      badgeCount: 0
    },
    { 
      id: 'courses',
      title: 'Courses',
      icon: <FaBook className="me-2" />,
      color: 'success',
      badgeCount: courses.length
    },
    { 
      id: 'quizzes',
      title: 'Quizzes',
      icon: <FaClipboardList className="me-2" />,
      color: 'warning',
      badgeCount: quizzes.length
    },
    { 
      id: 'assignments',
      title: 'Assignments',
      icon: <FaTasks className="me-2" />,
      color: 'info',
      badgeCount: assignments.length
    },
    { 
      id: 'badges',
      title: 'Badges',
      icon: <FaMedal className="me-2" />,
      color: 'danger',
      badgeCount: badges.length
    },
    { 
      id: 'certificates',
      title: 'Certificates',
      icon: <FaCertificate className="me-2" />,
      color: 'secondary',
      badgeCount: certificates.length
    },
    { 
      id: 'notifications',
      title: 'Notifications',
      icon: <FaBell className="me-2" />,
      color: 'dark',
      badgeCount: notifications.length
    },
    { 
      id: 'enroll',
      title: 'Browse Courses',
      icon: <FaPlusCircle className="me-2" />,
      color: 'primary',
      badgeCount: 0,
      action: () => setShowEnrollModal(true)
    },
    { 
      id: 'profile',
      title: 'My Profile',
      icon: <FaUserGraduate className="me-2" />,
      color: 'info',
      badgeCount: 0,
      action: () => navigate('/profile')
    }
  ];

  return (
    <div className="d-flex" id="wrapper">
      {/* Sidebar */}
      <div className="bg-dark text-white p-3 sidebar" style={{ width: '250px' }}>
        <h4 className="mb-4 text-center">My LMS</h4>
        <ul className="nav flex-column">
          {menuItems.map((item) => (
            <li key={item.id} className="nav-item mb-2">
              <Card 
                className={`shadow-sm border-${item.color}`}
                onClick={() => item.action ? item.action() : setActiveSection(item.id)}
                style={{ cursor: 'pointer' }}
              >
                <Card.Body className="p-2">
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="text-dark">
                      {item.icon} {item.title}
                    </span>
                    {item.badgeCount > 0 && (
                      <Badge pill bg={item.color} className="ms-2">
                        {item.badgeCount}
                      </Badge>
                    )}
                  </div>
                </Card.Body>
              </Card>
            </li>
          ))}
          
          {/* Logout Button */}
          <li className="nav-item mt-4">
            <Card 
              className="shadow-sm border-danger"
              onClick={handleLogout}
              style={{ cursor: 'pointer' }}
            >
              <Card.Body className="p-2">
                <div className="d-flex justify-content-between align-items-center">
                  <span className="text-danger">
                    <FaSignOutAlt className="me-2" /> Logout
                  </span>
                </div>
              </Card.Body>
            </Card>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="container-fluid p-4 content-area">
        {activeSection === 'dashboard' && (
          <div>
            <h3 className="text-primary mb-3">Dashboard</h3>
            <div className="row">
              <div className="col-md-4 mb-4">
                <Card className="shadow-sm border-primary">
                  <Card.Body>
                    <Card.Title>My Courses</Card.Title>
                    <h4>{courses.length}</h4>
                  </Card.Body>
                </Card>
              </div>
              <div className="col-md-4 mb-4">
                <Card className="shadow-sm border-warning">
                  <Card.Body>
                    <Card.Title>Active Quizzes</Card.Title>
                    <h4>{quizzes.length}</h4>
                  </Card.Body>
                </Card>
              </div>
              <div className="col-md-4 mb-4">
                <Card className="shadow-sm border-info">
                  <Card.Body>
                    <Card.Title>Badges Earned</Card.Title>
                    <h4>{badges.length}</h4>
                  </Card.Body>
                </Card>
              </div>
            </div>
            <p>Welcome to your student dashboard! Use the side menu to explore your learning tools.</p>
          </div>
        )}

        {activeSection === 'courses' && (
          <div>
            <h3 className="text-primary mb-3">My Courses</h3>
            <div className="row">
              {courses.map(course => (
                <div key={course.id} className="col-md-6 mb-4">
                  <Card className="shadow-sm">
                    <Card.Body>
                      <Card.Title>{course.title}</Card.Title>
                      <ProgressBar now={course.progress} label={`${course.progress}%`} className="mb-3" />
                      <div className="d-flex justify-content-between">
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() => {
                            navigate(`/learn/${course.id}`);
                            updateCourseProgress(course.id, Math.min(course.progress + 10, 100));
                            addNotification('info', `Continuing course: "${course.title}"`);
                          }}
                        >
                          Continue CourseLearningPage
                        </Button>
                        {course.progress > 0 && (
                          <Button
                            variant="outline-secondary"
                            size="sm"
                            onClick={() => {
                              updateCourseProgress(course.id, 0);
                              addNotification('info', `Progress for "${course.title}" has been reset.`);
                            }}
                          >
                            Reset Progress
                          </Button>
                        )}
                      </div>
                    </Card.Body>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeSection === 'quizzes' && (
          <div>
            <h3 className="text-primary mb-3">Quizzes</h3>
            <ul className="list-group">
              {quizzes.map(q => (
                <li key={q.id} className="list-group-item d-flex justify-content-between align-items-center">
                  <div>
                    <strong>{q.title}</strong> - {q.course}
                    <div className="text-muted">Due: {q.due}</div>
                  </div>
                  <Button
                    variant="warning"
                    size="sm"
                    onClick={() => {
                      if (!badges.includes('Quiz Master')) {
                        setBadges([...badges, 'Quiz Master']);
                        addNotification('info', 'You earned the "Quiz Master" badge!');
                      }
                      addNotification('success', `You completed "${q.title}" for ${q.course}!`);
                      const courseId = courses.find(c => c.title === q.course)?.id;
                      if (courseId) {
                        updateCourseProgress(courseId, Math.min(
                          courses.find(c => c.id === courseId)?.progress + 5 || 0,
                          100
                        ));
                      }
                    }}
                  >
                    Take Quiz
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {activeSection === 'assignments' && (
          <div>
            <h3 className="text-primary mb-3">Assignments</h3>
            <ul className="list-group">
              {assignments.map(a => (
                <li key={a.id} className="list-group-item d-flex justify-content-between align-items-center">
                  <div>
                    <strong>{a.title}</strong> - {a.course}
                    <div className="text-muted">Due: {a.due}</div>
                  </div>
                  <Button
                    variant="success"
                    size="sm"
                    onClick={() => {
                      addNotification('success', `Submitted "${a.title}" for ${a.course}!`);
                      const courseId = courses.find(c => c.title === a.course)?.id;
                      if (courseId) {
                        updateCourseProgress(
                          courseId,
                          Math.min(
                            courses.find(c => c.id === courseId)?.progress + 15 || 0,
                            100
                          )
                        );
                      }
                    }}
                  >
                    Submit Assignment
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {activeSection === 'badges' && (
          <div>
            <h3 className="text-primary mb-3">My Badges</h3>
            <div className="d-flex flex-wrap">
              {badges.map((b, i) => (
                <Badge key={i} bg="info" className="me-2 mb-2 p-2" style={{ fontSize: '1rem' }}>
                  <FaMedal className="me-1" /> {b}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {activeSection === 'certificates' && (
          <div>
            <h3 className="text-primary mb-3">Certificates</h3>
            {certificates.map((cert, i) => (
              <div key={i} className="d-flex justify-content-between align-items-center border rounded p-2 mb-2">
                <div>
                  <FaCertificate className="me-2 text-success" />
                  {cert}
                </div>
                <Button variant="outline-primary" size="sm">Download</Button>
              </div>
            ))}
          </div>
        )}

        {activeSection === 'notifications' && (
          <div>
            <h3 className="text-primary mb-3">Notifications</h3>
            {notifications.length === 0 ? (
              <p>No new notifications.</p>
            ) : (
              <ul className="list-group">
                {notifications.map(notification => (
                  <Alert
                    key={notification.id}
                    variant={notification.type}
                    onClose={() => clearNotification(notification.id)}
                    dismissible
                    className="mb-2"
                  >
                    {notification.message}
                  </Alert>
                ))}
              </ul>
            )}
          </div>
        )}

        {/* Enroll Modal */}
        <Modal show={showEnrollModal} onHide={() => setShowEnrollModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Enroll in a New Course</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Select Course</Form.Label>
                <Form.Select
                  value={selectedCourse}
                  onChange={(e) => setSelectedCourse(e.target.value)}
                >
                  <option value="">Choose a course...</option>
                  {availableCourses
                    .filter(course => !courses.some(c => c.id === course.id))
                    .map(course => (
                      <option key={course.id} value={course.id}>{course.title}</option>
                    ))}
                </Form.Select>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowEnrollModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleEnroll} disabled={!selectedCourse}>
              Enroll
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default StudentDashboard;