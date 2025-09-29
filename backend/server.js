const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const { errorHandler } = require('./middleware/errorMiddleware');
const eventRoutes = require('./routes/eventRoutes');
const registrationRoutes = require('./routes/registrationRoutes');
const teamRoutes = require('./routes/teamRoutes');
const adminRoutes = require('./routes/adminRoutes');
const cors = require('cors');

dotenv.config();
connectDB();

const app = express();


app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173', 
  credentials: true
}));

app.use(express.json());

app.use('/api/events', eventRoutes);
app.use('/api/registrations', registrationRoutes);
app.use('/api/teams', teamRoutes);
app.use('/api/admin', adminRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
