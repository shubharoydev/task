# SynapHack Web Application

## Overview
SynapHack is a responsive web application designed to manage hackathon events. It allows users to view upcoming hackathons, register for events, create or join teams, and provides an admin interface for managing events and registrations. The application is built using the MERN stack (MongoDB, Express.js, React, Node.js) with Tailwind CSS for styling and React-Toastify for notifications.

## Features
- **Home Page**: Displays a list of upcoming hackathons with titles, dates, descriptions, and an "Apply" button.
- **Event Detail Page**: Shows detailed information about a specific hackathon with a registration form.
- **Registration Form**: Allows users to register with their name, email, college/organization, phone, and optional team name.
- **Admin Dashboard**: Admins can log in to create, update, or delete events and view registrations.
- **Responsive Design**: Optimized for both mobile and desktop devices using Tailwind CSS.
- **Notifications**: User-friendly success and error messages using React-Toastify.
- **Authentication**: JWT-based admin authentication for secure access to admin features.

## Tech Stack
- **Frontend**: React (Vite), Tailwind CSS, React-Toastify, React Router, Axios
- **Backend**: Node.js, Express.js, MongoDB, JWT, Joi for validation
- **Database**: MongoDB

## Prerequisites
Before setting up the project, ensure you have the following installed:
- Node.js (v18 or higher)
- npm (v8 or higher)
- MongoDB (local or cloud instance, e.g., MongoDB Atlas)
- Git

## Project Structure
```
synaphack/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── .env
│   ├── server.js
│   ├── package.json
│   └── ...
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   ├── index.css
│   │   ├── main.jsx
│   │   └── ...
│   ├── .env
│   ├── index.html
│   ├── package.json
│   └── ...
```

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   Create a `.env` file in the backend directory with the following content:
   ```
   MONGO_URI=mongodb://localhost:27017/synaphack
   JWT_SECRET=your_jwt_secret_key
   PORT=5000
   ```
   - Replace `MONGO_URI` with your MongoDB connection string (e.g., MongoDB Atlas URL or local MongoDB URL).
   - Replace `JWT_SECRET` with a secure random string for JWT authentication.

4. Run the backend server:
   ```bash
   npm start
   ```
   The backend server will run on http://localhost:3000 (or the port specified in .env).

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   Create a `.env` file in the frontend directory with the following content:
   ```
   VITE_API_URL=http://localhost:3000
   ```
   Ensure `VITE_API_URL` matches the backend API base URL.

4. Run the frontend server:
   ```bash
   npm run dev
   ```
   The frontend server will run on http://localhost:5173 (default Vite port).

## Running the Application

1. **Start MongoDB**: Ensure your MongoDB instance is running (locally or via a cloud service like MongoDB Atlas).

2. **Start the backend server**:
   ```bash
   cd backend
   npm start
   ```

3. **Start the frontend server**:
   ```bash
   cd frontend
   npm run dev
   ```

4. **Access the application**: Open http://localhost:5173 in your browser to view the application.

## Admin Access

### Default Admin Credentials:

```json
{
  "email": "admin@example.com",
  "password": "admin123",
}
```

Log in via the `/login` route with the admin email and password to access the admin dashboard.

## API Endpoints

### Events:
- `GET /api/events`: Get all events
- `GET /api/events/:id`: Get event by ID
- `POST /api/events`: Create event (admin only)
- `PUT /api/events/:id`: Update event (admin only)
- `DELETE /api/events/:id`: Delete event (admin only)

### Registrations:
- `POST /api/registrations`: Register a user for an event
- `GET /api/admin/registrations`: Get all registrations (admin only)

### Teams:
- `POST /api/teams`: Create a team

### Admin:
- `POST /api/admin/login`: Admin login

## Troubleshooting

- **CORS Issues**: Ensure the backend server allows requests from the frontend URL (http://localhost:5173). The backend is configured to allow CORS by default.
- **MongoDB Connection Errors**: Verify the `MONGO_URI` in the backend `.env` file is correct.
- **JWT Errors**: Ensure the `JWT_SECRET` is consistent and secure.
- **Port Conflicts**: If port 5000 or 5173 is in use, update the `PORT` in the backend `.env` or Vite configuration.

## Bonus Features

- **Responsive Design**: Tailwind CSS ensures the UI adapts to various screen sizes.
- **Notifications**: React-Toastify provides user feedback for actions like registration and event creation.
- **Input Validation**: Joi is used in the backend to validate API inputs.
- **Error Handling**: Comprehensive error handling in both frontend and backend.



## Future Improvements

- Add team management UI for users to join teams.
- Implement file uploads for hackathon submissions.
- Add pagination for event and registration lists.

## Contributing
Contributions are welcome! Please submit a pull request or open an issue on the GitHub repository.

## License
This project is licensed under the MIT License.