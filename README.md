# LMS-Africa

LMS-Africa is a modern Learning Management System designed to empower African learners with digital skills through accessible, high-quality online training. The platform offers professional certification courses, hands-on learning, and a vibrant community for students, instructors, and administrators.

---

## Table of Contents

- [About LMS-Africa](#about-lms-africa)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

---

## About LMS-Africa

LMS-Africa is built to bridge the digital skills gap across Africa by providing affordable, practical, and industry-relevant courses. Our mission is to transform education and professional development for students, professionals, and aspiring entrepreneurs.

---

## Features

- **User Authentication:** Secure login and registration for students, instructors, and admins.
- **Role-Based Dashboards:** Custom dashboards for students, instructors, and administrators.
- **Course Management:** Add, edit, and manage courses with modules and lessons.
- **Student Enrollment:** Easy enrollment and progress tracking.
- **Instructor Tools:** Manage courses, students, assignments, and quizzes.
- **Responsive Design:** Mobile-friendly and accessible UI.
- **Newsletter Subscription:** Stay updated with the latest courses and news.
- **Contact & Support:** Integrated contact forms and support channels.

---

## Tech Stack

- **Frontend:** React, React Router, React Bootstrap, Axios
- **Backend:** Node.js, Express (API endpoints, not included in this repo)
- **Database:** MongoDB (for user, course, and enrollment data)
- **Styling:** Bootstrap, Custom CSS
- **Icons:** React Icons
- **Notifications:** React Toastify

---

## Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- npm or yarn

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Ngong2/Lms-africa-frontend.git
   cd lms-africa/lms-africa
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server:**
   ```bash
   npm start
   # or
   yarn start
   ```

4. **Open your browser:**
   Visit [http://localhost:3000](http://localhost:3000) to view the app.

> **Note:** The backend API should be running separately (see `/api` endpoints in the code).

---

## Available Scripts

In the project directory, you can run:

- **`npm start`**  
  Runs the app in development mode.

- **`npm test`**  
  Launches the test runner in interactive watch mode.

- **`npm run build`**  
  Builds the app for production to the `build` folder.

- **`npm run eject`**  
  Ejects the app for full configuration control (not recommended for most users).

---

## Project Structure

```
lms-africa/
├── public/
├── src/
│   ├── assets/           # Images and static assets
│   ├── modals/           # Modal components (Add/Edit Course, etc.)
│   ├── pages/            # Main page components (Home, About, Courses, etc.)
│   ├── App.js            # Main app component with routing
│   └── ...
├── package.json
└── README.md
```

---

## Contributing

We welcome contributions! Please fork the repository and submit a pull request. For major changes, open an issue first to discuss your ideas.

---

## License

This project is licensed under the [MIT License](LICENSE).

---

## Contact

- **Website:** [lmsafrica.com](https://lmsafrica.com)
- **Email:** info@lmsafrica.com
- **Twitter:** [@LMSAfrica](https://twitter.com/LMSAfrica)
- **LinkedIn:** [LMS-Africa](https://www.linkedin.com/company/lms-africa)

---

Empowering Africa's future through digital learning!
