

import React, { useState, useEffect } from "react";
import { Card, Container, Row, Col, Button, ProgressBar, ListGroup } from "react-bootstrap";
import axios from 'axios';

const StudentProfile = () => {
  const [student, setStudent] = useState({
    name: '',
    email: '',
    phone: '',
    photo: '',
    bio: '',
    courses: []
  });

  useEffect(() => {
    // Fetch student data from API
    const fetchStudentData = async () => {
      try {
        const response = await axios.get('/api/student/profile');
        setStudent(response.data);
      } catch (error) {
        console.error("Error fetching student data:", error);
      }
    };

    fetchStudentData();
  }, []);

  return (
    <Container className="my-5">
      <Card className="shadow-lg p-4">
        <Row>
          <Col md={4} className="text-center">
            <img
              src={student.photo || "https://via.placeholder.com/150"}
              alt="Student"
              className="img-fluid rounded-circle mb-3"
              style={{ width: "150px", height: "150px", objectFit: "cover" }}
            />
            <h4>{student.name}</h4>
            <p className="text-muted">{student.email}</p>
            <p>{student.phone}</p>
            <Button variant="primary" className="mt-3">
              Edit Profile
            </Button>
          </Col>

          <Col md={8}>
            <h5>Enrolled Courses</h5>
            <ListGroup variant="flush">
              {student.courses.map((course, index) => (
                <ListGroup.Item key={index}>
                  <div className="d-flex justify-content-between align-items-center">
                    <span>{course.title}</span>
                    <ProgressBar now={course.progress} label={`${course.progress}%`} style={{ width: "50%" }} />
                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>

            <h5 className="mt-4">Bio</h5>
            <p>{student.bio || "No bio provided."}</p>
          </Col>
        </Row>
      </Card>
    </Container>
  );
};

export default StudentProfile;