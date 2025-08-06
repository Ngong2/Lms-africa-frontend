import { useState, useEffect } from 'react';
import {
  Modal, Button, Form, Spinner
} from 'react-bootstrap';

const EditCourseModal = ({ show, handleClose, courseData, handleUpdateCourse }) => {
  const [course, setCourse] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // Define course categories as constants
  const COURSE_CATEGORIES = [
    "React Development",
    "Python Programming",
    "MongoDB Database",
    "Node.js Backend",
    "Graphic Design",
    "Cyber Security",
    "HTML & CSS Fundamentals",
    "JavaScript Essentials",
    "WordPress Website Development",
    "Digital Marketing Strategy"
  ];

  // Load courseData into state on open
  useEffect(() => {
    if (courseData) {
      setCourse({ ...courseData }); // clone to local state
    }
  }, [courseData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourse((prev) => ({ ...prev, [name]: value }));
  };

  const handleModulesChange = (index, field, value) => {
    const updatedModules = [...course.modules];
    updatedModules[index] = {
      ...updatedModules[index],
      [field]: value,
    };
    setCourse({ ...course, modules: updatedModules });
  };

  const updateLesson = (moduleIndex, lessonIndex, field, value) => {
    const updatedModules = [...course.modules];
    const updatedLessons = [...(updatedModules[moduleIndex].lessons || [])];
    updatedLessons[lessonIndex] = {
      ...updatedLessons[lessonIndex],
      [field]: value,
    };
    updatedModules[moduleIndex].lessons = updatedLessons;
    setCourse({ ...course, modules: updatedModules });
  };

  const addLesson = (moduleIndex) => {
    const updatedModules = [...course.modules];
    if (!updatedModules[moduleIndex].lessons) {
      updatedModules[moduleIndex].lessons = [];
    }
    updatedModules[moduleIndex].lessons.push({ title: '', type: '', content: '' });
    setCourse({ ...course, modules: updatedModules });
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    await new Promise((res) => setTimeout(res, 1000)); // simulate update
    handleUpdateCourse(course);
    setSubmitting(false);
    handleClose();
  };

  if (!course) return null;

  return (
    <Modal show={show} onHide={handleClose} size="lg" backdrop="static" scrollable>
      <Modal.Header closeButton>
        <Modal.Title>Edit Course</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Group className="mb-2">
            <Form.Label>Course Title</Form.Label>
            <Form.Control
              name="title"
              value={course.title}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Course Code</Form.Label>
            <Form.Control
              name="code"
              value={course.code}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              name="description"
              value={course.description}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Duration</Form.Label>
            <Form.Control
              name="duration"
              value={course.duration}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Price</Form.Label>
            <Form.Control
              name="price"
              type="number"
              value={course.price}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Category</Form.Label>
            <Form.Select name="category" value={course.category} onChange={handleChange}>
              <option value="">-- Select Category --</option>
              {COURSE_CATEGORIES.map((category, index) => (
                <option key={index} value={category}>{category}</option>
              ))}
            </Form.Select>
          </Form.Group>

          {course.modules.map((mod, idx) => (
            <div key={idx} className="border rounded p-3 mb-3 bg-light">
              <h6>Module {idx + 1}</h6>

              <Form.Group className="mb-2">
                <Form.Label>Module Name</Form.Label>
                <Form.Control
                  value={mod.name}
                  onChange={(e) => handleModulesChange(idx, 'name', e.target.value)}
                />
              </Form.Group>

              <h6 className="mt-3">Lessons</h6>
              {(mod.lessons || []).map((lesson, lIdx) => (
                <div key={lIdx} className="border rounded p-2 mb-2 bg-white">
                  <Form.Group className="mb-2">
                    <Form.Label>Lesson Title</Form.Label>
                    <Form.Control
                      value={lesson.title}
                      onChange={(e) =>
                        updateLesson(idx, lIdx, 'title', e.target.value)
                      }
                    />
                  </Form.Group>

                  <Form.Group className="mb-2">
                    <Form.Label>Content Type</Form.Label>
                    <Form.Select
                      value={lesson.type}
                      onChange={(e) =>
                        updateLesson(idx, lIdx, 'type', e.target.value)
                      }
                    >
                      <option value="">-- Select --</option>
                      <option value="video">Video File</option>
                      <option value="pdf">PDF Document</option>
                      <option value="youtube">YouTube Link</option>
                      <option value="text">Text</option>
                    </Form.Select>
                  </Form.Group>

                  <Form.Group className="mb-2">
                    <Form.Label>Content URL / Text</Form.Label>
                    <Form.Control
                      placeholder="https://... or plain text"
                      value={lesson.content}
                      onChange={(e) =>
                        updateLesson(idx, lIdx, 'content', e.target.value)
                      }
                    />
                  </Form.Group>
                </div>
              ))}

              <Button
                variant="outline-secondary"
                size="sm"
                onClick={() => addLesson(idx)}
              >
                + Add Lesson
              </Button>
            </div>
          ))}
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose} disabled={submitting}>
          Cancel
        </Button>
        <Button variant="success" onClick={handleSubmit} disabled={submitting}>
          {submitting ? (
            <>
              <Spinner animation="border" size="sm" className="me-2" />
              Updating...
            </>
          ) : (
            'Update Course'
          )}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditCourseModal;