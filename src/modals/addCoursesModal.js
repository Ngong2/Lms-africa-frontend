import { useState } from 'react';
import { Modal, Button, Form, Spinner, Accordion } from 'react-bootstrap';

const AddCourseModal = ({ show, handleClose, handleSubmitCourse }) => {
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

  const [course, setCourse] = useState({
    title: '',
    code: '',
    description: '',
    duration: '',
    price: '',
    category: '',
    numModules: '',
    modules: [],
  });

  const [submitting, setSubmitting] = useState(false);
  const [activeModuleIndex, setActiveModuleIndex] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourse({ ...course, [name]: value });
  };

  const handleNumModulesChange = (e) => {
    const count = parseInt(e.target.value) || 0;
    setCourse({
      ...course,
      numModules: count,
      modules: Array.from({ length: count }, () => ({
        name: '',
        lessons: [],
      })),
    });
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
    updatedModules[moduleIndex].lessons.push({ 
      title: '', 
      type: '', 
      content: '',
      duration: '' 
    });
    setCourse({ ...course, modules: updatedModules });
  };

  const removeLesson = (moduleIndex, lessonIndex) => {
    const updatedModules = [...course.modules];
    updatedModules[moduleIndex].lessons.splice(lessonIndex, 1);
    setCourse({ ...course, modules: updatedModules });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await new Promise((res) => setTimeout(res, 2000)); // simulate saving
      handleSubmitCourse(course);
      handleClose();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg" backdrop="static" scrollable>
      <Modal.Header closeButton>
        <Modal.Title>Add New Course</Modal.Title>
      </Modal.Header>

      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <div className="row">
            <div className="col-md-6">
              <Form.Group className="mb-3">
                <Form.Label>Course Title *</Form.Label>
                <Form.Control 
                  name="title" 
                  onChange={handleChange} 
                  required 
                />
              </Form.Group>
            </div>
            <div className="col-md-6">
              <Form.Group className="mb-3">
                <Form.Label>Course Code *</Form.Label>
                <Form.Control 
                  name="code" 
                  onChange={handleChange} 
                  required 
                />
              </Form.Group>
            </div>
          </div>

          <Form.Group className="mb-3">
            <Form.Label>Description *</Form.Label>
            <Form.Control 
              as="textarea" 
              name="description" 
              rows={3} 
              onChange={handleChange} 
              required 
            />
          </Form.Group>

          <div className="row">
            <div className="col-md-4">
              <Form.Group className="mb-3">
                <Form.Label>Duration *</Form.Label>
                <Form.Control 
                  name="duration" 
                  placeholder="e.g., 6 weeks" 
                  onChange={handleChange} 
                  required 
                />
              </Form.Group>
            </div>
            <div className="col-md-4">
              <Form.Group className="mb-3">
                <Form.Label>Price ($) *</Form.Label>
                <Form.Control 
                  name="price" 
                  type="number" 
                  min="0" 
                  step="0.01" 
                  onChange={handleChange} 
                  required 
                />
              </Form.Group>
            </div>
            <div className="col-md-4">
              <Form.Group className="mb-3">
                <Form.Label>Category *</Form.Label>
                <Form.Select 
                  name="category" 
                  onChange={handleChange} 
                  required
                >
                  <option value="">-- Select Category --</option>
                  {COURSE_CATEGORIES.map((category, index) => (
                    <option key={index} value={category}>{category}</option>
                  ))}
                </Form.Select>
              </Form.Group>
            </div>
          </div>

          <Form.Group className="mb-3">
            <Form.Label>Number of Modules *</Form.Label>
            <Form.Control
              name="numModules"
              type="number"
              min="0"
              onChange={handleNumModulesChange}
              required
            />
          </Form.Group>

          <Accordion activeKey={activeModuleIndex} onSelect={(key) => setActiveModuleIndex(key)}>
            {course.modules.map((mod, idx) => (
              <Accordion.Item key={idx} eventKey={idx} className="mb-3">
                <Accordion.Header>Module {idx + 1}: {mod.name || 'Untitled Module'}</Accordion.Header>
                <Accordion.Body>
                  <Form.Group className="mb-3">
                    <Form.Label>Module Name *</Form.Label>
                    <Form.Control
                      value={mod.name}
                      onChange={(e) => handleModulesChange(idx, 'name', e.target.value)}
                      required
                    />
                  </Form.Group>

                  <h6 className="mb-3">Lessons</h6>
                  {(mod.lessons || []).map((lesson, lIdx) => (
                    <div key={lIdx} className="border rounded p-3 mb-3 bg-white">
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <h6 className="mb-0">Lesson {lIdx + 1}</h6>
                        <Button 
                          variant="outline-danger" 
                          size="sm" 
                          onClick={() => removeLesson(idx, lIdx)}
                        >
                          Remove
                        </Button>
                      </div>

                      <Form.Group className="mb-3">
                        <Form.Label>Lesson Title *</Form.Label>
                        <Form.Control
                          value={lesson.title}
                          onChange={(e) => updateLesson(idx, lIdx, 'title', e.target.value)}
                          required
                        />
                      </Form.Group>

                      <div className="row">
                        <div className="col-md-6">
                          <Form.Group className="mb-3">
                            <Form.Label>Content Type *</Form.Label>
                            <Form.Select
                              value={lesson.type}
                              onChange={(e) => updateLesson(idx, lIdx, 'type', e.target.value)}
                              required
                            >
                              <option value="">-- Select --</option>
                              <option value="video">Video File</option>
                              <option value="pdf">PDF Document</option>
                              <option value="youtube">YouTube Link</option>
                              <option value="text">Text</option>
                              <option value="quiz">Quiz</option>
                            </Form.Select>
                          </Form.Group>
                        </div>
                        <div className="col-md-6">
                          <Form.Group className="mb-3">
                            <Form.Label>Duration</Form.Label>
                            <Form.Control
                              placeholder="e.g., 30 minutes"
                              value={lesson.duration}
                              onChange={(e) => updateLesson(idx, lIdx, 'duration', e.target.value)}
                            />
                          </Form.Group>
                        </div>
                      </div>

                      <Form.Group className="mb-3">
                        <Form.Label>Content URL / Text *</Form.Label>
                        <Form.Control
                          as={lesson.type === 'text' ? 'textarea' : 'input'}
                          rows={lesson.type === 'text' ? 3 : undefined}
                          placeholder={
                            lesson.type === 'youtube' ? 'YouTube URL (https://youtube.com/...)'
                            : lesson.type === 'pdf' ? 'PDF URL or filename'
                            : lesson.type === 'video' ? 'Video URL or filename'
                            : lesson.type === 'text' ? 'Lesson content text'
                            : lesson.type === 'quiz' ? 'Quiz ID or name'
                            : 'Content reference'
                          }
                          value={lesson.content}
                          onChange={(e) => updateLesson(idx, lIdx, 'content', e.target.value)}
                          required
                        />
                      </Form.Group>
                    </div>
                  ))}

                  <Button
                    variant="outline-primary"
                    onClick={() => addLesson(idx)}
                    className="mt-2"
                  >
                    + Add Lesson
                  </Button>
                </Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose} disabled={submitting}>
            Cancel
          </Button>
          <Button variant="primary" type="submit" disabled={submitting}>
            {submitting ? (
              <>
                <Spinner animation="border" size="sm" className="me-2" />
                Saving...
              </>
            ) : (
              'Add Course'
            )}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default AddCourseModal;