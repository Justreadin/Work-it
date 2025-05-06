/*// server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path'); 
const apiRoutes = require('./routes/api');
const redis = require('./config/redis'); // Import Redis connection
require('dotenv').config();
const rateLimiter = require('./config/rateLimit');

const app = express();
const rateLimiter = require('./config/rateLimit');

// Middleware for CORS and JSON body parsing
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);
  
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));
app.use('/api', apiRoutes);


app.get('/api/user/:id', async (req, res) => {
  const userId = req.params.id;

  try {
    // First, check if the user data is already cached
    const cachedUser = await redis.get(`user:${userId}`);

    if (cachedUser) {
      // If data exists in cache, return it
      return res.json(JSON.parse(cachedUser));
    }

    // If no cache, fetch user data from database (you can call your models here)
    const userData = await getUserFromDatabase(userId); // This is a placeholder function

    // Store the fetched user data in Redis for 1 hour (3600 seconds)
    await redis.setex(`user:${userId}`, 3600, JSON.stringify(userData));

    res.json(userData); // Send the user data as a response
  } catch (err) {
    res.status(500).json({ error: 'Error fetching user data' });
  }
});

// Serve static files from the Frontend 'dist' folder
const frontendDistPath = path.join(__dirname, '../Frontend/dist');
app.use(express.static(frontendDistPath));

app.get('*', (req, res) => {
  res.sendFile(path.join(frontendDistPath, 'index.html'));
});

const port = process.env.PORT || 5600;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
*/
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const apiRoutes = require('./routes/api');
const redisClient = require('./config/redis');
require('dotenv').config();
const rateLimiter = require('./config/rateLimit');
const mongoose = require('mongoose');
const { getUserById } = require('./models/userModel');

const app = express();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB error:", err));

// Middleware
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));
app.use('/api', apiRoutes);

// GET User with Redis caching
app.get('/api/user/:id', async (req, res) => {
  const userId = req.params.id;
  const cacheKey = `user:id:${userId}`;

  try {
    // Check Redis cache
    const cachedUser = await redisClient.get(cacheKey);
    if (cachedUser) {
      return res.json(JSON.parse(cachedUser));
    }

    // Fetch from DB
    const user = await getUserById(userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    // Cache the result for 1 hour
    await redisClient.setEx(cacheKey, 3600, JSON.stringify(user));

    res.json(user);
  } catch (err) {
    console.error('Error fetching user:', err);
    res.status(500).json({ error: 'Error fetching user data' });
  }
});

// Serve static frontend
/*const frontendDistPath = path.join(__dirname, '../Frontend/dist');
app.use(express.static(frontendDistPath));

app.get('*', (req, res) => {
  res.sendFile(path.join(frontendDistPath, 'index.html'));
});
*/
const port = process.env.PORT || 5600;
app.listen(port, () => console.log(`Server running on port ${port}`));
