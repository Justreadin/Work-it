const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const apiRoutes = require('./routes/api');
const redisClient = require('./config/redis');
require('dotenv').config();
const rateLimiter = require('./config/rateLimit');
const mongoose = require('mongoose');
const { getUserByEmail } = require('./models/userModel');

const app = express();

app.use(express.json());

// Check if MONGO_URI is valid
if (!process.env.MONGO_URI) {
  console.error("MONGO_URI is not defined in .env file");
  process.exit(1); // Exit the process if the URI is not found
}

// Connect to MongoDB
mongoose.connect("mongodb+srv://dave400g:Justreading.1m@workit.xm1ak19.mongodb.net/?retryWrites=true&w=majority&appName=Workit", {
  serverApi: {
    version: '1',
    strict: true,
    deprecationErrors: true,
  }
})
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Middleware
app.use(cors({
  origin: '*', // Allow all origins
  credentials: false, // Set to true only if you need cookies or auth headers
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Optional: respond to preflight requests
app.options('*', cors());



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

app.get('/api/test', (req, res) => {
  res.json({ message: 'API working' });
});

// Serve static frontend
/*const frontendDistPath = path.join(__dirname, '../Frontend/dist');
app.use(express.static(frontendDistPath));

app.get('*', (req, res) => {
  res.sendFile(path.join(frontendDistPath, 'index.html'));
});*/

const port = process.env.PORT || 5600;
app.listen(port, () => console.log(`Server running on port ${port}`));
