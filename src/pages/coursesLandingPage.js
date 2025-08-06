
import React, { useState, useEffect, useMemo } from 'react';

const CourseLearningPage = () => {
  const simulatedCourseId = 1;

  // Function to simulate navigation (reloads the component with a new courseId)
  const simulateNavigate = (path) => {
    console.log(`Simulating navigation to: ${path}`);
  };

  // Helper function to generate placeholder lessons for a module
  const generatePlaceholderLessons = (moduleTitle, moduleId) => {
    const lessons = [];
    const videoUrls = [
      "https://www.youtube.com/embed/dGcsHMXbSOA",
      "https://www.youtube.com/embed/4UZrsTqkcW4",
      "https://www.youtube.com/embed/kqtD5dpn9C8",
      "https://www.youtube.com/embed/WG5ikvJ2Acb",
      "https://www.youtube.com/embed/EN6Q_y5mPjM",
      "https://www.youtube.com/embed/yQO7Iq5U3o8",
      "https://www.youtube.com/embed/inWWhr5tnEA",
      "https://www.youtube.com/embed/G3e-cpL7ofc",
      "https://www.youtube.com/embed/W6NZfCO5sks",
      "https://www.youtube.com/embed/0S4xXjP0wV8",
      "https://www.youtube.com/embed/Qd6_qG2x2c0"
    ];
    const pdfUrls = [
      "/docs/course-overview.pdf",
      "/docs/advanced-concepts.pdf",
      "/docs/best-practices.pdf"
    ];

    // Generate 3 lessons per module: video, note, and PDF
    const lessonTypes = ['video', 'note', 'pdf'];
    
    for (let i = 0; i < 3; i++) {
      const type = lessonTypes[i];
      let content = '';
      let url = '';

      switch (type) {
        case 'video':
          url = videoUrls[Math.floor(Math.random() * videoUrls.length)];
          content = `Watch this video on ${moduleTitle} - Lesson ${i + 1}.`;
          break;
        case 'pdf':
          url = pdfUrls[Math.floor(Math.random() * pdfUrls.length)];
          content = `Download the PDF for ${moduleTitle} - Lesson ${i + 1}.`;
          break;
        case 'note':
          content = `Key concepts for ${moduleTitle} - Lesson ${i + 1}:
          1. Fundamental principles
          2. Practical applications
          3. Common pitfalls to avoid
          4. Best practices
          5. Real-world examples`;
          break;
        default:
          break;
      }

      lessons.push({
        id: (moduleId * 100) + i + 1,
        title: `${moduleTitle} - Lesson ${i + 1}`,
        type: type,
        url: url,
        content: content,
      });
    }

    return lessons;
  };

  // Helper function to generate quizzes (4 per course)
  const generateQuizzes = (courseTitle) => {
    const quizzes = [];
    for (let i = 1; i <= 4; i++) {
      quizzes.push({
        id: 1000 + i,
        title: `${courseTitle} - Quiz ${i}`,
        type: 'quiz',
        questions: Array(5).fill().map((_, qIdx) => ({
          id: qIdx + 1,
          question: `Quiz ${i} Question ${qIdx + 1}: What is the correct answer?`,
          options: ['Option A', 'Option B', 'Option C', 'Option D'],
          correctAnswer: Math.floor(Math.random() * 4) // Random correct answer index
        }))
      });
    }
    return quizzes;
  };

  // Helper function to generate assignments (8 per course)
  const generateAssignments = (courseTitle) => {
    const assignments = [];
    for (let i = 1; i <= 8; i++) {
      assignments.push({
        id: 2000 + i,
        title: `${courseTitle} - Assignment ${i}`,
        type: 'assignment',
        description: `Complete the following tasks for Assignment ${i}:
        1. Research the topic
        2. Write a 500-word summary
        3. Create a practical example
        4. Submit your work by the deadline`,
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000 * i).toISOString().split('T')[0] // 1 week apart
      });
    }
    return assignments;
  };

  // Helper function to generate final exam (20 questions)
  const generateFinalExam = (courseTitle) => {
    return {
      id: 3000,
      title: `${courseTitle} - Final Exam`,
      type: 'exam',
      questions: Array(20).fill().map((_, qIdx) => ({
        id: qIdx + 1,
        question: `Final Exam Question ${qIdx + 1}: What is the correct answer?`,
        options: ['Option A', 'Option B', 'Option C', 'Option D'],
        correctAnswer: Math.floor(Math.random() * 4) // Random correct answer index
      })),
      passingScore: 70,
      timeLimit: 60 // minutes
    };
  };

  const availableCourses = useMemo(() => ({
    1: {
      id: 1,
      title: 'React Development',
      description: 'Learn React from scratch and build modern web applications.',
      modules: [
        { id: 1, title: 'React Basics & JSX' },
        { id: 2, title: 'State, Props & Component Lifecycle' },
        { id: 3, title: 'Hooks & Context API' },
        { id: 4, title: 'React Router DOM' },
        { id: 5, title: 'Form Handling & Validation' },
        { id: 6, title: 'Building a Full-Stack React App' },
      ].map(mod => ({ ...mod, lessons: generatePlaceholderLessons(mod.title, mod.id) })),
      quizzes: generateQuizzes('React Development'),
      assignments: generateAssignments('React Development'),
      finalExam: generateFinalExam('React Development')
    },
    2: {
      id: 2,
      title: 'Python Programming',
      description: 'Master Python for data science, automation, and web development.',
      modules: [
        { id: 1, title: 'Getting Started with Python' },
        { id: 2, title: 'Data Structures & Algorithms' },
        { id: 3, title: 'Object-Oriented Programming (OOP)' },
        { id: 4, title: 'File Handling & Exception Handling' },
        { id: 5, title: 'Web Development with Flask/Django' },
        { id: 6, title: 'Data Analysis with Pandas' },
      ].map(mod => ({ ...mod, lessons: generatePlaceholderLessons(mod.title, mod.id) })),
      quizzes: generateQuizzes('Python Programming'),
      assignments: generateAssignments('Python Programming'),
      finalExam: generateFinalExam('Python Programming')
    },
    3: {
      id: 3,
      title: 'MongoDB Database',
      description: 'Learn NoSQL database design and implementation with MongoDB for modern applications.',
      modules: [
        { id: 1, title: 'Introduction to NoSQL & MongoDB' },
        { id: 2, title: 'CRUD Operations' },
        { id: 3, title: 'Indexing & Aggregation Pipeline' },
        { id: 4, title: 'Schema Design & Data Modeling' },
        { id: 5, title: 'Integration with Node.js/Python' },
        { id: 6, title: 'Database Security & Best Practices' },
      ].map(mod => ({ ...mod, lessons: generatePlaceholderLessons(mod.title, mod.id) })),
      quizzes: generateQuizzes('MongoDB Database'),
      assignments: generateAssignments('MongoDB Database'),
      finalExam: generateFinalExam('MongoDB Database')
    },
    4: {
      id: 4,
      title: 'Node.js Backend',
      description: 'Build scalable and robust server-side applications using Node.js, Express, and databases.',
      modules: [
        { id: 1, title: 'Node.js Fundamentals & NPM' },
        { id: 2, title: 'Asynchronous JavaScript & Event Loop' },
        { id: 3, title: 'Express.js Framework' },
        { id: 4, title: 'RESTful APIs Development' },
        { id: 5, title: 'Database Integration (MongoDB/PostgreSQL)' },
        { id: 6, title: 'Authentication & Authorization' },
        { id: 7, title: 'Deployment & Scaling' },
      ].map(mod => ({ ...mod, lessons: generatePlaceholderLessons(mod.title, mod.id) })),
      quizzes: generateQuizzes('Node.js Backend'),
      assignments: generateAssignments('Node.js Backend'),
      finalExam: generateFinalExam('Node.js Backend')
    },
    5: {
      id: 5,
      title: 'Graphic Design',
      description: 'Master industry-standard tools like Photoshop and Canva to create stunning visual content for web and print.',
      modules: [
        { id: 1, title: 'Design Principles & Color Theory' },
        { id: 2, title: 'Adobe Photoshop Essentials' },
        { id: 3, title: 'Canva for Quick Designs' },
        { id: 4, title: 'Typography & Layout' },
        { id: 5, title: 'Branding & Logo Design' },
        { id: 6, title: 'Portfolio Development' },
      ].map(mod => ({ ...mod, lessons: generatePlaceholderLessons(mod.title, mod.id) })),
      quizzes: generateQuizzes('Graphic Design'),
      assignments: generateAssignments('Graphic Design'),
      finalExam: generateFinalExam('Graphic Design')
    },
    6: {
      id: 6,
      title: 'Cyber Security',
      description: 'Understand fundamental cybersecurity concepts, threats, and defensive strategies to protect digital assets.',
      modules: [
        { id: 1, title: 'Introduction to Cyber Security' },
        { id: 2, title: 'Network Security Fundamentals' },
        { id: 3, title: 'Threats, Attacks & Vulnerabilities' },
        { id: 4, title: 'Cryptography Basics' },
        { id: 5, title: 'Incident Response & Forensics' },
        { id: 6, title: 'Security Best Practices' },
      ].map(mod => ({ ...mod, lessons: generatePlaceholderLessons(mod.title, mod.id) })),
      quizzes: generateQuizzes('Cyber Security'),
      assignments: generateAssignments('Cyber Security'),
      finalExam: generateFinalExam('Cyber Security')
    },
    7: {
      id: 7,
      title: 'HTML & CSS Fundamentals',
      description: 'Build the foundational structure and style of responsive web pages from scratch.',
      modules: [
        { id: 1, title: 'HTML Structure & Elements' },
        { id: 2, title: 'CSS Styling & Selectors' },
        { id: 3, title: 'Box Model & Positioning' },
        { id: 4, title: 'Responsive Design with Flexbox & Grid' },
        { id: 5, title: 'Transitions & Animations' },
        { id: 6, title: 'Introduction to Web Accessibility' },
      ].map(mod => ({ ...mod, lessons: generatePlaceholderLessons(mod.title, mod.id) })),
      quizzes: generateQuizzes('HTML & CSS Fundamentals'),
      assignments: generateAssignments('HTML & CSS Fundamentals'),
      finalExam: generateFinalExam('HTML & CSS Fundamentals')
    },
    8: {
      id: 8,
      title: 'JavaScript Essentials',
      description: 'Dive into the core concepts of JavaScript to create dynamic and interactive web experiences.',
      modules: [
        { id: 1, title: 'JS Syntax & Data Types' },
        { id: 2, title: 'Control Flow & Functions' },
        { id: 3, title: 'DOM Manipulation' },
        { id: 4, title: 'Events & Asynchronous JavaScript' },
        { id: 5, title: 'ES6+ Features' },
        { id: 6, title: 'Introduction to APIs' },
      ].map(mod => ({ ...mod, lessons: generatePlaceholderLessons(mod.title, mod.id) })),
      quizzes: generateQuizzes('JavaScript Essentials'),
      assignments: generateAssignments('JavaScript Essentials'),
      finalExam: generateFinalExam('JavaScript Essentials')
    },
    9: {
      id: 9,
      title: 'WordPress Website Development',
      description: 'Create and manage powerful, customizable websites without coding using the world\'s most popular CMS.',
      modules: [
        { id: 1, title: 'WordPress Installation & Setup' },
        { id: 2, title: 'Themes & Plugins Management' },
        { id: 3, title: 'Content Creation & Management' },
        { id: 4, title: 'Customization with Elementor/Page Builders' },
        { id: 5, title: 'E-commerce with WooCommerce' },
        { id: 6, title: 'Security & Maintenance' },
      ].map(mod => ({ ...mod, lessons: generatePlaceholderLessons(mod.title, mod.id) })),
      quizzes: generateQuizzes('WordPress Website Development'),
      assignments: generateAssignments('WordPress Website Development'),
      finalExam: generateFinalExam('WordPress Website Development')
    },
    10: {
      id: 10,
      title: 'Digital Marketing Strategy',
      description: 'Master SEO, social media marketing, content marketing, and email campaigns to boost online presence and drive growth.',
      modules: [
        { id: 1, title: 'Introduction to Digital Marketing' },
        { id: 2, title: 'Search Engine Optimization (SEO)' },
        { id: 3, title: 'Social Media Marketing' },
        { id: 4, title: 'Content Marketing' },
        { id: 5, title: 'Email Marketing' },
        { id: 6, title: 'Analytics & Reporting' },
      ].map(mod => ({ ...mod, lessons: generatePlaceholderLessons(mod.title, mod.id) })),
      quizzes: generateQuizzes('Digital Marketing Strategy'),
      assignments: generateAssignments('Digital Marketing Strategy'),
      finalExam: generateFinalExam('Digital Marketing Strategy')
    },
  }), []);

  const [currentModuleIndex, setCurrentModuleIndex] = useState(0);
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [course, setCourse] = useState(null);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [currentAssignmentIndex, setCurrentAssignmentIndex] = useState(0);
  const [currentExamQuestionIndex, setCurrentExamQuestionIndex] = useState(0);
  const [currentView, setCurrentView] = useState('lessons'); // 'lessons', 'quizzes', 'assignments', 'exam'
  const [quizAnswers, setQuizAnswers] = useState({});
  const [examAnswers, setExamAnswers] = useState({});
  const [quizScore, setQuizScore] = useState(null);
  const [examScore, setExamScore] = useState(null);

  useEffect(() => {
    const courseId = simulatedCourseId;
    if (courseId && availableCourses[courseId]) {
      setCourse(availableCourses[courseId]);
      const savedProgress = localStorage.getItem(`courseProgress_${courseId}`);
      setProgress(savedProgress ? parseInt(savedProgress) : 0);
    } else {
      simulateNavigate('/dashboard/courses');
    }
  }, [simulatedCourseId, availableCourses]);

  if (!course) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-lg font-semibold text-gray-700">Loading course...</div>
      </div>
    );
  }

  const currentModule = course.modules[currentModuleIndex];
  const currentLesson = currentModule.lessons[currentLessonIndex];
  const currentQuiz = course.quizzes[currentQuizIndex];
  const currentAssignment = course.assignments[currentAssignmentIndex];
  const currentExamQuestion = course.finalExam.questions[currentExamQuestionIndex];

  const updateProgress = (newProgress) => {
    setProgress(newProgress);
    localStorage.setItem(`courseProgress_${course.id}`, newProgress.toString());
  };

  const handleNextLesson = () => {
    const nextLessonIdx = currentLessonIndex + 1;
    const totalLessonsInCurrentModule = currentModule.lessons.length;

    if (nextLessonIdx < totalLessonsInCurrentModule) {
      setCurrentLessonIndex(nextLessonIdx);
    } else if (currentModuleIndex + 1 < course.modules.length) {
      setCurrentModuleIndex(currentModuleIndex + 1);
      setCurrentLessonIndex(0);
    } else {
      // Course lessons completed, move to quizzes
      setCurrentView('quizzes');
      return;
    }

    updateProgressBasedOnCompletion();
  };

  const handlePreviousLesson = () => {
    if (currentLessonIndex > 0) {
      setCurrentLessonIndex(currentLessonIndex - 1);
    } else if (currentModuleIndex > 0) {
      const prevModule = course.modules[currentModuleIndex - 1];
      setCurrentModuleIndex(currentModuleIndex - 1);
      setCurrentLessonIndex(prevModule.lessons.length - 1);
    }

    updateProgressBasedOnCompletion();
  };

  const updateProgressBasedOnCompletion = () => {
    let completedLessonsCount = 0;
    let totalLessonsCount = 0;

    course.modules.forEach((module, modIdx) => {
      totalLessonsCount += module.lessons.length;
      if (modIdx < currentModuleIndex) {
        completedLessonsCount += module.lessons.length;
      } else if (modIdx === currentModuleIndex) {
        completedLessonsCount += (currentLessonIndex + 1);
      }
    });

    const newProgress = Math.min(Math.round((completedLessonsCount / totalLessonsCount) * 100), 100);
    updateProgress(newProgress);
  };

  const handleNextQuiz = () => {
    if (currentQuizIndex + 1 < course.quizzes.length) {
      setCurrentQuizIndex(currentQuizIndex + 1);
      setQuizScore(null);
    } else {
      // All quizzes completed, move to assignments
      setCurrentView('assignments');
    }
  };

  const handlePreviousQuiz = () => {
    if (currentQuizIndex > 0) {
      setCurrentQuizIndex(currentQuizIndex - 1);
      setQuizScore(null);
    }
  };

  const handleNextAssignment = () => {
    if (currentAssignmentIndex + 1 < course.assignments.length) {
      setCurrentAssignmentIndex(currentAssignmentIndex + 1);
    } else {
      // All assignments completed, move to final exam
      setCurrentView('exam');
    }
  };

  const handlePreviousAssignment = () => {
    if (currentAssignmentIndex > 0) {
      setCurrentAssignmentIndex(currentAssignmentIndex - 1);
    }
  };

  const handleNextExamQuestion = () => {
    if (currentExamQuestionIndex + 1 < course.finalExam.questions.length) {
      setCurrentExamQuestionIndex(currentExamQuestionIndex + 1);
    } else {
      // Exam completed, calculate score
      calculateExamScore();
    }
  };

  const handlePreviousExamQuestion = () => {
    if (currentExamQuestionIndex > 0) {
      setCurrentExamQuestionIndex(currentExamQuestionIndex - 1);
    }
  };

  const handleQuizAnswerSelect = (questionId, answerIndex) => {
    setQuizAnswers({
      ...quizAnswers,
      [questionId]: answerIndex
    });
  };

  const handleExamAnswerSelect = (questionId, answerIndex) => {
    setExamAnswers({
      ...examAnswers,
      [questionId]: answerIndex
    });
  };

  const calculateQuizScore = () => {
    let correct = 0;
    currentQuiz.questions.forEach(question => {
      if (quizAnswers[question.id] === question.correctAnswer) {
        correct++;
      }
    });
    const score = Math.round((correct / currentQuiz.questions.length) * 100);
    setQuizScore(score);
  };

  const calculateExamScore = () => {
    let correct = 0;
    course.finalExam.questions.forEach(question => {
      if (examAnswers[question.id] === question.correctAnswer) {
        correct++;
      }
    });
    const score = Math.round((correct / course.finalExam.questions.length) * 100);
    setExamScore(score);
    if (score >= course.finalExam.passingScore) {
      updateProgress(100);
    }
  };

  const renderLessonView = () => (
    <>
      <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">{currentLesson.title}</h2>

      {currentLesson.type === 'video' && (
        <div className="relative pt-[56.25%] mb-6 rounded-lg overflow-hidden shadow-md">
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src={currentLesson.url}
            title="Video Lesson"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      )}

      {currentLesson.type === 'pdf' && (
        <div className="bg-blue-50 border border-blue-200 text-blue-800 p-4 rounded-lg mb-6 shadow-sm">
          <p className="mb-3">This is a PDF document. Click the button below to open it in a new tab.</p>
          <a
            href={currentLesson.url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
          >
            <svg className="-ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Open PDF
          </a>
        </div>
      )}

      {currentLesson.type === 'note' && (
        <div className="bg-green-50 border border-green-200 text-green-800 p-4 rounded-lg mb-6 shadow-sm">
          <pre className="text-lg leading-relaxed whitespace-pre-wrap">{currentLesson.content}</pre>
        </div>
      )}

      <div className="flex justify-between mt-6">
        <button
          className="px-6 py-3 bg-gray-300 text-gray-800 font-semibold rounded-lg shadow-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={currentModuleIndex === 0 && currentLessonIndex === 0}
          onClick={handlePreviousLesson}
        >
          Previous
        </button>

        <button
          className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
          onClick={handleNextLesson}
        >
          {currentModuleIndex === course.modules.length - 1 &&
          currentLessonIndex === currentModule.lessons.length - 1
            ? "Continue to Quizzes"
            : "Next Lesson"}
        </button>
      </div>
    </>
  );

  const renderQuizView = () => (
    <>
      <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">{currentQuiz.title}</h2>
      
      {quizScore === null ? (
        <div className="space-y-6">
          {currentQuiz.questions.map((question, qIdx) => (
            <div key={question.id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold mb-3">{question.question}</h3>
              <div className="space-y-2">
                {question.options.map((option, optIdx) => (
                  <div key={optIdx} className="flex items-center">
                    <input
                      type="radio"
                      id={`quiz-${currentQuiz.id}-q${question.id}-opt${optIdx}`}
                      name={`quiz-${currentQuiz.id}-q${question.id}`}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                      checked={quizAnswers[question.id] === optIdx}
                      onChange={() => handleQuizAnswerSelect(question.id, optIdx)}
                    />
                    <label htmlFor={`quiz-${currentQuiz.id}-q${question.id}-opt${optIdx}`} className="ml-3 block text-gray-700">
                      {option}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          ))}
          
          <div className="flex justify-between mt-6">
            <button
              className="px-6 py-3 bg-gray-300 text-gray-800 font-semibold rounded-lg shadow-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={currentQuizIndex === 0}
              onClick={handlePreviousQuiz}
            >
              Previous Quiz
            </button>

            <button
              className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
              onClick={calculateQuizScore}
            >
              Submit Quiz
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-blue-50 border border-blue-200 text-blue-800 p-6 rounded-lg shadow-sm">
          <h3 className="text-xl font-bold mb-4">Quiz Results</h3>
          <p className="text-lg mb-4">Your score: <span className="font-bold">{quizScore}%</span></p>
          <p className="mb-6">
            {quizScore >= 70 ? 
              "Great job! You've passed this quiz." : 
              "Review the material and try again to improve your score."}
          </p>
          
          <div className="flex justify-between">
            <button
              className="px-6 py-3 bg-gray-300 text-gray-800 font-semibold rounded-lg shadow-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors duration-200"
              onClick={() => {
                setQuizAnswers({});
                setQuizScore(null);
              }}
            >
              Retake Quiz
            </button>
            
            <button
              className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
              onClick={handleNextQuiz}
            >
              {currentQuizIndex === course.quizzes.length - 1 ? 
                "Continue to Assignments" : "Next Quiz"}
            </button>
          </div>
        </div>
      )}
    </>
  );

  const renderAssignmentView = () => (
    <>
      <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">{currentAssignment.title}</h2>
      
      <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 p-6 rounded-lg shadow-sm mb-6">
        <h3 className="text-xl font-bold mb-4">Assignment Instructions</h3>
        <pre className="text-lg leading-relaxed whitespace-pre-wrap">{currentAssignment.description}</pre>
        <p className="mt-4 font-semibold">Due Date: {currentAssignment.dueDate}</p>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
        <h3 className="text-xl font-bold mb-4">Submission</h3>
        <div className="mb-4">
          <label htmlFor="assignment-answer" className="block text-sm font-medium text-gray-700 mb-2">
            Your Answer/Work
          </label>
          <textarea
            id="assignment-answer"
            rows={6}
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md p-2"
            placeholder="Type your answer or upload your work here..."
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Upload Files
          </label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
            <div className="space-y-1 text-center">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 48 48"
                aria-hidden="true"
              >
                <path
                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <div className="flex text-sm text-gray-600">
                <label
                  htmlFor="file-upload"
                  className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                >
                  <span>Upload a file</span>
                  <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500">PDF, DOCX, PPTX up to 10MB</p>
            </div>
          </div>
        </div>
        <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
          Submit Assignment
        </button>
      </div>
      
      <div className="flex justify-between mt-6">
        <button
          className="px-6 py-3 bg-gray-300 text-gray-800 font-semibold rounded-lg shadow-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={currentAssignmentIndex === 0}
          onClick={handlePreviousAssignment}
        >
          Previous Assignment
        </button>

        <button
          className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
          onClick={handleNextAssignment}
        >
          {currentAssignmentIndex === course.assignments.length - 1 ? 
            "Continue to Final Exam" : "Next Assignment"}
        </button>
      </div>
    </>
  );

  const renderExamView = () => (
    <>
      <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">{course.finalExam.title}</h2>
      
      {examScore === null ? (
        <>
          <div className="bg-blue-50 border border-blue-200 text-blue-800 p-4 rounded-lg shadow-sm mb-6">
            <p className="font-semibold">Time Limit: {course.finalExam.timeLimit} minutes</p>
            <p className="font-semibold">Passing Score: {course.finalExam.passingScore}%</p>
            <p className="mt-2">Question {currentExamQuestionIndex + 1} of {course.finalExam.questions.length}</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
            <h3 className="text-lg font-semibold mb-4">{currentExamQuestion.question}</h3>
            <div className="space-y-3">
              {currentExamQuestion.options.map((option, optIdx) => (
                <div key={optIdx} className="flex items-center">
                  <input
                    type="radio"
                    id={`exam-q${currentExamQuestion.id}-opt${optIdx}`}
                    name={`exam-q${currentExamQuestion.id}`}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                    checked={examAnswers[currentExamQuestion.id] === optIdx}
                    onChange={() => handleExamAnswerSelect(currentExamQuestion.id, optIdx)}
                  />
                  <label htmlFor={`exam-q${currentExamQuestion.id}-opt${optIdx}`} className="ml-3 block text-gray-700">
                    {option}
                  </label>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex justify-between mt-6">
            <button
              className="px-6 py-3 bg-gray-300 text-gray-800 font-semibold rounded-lg shadow-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={currentExamQuestionIndex === 0}
              onClick={handlePreviousExamQuestion}
            >
              Previous Question
            </button>

            <button
              className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
              onClick={
                currentExamQuestionIndex === course.finalExam.questions.length - 1 ? 
                  calculateExamScore : 
                  handleNextExamQuestion
              }
            >
              {currentExamQuestionIndex === course.finalExam.questions.length - 1 ? 
                "Submit Exam" : "Next Question"}
            </button>
          </div>
        </>
      ) : (
        <div className="bg-blue-50 border border-blue-200 text-blue-800 p-6 rounded-lg shadow-sm">
          <h3 className="text-xl font-bold mb-4">Exam Results</h3>
          <p className="text-lg mb-4">Your score: <span className="font-bold">{examScore}%</span></p>
          <p className="mb-6">
            {examScore >= course.finalExam.passingScore ? 
              "Congratulations! You've passed the final exam and completed the course." : 
              "You need to score at least 70% to pass. Please review the material and try again."}
          </p>
          
          <div className="flex justify-center">
            <button
              className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
              onClick={() => {
                setExamAnswers({});
                setExamScore(null);
                setCurrentExamQuestionIndex(0);
              }}
            >
              {examScore >= course.finalExam.passingScore ? 
                "Back to Course" : "Retake Exam"}
            </button>
          </div>
        </div>
      )}
    </>
  );

  const renderContent = () => {
    switch (currentView) {
      case 'quizzes':
        return renderQuizView();
      case 'assignments':
        return renderAssignmentView();
      case 'exam':
        return renderExamView();
      case 'lessons':
      default:
        return renderLessonView();
    }
  };

  const renderViewSwitcher = () => {
    if (currentView === 'lessons') return null;
    
    return (
      <div className="flex justify-center mb-6">
        <div className="inline-flex rounded-md shadow-sm" role="group">
          <button
            type="button"
            className={`px-4 py-2 text-sm font-medium rounded-l-lg border ${currentView === 'quizzes' ? 'bg-indigo-100 text-indigo-700 border-indigo-300' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'}`}
            onClick={() => setCurrentView('quizzes')}
          >
            Quizzes
          </button>
          <button
            type="button"
            className={`px-4 py-2 text-sm font-medium border-t border-b ${currentView === 'assignments' ? 'bg-indigo-100 text-indigo-700 border-indigo-300' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'}`}
            onClick={() => setCurrentView('assignments')}
          >
            Assignments
          </button>
          <button
            type="button"
            className={`px-4 py-2 text-sm font-medium rounded-r-lg border ${currentView === 'exam' ? 'bg-indigo-100 text-indigo-700 border-indigo-300' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'}`}
            onClick={() => setCurrentView('exam')}
          >
            Final Exam
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 font-sans antialiased flex flex-col items-center">
      {/* Course Header Card */}
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg p-6 mb-6 transform transition-all duration-300 hover:scale-[1.01]">
        <h1 className="text-3xl font-extrabold text-gray-800 mb-2">{course.title}</h1>
        <p className="text-gray-600 mb-4">{course.description}</p>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-3 mb-4 overflow-hidden">
          <div
            className="bg-gradient-to-r from-green-400 to-blue-500 h-3 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div className="text-right text-sm font-medium text-gray-700 mb-4">{progress}% Complete</div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
          {currentView === 'lessons' && (
            <>
              <p className="font-semibold">Current Module: <span className="text-indigo-600">{currentModule.title}</span></p>
              <p className="font-semibold">Current Lesson: <span className="text-indigo-600">{currentLesson.title}</span></p>
            </>
          )}
          {currentView === 'quizzes' && (
            <p className="font-semibold">Current Quiz: <span className="text-indigo-600">{currentQuiz.title}</span></p>
          )}
          {currentView === 'assignments' && (
            <p className="font-semibold">Current Assignment: <span className="text-indigo-600">{currentAssignment.title}</span></p>
          )}
          {currentView === 'exam' && (
            <p className="font-semibold">Exam Progress: <span className="text-indigo-600">Question {currentExamQuestionIndex + 1} of {course.finalExam.questions.length}</span></p>
          )}
        </div>
      </div>

      {/* Main Content Area: Lesson Viewer and Module List */}
      <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Module List (Left Sidebar) */}
        <div className="lg:col-span-1 bg-white rounded-xl shadow-lg p-6 overflow-hidden transform transition-all duration-300 hover:scale-[1.01]">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">Course Content</h2>
          
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2 text-indigo-700">Lessons</h3>
            <nav>
              {course.modules.map((module, modIndex) => (
                <div key={module.id} className="mb-2">
                  <h4 className={`text-md font-medium mb-1 ${modIndex === currentModuleIndex && currentView === 'lessons' ? 'text-indigo-700' : 'text-gray-800'}`}>
                    {modIndex + 1}. {module.title}
                  </h4>
                  <ul className="list-disc pl-5 space-y-1">
                    {module.lessons.map((lesson, lessonIndex) => (
                      <li
                        key={lesson.id}
                        className={`cursor-pointer text-sm text-gray-600 hover:text-indigo-600 transition-colors duration-200
                          ${modIndex === currentModuleIndex && lessonIndex === currentLessonIndex && currentView === 'lessons' ? 'font-bold text-indigo-800' : ''}`}
                        onClick={() => {
                          setCurrentModuleIndex(modIndex);
                          setCurrentLessonIndex(lessonIndex);
                          setCurrentView('lessons');
                        }}
                      >
                        {lesson.title}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>
          </div>
          
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2 text-indigo-700">Quizzes</h3>
            <ul className="list-disc pl-5 space-y-1">
              {course.quizzes.map((quiz, quizIndex) => (
                <li
                  key={quiz.id}
                  className={`cursor-pointer text-sm text-gray-600 hover:text-indigo-600 transition-colors duration-200
                    ${quizIndex === currentQuizIndex && currentView === 'quizzes' ? 'font-bold text-indigo-800' : ''}`}
                  onClick={() => {
                    setCurrentQuizIndex(quizIndex);
                    setCurrentView('quizzes');
                    setQuizScore(null);
                  }}
                >
                  {quiz.title}
                </li>
              ))}
            </ul>
          </div>
          
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2 text-indigo-700">Assignments</h3>
            <ul className="list-disc pl-5 space-y-1">
              {course.assignments.map((assignment, assignmentIndex) => (
                <li
                  key={assignment.id}
                  className={`cursor-pointer text-sm text-gray-600 hover:text-indigo-600 transition-colors duration-200
                    ${assignmentIndex === currentAssignmentIndex && currentView === 'assignments' ? 'font-bold text-indigo-800' : ''}`}
                  onClick={() => {
                    setCurrentAssignmentIndex(assignmentIndex);
                    setCurrentView('assignments');
                  }}
                >
                  {assignment.title}
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-2 text-indigo-700">Final Exam</h3>
            <p 
              className={`cursor-pointer text-sm text-gray-600 hover:text-indigo-600 transition-colors duration-200
                ${currentView === 'exam' ? 'font-bold text-indigo-800' : ''}`}
              onClick={() => {
                setCurrentView('exam');
                setExamScore(null);
                setCurrentExamQuestionIndex(0);
              }}
            >
              {course.finalExam.title}
            </p>
          </div>
        </div>

        {/* Lesson Viewer (Right Main Area) */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6 transform transition-all duration-300 hover:scale-[1.01]">
          {renderViewSwitcher()}
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default CourseLearningPage;