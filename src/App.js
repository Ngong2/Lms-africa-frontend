// src/App.js
import './App.css';
import About from './pages/about';
import Layout from './pages/layout';
import Home from './pages/home';
import Contact from './pages/contact';
import NotFound from './pages/notFound';
import Register from './pages/register';
import Courses from './pages/courses';
import Login from './pages/login';
import ProtectedRoute from './pages/routeGuard';
import AdminDashboard from './pages/adminDashboard';
import InstructorDashboard from './pages/instructorDashboard';
import StudentDashboard from './pages/studentDashboard';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import EnrollRouteGuard from './pages/enrollRouteGuard';
import CoursesDetails from './pages/coursesDetails';
import Enrollment from './pages/enrollment';
import CoursesLandingPage from './pages/coursesLandingPage';
import ChangePassword from './pages/changePassword';
import AddCourseModal from './modals/addCoursesModal';
import EditCourseModal from './modals/editCoursesModal';
import DonationPage from './pages/donationPage';
import StudentProfile from './pages/studentProfile';

function App() {
  return (
    <BrowserRouter>
      {/* Add modals here if they're meant to be globally available */}
      <AddCourseModal />
      <EditCourseModal />
      
      <Routes>
        <Route path="/" element={<Layout/>}>
          {/* Public routes */}
          <Route index element={<Home />} />
          <Route path="contact" element={<Contact />} />
          <Route path="about" element={<About />} />
          <Route path="courses" element={<Courses />} />
          <Route path="donationPage" element={<DonationPage />} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="/student/profile" element={
            <ProtectedRoute allowedRoles={['student']}>
              <StudentProfile />
            </ProtectedRoute>
          } />
          <Route path="/change-password/:otp/:email" element={<ChangePassword />} />
          <Route path="/courses/:id" element={<CoursesDetails />} />
          <Route path="/learn/:courseId" element={<CoursesLandingPage />} />
          <Route path="/enroll/:id" element={
            <EnrollRouteGuard>
              <Enrollment />
            </EnrollRouteGuard>
          } />

          <Route path="*" element={<NotFound />} />

          {/* Protected routes */}
          <Route path="admin" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminDashboard />
            </ProtectedRoute>
          } />
          <Route path="student" element={
            <ProtectedRoute allowedRoles={['student']}>
              <StudentDashboard />
            </ProtectedRoute>
          } />
          <Route path="instructor" element={
            <ProtectedRoute allowedRoles={['instructor']}>
              <InstructorDashboard />
            </ProtectedRoute>
          } />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;