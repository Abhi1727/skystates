# Sky States Backend API

Backend API for the Sky States EdTech Platform built with Node.js, Express, and MongoDB.

## 🚀 Features

- **Authentication**: JWT-based authentication with role-based access control
- **User Management**: Student, Instructor, and Admin roles
- **Course Management**: Create, update, and manage courses with modules and lessons
- **Enrollment System**: Track student progress and course completion
- **Payment Integration**: Stripe payment processing
- **Job Board**: Post and apply for tech jobs
- **Progress Tracking**: Monitor student learning progress
- **Reviews & Ratings**: Student feedback system
- **File Upload**: Support for course materials and avatars

## 🛠️ Technologies Used

- **Node.js**: JavaScript runtime
- **Express.js**: Web framework
- **MongoDB**: NoSQL database
- **Mongoose**: MongoDB object modeling
- **JWT**: Authentication tokens
- **bcryptjs**: Password hashing
- **Stripe**: Payment processing
- **Cloudinary**: File storage
- **Nodemailer**: Email services

## 📁 Project Structure

```
backend/
├── config/
│   └── database.js          # Database connection
├── controllers/              # Route controllers (if needed)
├── middleware/
│   ├── auth.js              # Authentication middleware
│   └── validation.js        # Input validation
├── models/
│   ├── User.js              # User model
│   ├── Course.js            # Course model
│   ├── Job.js               # Job model
│   └── Enrollment.js        # Enrollment model
├── routes/
│   ├── auth.js              # Authentication routes
│   ├── users.js             # User management routes
│   ├── courses.js           # Course routes
│   ├── jobs.js              # Job board routes
│   ├── enrollments.js       # Enrollment routes
│   └── payments.js          # Payment routes
├── utils/                   # Utility functions
├── .env                     # Environment variables
├── .gitignore              # Git ignore file
├── package.json            # Dependencies and scripts
├── server.js               # Main server file
└── README.md               # This file
```

## 🔧 Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd skystates-frontend/backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Update the `.env` file with your configuration:
   ```env
   # Server Configuration
   PORT=5000
   NODE_ENV=development

   # Database
   MONGODB_URI=mongodb://localhost:27017/skystates

   # JWT
   JWT_SECRET=your_super_secret_jwt_key_here
   JWT_EXPIRE=7d

   # Email Configuration
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_app_password

   # Stripe
   STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
   STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key

   # Cloudinary
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret

   # Frontend URL
   FRONTEND_URL=http://localhost:3000
   ```

4. **Start the server**
   ```bash
   # Development mode with nodemon
   npm run dev

   # Production mode
   npm start
   ```

## 📚 API Documentation

### Authentication Routes

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/auth/register` | Register new user | Public |
| POST | `/api/auth/login` | Login user | Public |
| GET | `/api/auth/me` | Get current user | Private |
| POST | `/api/auth/logout` | Logout user | Private |
| POST | `/api/auth/forgot-password` | Request password reset | Public |
| POST | `/api/auth/reset-password` | Reset password | Public |

### Course Routes

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/courses` | Get all courses | Public |
| GET | `/api/courses/:slug` | Get single course | Public |
| POST | `/api/courses` | Create course | Instructor/Admin |
| PUT | `/api/courses/:id` | Update course | Instructor/Admin |
| DELETE | `/api/courses/:id` | Delete course | Instructor/Admin |
| POST | `/api/courses/:id/reviews` | Add review | Student |

### Job Routes

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/jobs` | Get all jobs | Public |
| GET | `/api/jobs/:slug` | Get single job | Public |
| POST | `/api/jobs` | Create job | Admin/Instructor |
| PUT | `/api/jobs/:id` | Update job | Admin/Instructor |
| DELETE | `/api/jobs/:id` | Delete job | Admin/Instructor |
| POST | `/api/jobs/:id/apply` | Apply for job | Student |

### User Routes

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/users` | Get all users | Admin |
| GET | `/api/users/:id` | Get user by ID | Private |
| PUT | `/api/users/:id` | Update user profile | Private |
| PUT | `/api/users/:id/password` | Change password | Private |
| DELETE | `/api/users/:id` | Delete user | Admin |
| GET | `/api/users/stats/dashboard` | Get dashboard stats | Private |

### Enrollment Routes

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/enrollments` | Get enrollments | Private |
| GET | `/api/enrollments/:id` | Get single enrollment | Private |
| POST | `/api/enrollments` | Create enrollment | Student |
| PUT | `/api/enrollments/:id/progress` | Update progress | Student |
| POST | `/api/enrollments/:id/notes` | Add note | Student |
| POST | `/api/enrollments/:id/bookmarks` | Add bookmark | Student |
| POST | `/api/enrollments/:id/refund` | Request refund | Student |

### Payment Routes

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/payments/create-intent` | Create payment intent | Private |
| POST | `/api/payments/confirm` | Confirm payment | Private |
| POST | `/api/payments/webhook` | Stripe webhook | Public |
| GET | `/api/payments/history` | Get payment history | Private |
| POST | `/api/payments/refund` | Process refund | Admin |

## 🔐 Authentication

The API uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

## 📝 Data Models

### User Model
- **Personal Info**: firstName, lastName, email, phone
- **Profile**: bio, avatar, skills, education, experience
- **Role**: student, instructor, admin
- **Enrollments**: Array of enrolled courses with progress

### Course Model
- **Basic Info**: title, description, category, level, duration, price
- **Content**: modules with lessons, videos, quizzes
- **Metadata**: instructor, thumbnail, tags, ratings
- **Status**: published, featured

### Job Model
- **Job Details**: title, company, location, type, experience
- **Company Info**: name, logo, description, industry
- **Application**: email, URL, deadline, requirements

### Enrollment Model
- **Tracking**: progress, status, time spent
- **Payment**: amount, method, transaction details
- **Learning**: notes, bookmarks, quiz scores
- **Certificates**: completion, achievement, excellence

## 🚀 Deployment

### Environment Variables

Make sure to set the following environment variables in production:

- `NODE_ENV=production`
- `MONGODB_URI` - Your MongoDB connection string
- `JWT_SECRET` - Strong secret key for JWT
- `STRIPE_SECRET_KEY` - Your Stripe secret key
- `EMAIL_USER` & `EMAIL_PASS` - Email credentials

### Security Considerations

- Use HTTPS in production
- Set strong JWT secrets
- Enable rate limiting
- Validate all inputs
- Use environment variables for sensitive data
- Regularly update dependencies

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions, please contact the development team.

---

*Built with ❤️ for the Sky States EdTech Platform*
