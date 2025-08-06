import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Button, Form, Alert, ProgressBar } from 'react-bootstrap';

const quizQuestions = {
  1: {
    title: 'React Quiz 1',
    questions: [
      {
        id: 1,
        text: 'What is JSX?',
        options: ['A CSS framework', 'A JavaScript extension', 'A database', 'None of the above'],
        correct: 1,
      },
      {
        id: 2,
        text: 'Which hook is used for state in React?',
        options: ['useEffect', 'useReducer', 'useState', 'useRef'],
        correct: 2,
      },
    ],
  },
  2: {
    title: 'Node Quiz 2',
    questions: [
      {
        id: 1,
        text: 'What is Express.js?',
        options: ['A React plugin', 'A Node.js framework', 'A SQL database', 'An OS'],
        correct: 1,
      },
    ],
  },
};

const QuizPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const quiz = quizQuestions[id];

  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  if (!quiz) return <Alert variant="danger">Quiz not found</Alert>;

  const handleChange = (qId, optionIndex) => {
    setAnswers({ ...answers, [qId]: optionIndex });
  };

  const handleSubmit = () => {
    let correct = 0;
    quiz.questions.forEach(q => {
      if (answers[q.id] === q.correct) correct++;
    });
    setScore(correct);
    setSubmitted(true);
  };

  const handleBack = () => navigate('/student');

  return (
    <div className="container my-5">
      <h3 className="text-primary mb-4">{quiz.title}</h3>

      {submitted ? (
        <Card className="p-4 text-center shadow-sm">
          <h4>Your Score</h4>
          <ProgressBar
            now={(score / quiz.questions.length) * 100}
            label={`${score} / ${quiz.questions.length}`}
            className="my-3"
          />
          <Button variant="primary" onClick={handleBack}>Back to Dashboard</Button>
        </Card>
      ) : (
        <Form>
          {quiz.questions.map((q, index) => (
            <Card key={q.id} className="mb-4 shadow-sm">
              <Card.Body>
                <Card.Title>Question {index + 1}</Card.Title>
                <p>{q.text}</p>
                {q.options.map((option, idx) => (
                  <Form.Check
                    type="radio"
                    name={`question-${q.id}`}
                    label={option}
                    key={idx}
                    value={idx}
                    checked={answers[q.id] === idx}
                    onChange={() => handleChange(q.id, idx)}
                    className="mb-2"
                  />
                ))}
              </Card.Body>
            </Card>
          ))}

          <Button variant="success" onClick={handleSubmit} className="mt-3">
            Submit Answers
          </Button>
        </Form>
      )}
    </div>
  );
};

export default QuizPage;