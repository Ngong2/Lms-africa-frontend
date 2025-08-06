import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { 
  FiHome, 
  FiBook, 
  FiUsers, 
  FiUser, 
  FiLogOut,
  FiUser as FiProfile,
  FiFileText,
  FiPieChart
} from 'react-icons/fi';

const Admin = () => {
  // Navigation items
  const topNavItems = [
    { text: 'Profile', icon: <FiProfile className="me-1" />, onClick: () => console.log('Profile clicked') },
    { text: 'Logout', icon: <FiLogOut className="me-1" />, onClick: () => console.log('Logout clicked') }
  ];

  const sidebarItems = [
    { text: 'Dashboard', active: true, icon: <FiHome className="me-2" />, onClick: () => console.log('Dashboard clicked') },
    { text: 'Manage Courses', icon: <FiBook className="me-2" />, onClick: () => console.log('Courses clicked') },
    { text: 'Manage Students', icon: <FiUsers className="me-2" />, onClick: () => console.log('Students clicked') },
    { text: 'Manage Instructors', icon: <FiUser className="me-2" />, onClick: () => console.log('Instructors clicked') },
    { text: 'Manage Results', icon: <FiPieChart className="me-2" />, onClick: () => console.log('Results clicked') }
  ];

  const dashboardCards = [
    { 
      title: 'Courses', 
      description: 'View and manage all courses.', 
      bgColor: 'primary',
      icon: <FiBook size={24} />,
      count: 42,
      onClick: () => console.log('Courses card clicked')
    },
    { 
      title: 'Students', 
      description: 'Manage enrolled students.', 
      bgColor: 'success',
      icon: <FiUsers size={24} />,
      count: 356,
      onClick: () => console.log('Students card clicked')
    },
    { 
      title: 'Instructors', 
      description: 'Manage teaching staff.', 
      bgColor: 'info',
      icon: <FiUser size={24} />,
      count: 24,
      onClick: () => console.log('Instructors card clicked')
    },
    { 
      title: 'Reports', 
      description: 'View system reports.', 
      bgColor: 'warning',
      icon: <FiFileText size={24} />,
      count: 15,
      onClick: () => console.log('Reports card clicked')
    },
    { 
      title: 'Analytics', 
      description: 'System performance metrics.', 
      bgColor: 'danger',
      icon: <FiPieChart size={24} />,
      count: '12% ↑',
      onClick: () => console.log('Analytics card clicked')
    }
  ];

  return (
    <div className="container-fluid">
      {/* Top Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <span className="navbar-brand">LMS Admin</span>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              {topNavItems.map((item, index) => (
                <li key={index} className="nav-item">
                  <button className="nav-link btn btn-link" onClick={item.onClick}>
                    {item.icon}
                    {item.text}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>

      <div className="row">
        {/* Sidebar */}
        <nav className="col-md-2 d-none d-md-block bg-light sidebar">
          <div className="position-sticky pt-3">
            <ul className="nav flex-column">
              {sidebarItems.map((item, index) => (
                <li key={index} className="nav-item">
                  <button
                    className={`nav-link btn btn-link text-start ${item.active ? 'active bg-primary text-white' : 'text-dark'}`}
                    onClick={item.onClick}
                  >
                    {item.icon}
                    {item.text}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        {/* Main content */}
        <main className="col-md-10 ms-sm-auto px-md-4">
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h1 className="h2">Dashboard Overview</h1>
            <div className="btn-toolbar mb-2 mb-md-0">
              <div className="btn-group me-2">
                <button type="button" className="btn btn-sm btn-outline-secondary">Export</button>
              </div>
              <button type="button" className="btn btn-sm btn-outline-primary">
                Generate Report
              </button>
            </div>
          </div>

          <div className="alert alert-info alert-dismissible fade show" role="alert">
            <strong>Welcome back, Admin!</strong> You have 5 new notifications to review.
            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
          </div>

          <div className="row mb-4">
            {dashboardCards.map((card, index) => (
              <div key={index} className="col-xl-2 col-lg-3 col-md-4 col-sm-6 mb-3">
                <div className={`card text-white bg-${card.bgColor} mb-3 h-100 shadow-sm`}>
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <h5 className="card-title mb-0">{card.title}</h5>
                      <span className="bg-white bg-opacity-25 p-2 rounded">
                        {card.icon}
                      </span>
                    </div>
                    <p className="card-text">{card.description}</p>
                    <div className="d-flex justify-content-between align-items-center">
                      <h2 className="mb-0">{card.count}</h2>
                      <button onClick={card.onClick} className="btn btn-light btn-sm">View</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="row">
            <div className="col-md-6 mb-4">
              <div className="card h-100 shadow-sm">
                <div className="card-header bg-white">
                  <h5 className="mb-0">Recent Activities</h5>
                </div>
                <div className="card-body">
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                      <span>New course added</span>
                      <small className="text-muted">2 mins ago</small>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                      <span>3 new students registered</span>
                      <small className="text-muted">1 hour ago</small>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                      <span>System updated to v2.1</span>
                      <small className="text-muted">3 hours ago</small>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="col-md-6 mb-4">
              <div className="card h-100 shadow-sm">
                <div className="card-header bg-white">
                  <h5 className="mb-0">Quick Actions</h5>
                </div>
                <div className="card-body">
                  <div className="row g-2">
                    <div className="col-6">
                      <button className="btn btn-outline-primary w-100 h-100 py-3" onClick={() => console.log('Add Course clicked')}>
                        <FiBook className="mb-1" /><br />
                        Add Course
                      </button>
                    </div>
                    <div className="col-6">
                      <button className="btn btn-outline-success w-100 h-100 py-3" onClick={() => console.log('Enroll Student clicked')}>
                        <FiUsers className="mb-1" /><br />
                        Enroll Student
                      </button>
                    </div>
                    <div className="col-6">
                      <button className="btn btn-outline-info w-100 h-100 py-3" onClick={() => console.log('Add Instructor clicked')}>
                        <FiUser className="mb-1" /><br />
                        Add Instructor
                      </button>
                    </div>
                    <div className="col-6">
                      <button className="btn btn-outline-warning w-100 h-100 py-3" onClick={() => console.log('Generate Report clicked')}>
                        <FiPieChart className="mb-1" /><br />
                        Generate Report
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Admin;