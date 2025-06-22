const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const authRoutes = require("./routes/auth");
const workerRoutes = require("./routes/worker");
const clientRoutes = require("./routes/client");
const { connectMongoDB, cacheClient } = require('./config/db'); // ✅ Import connectMongoDB
require('dotenv').config();
const rateLimiter = require('./config/rateLimit');
const { dbClient } = require('./config/db');

// ✅ Swagger setup
const setupSwagger = require('./config/swagger');

const app = express();

app.use(cors({
  origin: "*", // or use specific origin for security
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(bodyParser.json());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// ✅ Swagger docs
setupSwagger(app);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/worker", workerRoutes);
app.use("/api/client", clientRoutes);

// GET User with in-memory caching
app.get('/api/user/:id', async (req, res) => {
  const userId = req.params.id;
  const cacheKey = `user:id:${userId}`;

  try {
    const cachedUser = cacheClient.get(cacheKey);
    if (cachedUser) return res.json(cachedUser);

    const user = await dbClient.getUserById(userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    cacheClient.set(cacheKey, user, 3600); // cache for 1 hour
    res.json(user);
  } catch (err) {
    console.error('Error fetching user:', err);
    res.status(500).json({ error: 'Error fetching user data' });
  }
});


// Simple test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'API working' });
});

// Optional: Serve frontend build
/*
const frontendDistPath = path.join(__dirname, '../Frontend/dist');
app.use(express.static(frontendDistPath));

app.get('*', (req, res) => {
  res.sendFile(path.join(frontendDistPath, 'index.html'));
});
*/

// ✅ Start server only after DB connects
const startServer = async () => {
  try {
    await connectMongoDB(); // ✅ Connect to MongoDB first
    const port = process.env.PORT || 5600;
    app.listen(port, () => console.log(`🚀 Server running on port ${port}`));
  } catch (err) {
    console.error("❌ Failed to start server:", err.message);
    process.exit(1);
  }
};

startServer();
