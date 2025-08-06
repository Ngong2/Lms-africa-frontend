import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Card, Button, Navbar, Nav, Table } from 'react-bootstrap';
import AddCourseModal from '../modals/addCoursesModal';
import EditCourseModal from '../modals/editCoursesModal';

const InstructorDashboard = () => {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [activeSection, setActiveSection] = useState('dashboard');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const [courses, setCourses] = useState([
    { id: 1, title: 'React for Beginners', category: 'Web Development', enrolled: 120 },
    { id: 2, title: 'Data Structures', category: 'Computer Science', enrolled: 85 },
    { id: 3, title: 'UI/UX Basics', category: 'Design', enrolled: 60 }
  ]);

  const handleAddCourse = (newCourse) => {
    setCourses([{ ...newCourse, id: courses.length + 1, enrolled: 0 }, ...courses]);
  };

  const handleEdit = (course) => {
    setSelectedCourse(course);
    setShowEditModal(true);
  };

  const handleUpdateCourse = (updatedCourse) => {
    const updated = courses.map(c =>
      c.id === updatedCourse.id ? updatedCourse : c
    );
    setCourses(updated);
    setShowEditModal(false);
  };

  const handleDelete = (id) => {
    setCourses(courses.filter(course => course.id !== id));
  };

  const handleNavClick = (section) => {
    setActiveSection(section);
  };

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <div className="bg-dark text-white p-3 vh-100" style={{ width: '250px' }}>
        <h4 className="mb-4">Instructor</h4>
        <Nav defaultActiveKey="dashboard" className="flex-column">
          {['dashboard', 'courses', 'students', 'quizzes', 'assignments', 'forums', 'messages', 'notifications'].map(section => (
            <Nav.Link
              key={section}
              className="text-white"
              onClick={() => handleNavClick(section)}
            >
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </Nav.Link>
          ))}
        </Nav>
      </div>

      {/* Main Content */}
      <div className="flex-grow-1 p-4" style={{ backgroundColor: '#f8f9fa' }}>
        <Navbar bg="light" expand="lg" className="mb-4">
          <Container fluid>
            <Navbar.Brand>Welcome, Instructor</Navbar.Brand>
          </Container>
        </Navbar>

        {/* Dashboard Section */}
        {activeSection === 'dashboard' && (
          <Row className="g-4">
            <Col md={6} lg={4}>
              <Card>
                <Card.Body>
                  <Card.Title>My Courses</Card.Title>
                  <Card.Text>Manage your courses.</Card.Text>
                  <Button variant="primary" onClick={() => handleNavClick('courses')}>View Courses</Button>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6} lg={4}>
              <Card>
                <Card.Body>
                  <Card.Title>My Students</Card.Title>
                  <Card.Text>See student activity.</Card.Text>
                  <Button variant="primary" onClick={() => handleNavClick('students')}>View Students</Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        )}

        {/* Courses Section */}
        {activeSection === 'courses' && (
          <>
            <h4 className="mb-4">My Courses</h4>
            <div className="mb-3 text-end">
              <Button variant="primary" size="sm" onClick={() => setShowAddModal(true)}>+ Add New Course</Button>
            </div>

            <AddCourseModal
              show={showAddModal}
              handleClose={() => setShowAddModal(false)}
              handleSubmitCourse={handleAddCourse}
            />

            <EditCourseModal
              show={showEditModal}
              handleClose={() => setShowEditModal(false)}
              course={selectedCourse}
              handleUpdate={handleUpdateCourse}
            />

            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Course Title</th>
                  <th>Category</th>
                  <th>Enrolled</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {courses.map((course, index) => (
                  <tr key={course.id}>
                    <td>{index + 1}</td>
                    <td>{course.title}</td>
                    <td>{course.category}</td>
                    <td>{course.enrolled}</td>
                    <td>
                      <Button variant="info" size="sm" className="me-2">View</Button>
                      <Button variant="warning" size="sm" className="me-2" onClick={() => handleEdit(course)}>Edit</Button>
                      <Button variant="danger" size="sm" onClick={() => handleDelete(course.id)}>Delete</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </>
        )}

        {/* Students Section */}
        {activeSection === 'students' && (
          <>
            <h4 className="mb-4">Students Enrolled in My Courses</h4>
            {courses.map(course => {
              const enrolledStudents = [
                { id: 1, name: 'Alice Kimani', email: 'alice@example.com', courseId: 1 },
                { id: 2, name: 'John Otieno', email: 'john@example.com', courseId: 1 },
                { id: 3, name: 'Mary Njeri', email: 'mary@example.com', courseId: 2 },
                { id: 4, name: 'James Mwangi', email: 'james@example.com', courseId: 3 },
                { id: 5, name: 'Grace Wanjiku', email: 'grace@example.com', courseId: 2 },
              ].filter(student => student.courseId === course.id);

              return (
                <Card className="mb-4" key={course.id}>
                  <Card.Body>
                    <Card.Title>{course.title}</Card.Title>
                    {enrolledStudents.length > 0 ? (
                      <Table striped bordered hover responsive className="mt-3">
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>Student Name</th>
                            <th>Email</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {enrolledStudents.map((student, index) => (
                            <tr key={student.id}>
                              <td>{index + 1}</td>
                              <td>{student.name}</td>
                              <td>{student.email}</td>
                              <td>
                                <Button variant="info" size="sm" className="me-2">Message</Button>
                                <Button variant="danger" size="sm">Remove</Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    ) : (
                      <p className="text-muted">No students enrolled in this course yet.</p>
                    )}
                  </Card.Body>
                </Card>
              );
            })}
          </>
        )}

        {/* Other sections */}
        {['quizzes', 'assignments', 'forums', 'messages', 'notifications'].includes(activeSection) && (
          <Card>
            <Card.Body>
              <Card.Title>{activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}</Card.Title>
              <Card.Text>
                {activeSection === 'quizzes' && 'Create and manage quizzes here.'}
                {activeSection === 'assignments' && 'Upload and grade assignments.'}
                {activeSection === 'forums' && 'Engage in class discussions.'}
                {activeSection === 'messages' && 'Inbox and student messages.'}
                {activeSection === 'notifications' && 'Recent updates and platform messages.'}
              </Card.Text>
              <Button variant="primary">
                {activeSection === 'quizzes' ? 'Create New Quiz' :
                 activeSection === 'assignments' ? 'Manage Assignments' :
                 activeSection === 'forums' ? 'Go to Forum' :
                 activeSection === 'messages' ? 'Open Inbox' :
                 'View All'}
              </Button>
            </Card.Body>
          </Card>
        )}
      </div>
    </div>
  );
};

export default InstructorDashboard;
