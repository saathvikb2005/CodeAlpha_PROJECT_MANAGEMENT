# Project Management System

A modern, full-stack project management application built with Django REST Framework and React. This application provides a comprehensive platform for managing projects, tasks, and team collaboration.

## 🚀 Features

- **User Authentication**: Secure registration and login system with JWT authentication
- **Project Management**: Create, view, and manage projects with team memberships
- **Task Management**: Create, assign, and track tasks with different statuses (To Do, In Progress, Done)
- **Team Collaboration**: Add team members to projects with role-based permissions
- **Task Comments**: Add comments to tasks for better communication
- **Real-time Updates**: Modern React frontend with responsive design
- **RESTful API**: Well-structured Django REST Framework backend

## 🛠️ Tech Stack

### Backend
- **Django 5.2.3** - Web framework
- **Django REST Framework** - API development
- **JWT Authentication** - Secure token-based authentication
- **SQLite** - Database (can be easily switched to PostgreSQL/MySQL)
- **CORS Headers** - Cross-origin resource sharing support

### Frontend
- **React 19.1.0** - Frontend framework
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client for API calls
- **Modern CSS** - Styled components and responsive design

## 📁 Project Structure

```
PROJECT_MANAGEMENT/
├── backend/                    # Django backend
│   ├── backend/               # Django project settings
│   ├── projects/              # Project management app
│   ├── tasks/                 # Task management app
│   ├── users/                 # User management app
│   ├── utils/                 # Utility functions
│   └── manage.py
├── frontend/                  # React frontend
│   ├── src/
│   │   ├── components/        # Reusable React components
│   │   ├── pages/            # Page components
│   │   ├── styles/           # CSS files
│   │   └── utils/            # Utility functions
│   └── package.json
└── README.md
```

## 🏗️ Installation & Setup

### Prerequisites
- Python 3.8+
- Node.js 14+
- npm or yarn

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd PROJECT_MANAGEMENT
   ```

2. **Create virtual environment**
   ```bash
   cd backend
   python -m venv venv
   
   # On Windows
   venv\Scripts\activate
   
   # On macOS/Linux
   source venv/bin/activate
   ```

3. **Install dependencies**
   ```bash
   pip install django djangorestframework djangorestframework-simplejwt django-cors-headers
   ```

4. **Run migrations**
   ```bash
   python manage.py migrate
   ```

5. **Create superuser (optional)**
   ```bash
   python manage.py createsuperuser
   ```

6. **Start the backend server**
   ```bash
   python manage.py runserver
   ```

   The backend will be available at `http://localhost:8000`

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

   The frontend will be available at `http://localhost:3000`

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register/` - User registration
- `POST /api/auth/login/` - User login
- `POST /api/auth/refresh/` - Token refresh

### Projects
- `GET /api/projects/` - List all projects
- `POST /api/projects/` - Create new project
- `GET /api/projects/{id}/` - Get project details
- `PUT /api/projects/{id}/` - Update project
- `DELETE /api/projects/{id}/` - Delete project

### Tasks
- `GET /api/tasks/` - List all tasks
- `POST /api/tasks/` - Create new task
- `GET /api/tasks/{id}/` - Get task details
- `PUT /api/tasks/{id}/` - Update task
- `DELETE /api/tasks/{id}/` - Delete task

### Comments
- `GET /api/tasks/{task_id}/comments/` - List task comments
- `POST /api/tasks/{task_id}/comments/` - Add comment to task

## 🎯 Usage

1. **Register/Login**: Create an account or login with existing credentials
2. **Create Project**: Add a new project with name and description
3. **Add Team Members**: Invite team members to your projects
4. **Create Tasks**: Add tasks to projects with assignments and due dates
5. **Track Progress**: Update task status as work progresses
6. **Collaborate**: Add comments to tasks for team communication

## 📱 Pages & Components

### Pages
- **Login/Register**: Authentication pages
- **Dashboard**: Overview of all projects and tasks
- **Project Board**: Kanban-style task management
- **Task Detail**: Detailed task view with comments
- **Create Project/Task**: Forms for creating new items

### Components
- **Navbar**: Navigation component
- **PrivateRoute**: Protected route component

## 🔐 Security Features

- JWT-based authentication
- Protected routes on frontend
- CORS configuration for secure API access
- Input validation and sanitization

## 🚀 Deployment

### Backend Deployment
1. Set `DEBUG = False` in settings.py
2. Configure allowed hosts
3. Set up production database
4. Configure static files
5. Deploy to your preferred platform (Heroku, AWS, etc.)

### Frontend Deployment
1. Build the production version:
   ```bash
   npm run build
   ```
2. Deploy the `build` folder to your hosting platform

## 🐛 Known Issues

- Email functionality in utils/email.py needs configuration
- Task filtering and search features can be enhanced
- Mobile responsiveness can be improved

## 🔮 Future Enhancements

- [ ] Real-time notifications
- [ ] File attachments for tasks
- [ ] Time tracking functionality
- [ ] Advanced reporting and analytics
- [ ] Mobile app development
- [ ] Integration with third-party tools
---

*Built with ❤️ using Django and React*

