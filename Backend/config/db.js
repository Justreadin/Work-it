/**const mysql = require("mysql2/promise");
require("dotenv").config();

// Create a connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Test database connection and add logging
(async () => {
  try {
    const connection = await pool.getConnection();
    console.log(`✅ Connected to the database: ${process.env.DB_NAME} at ${process.env.DB_HOST}`);
    connection.release(); // Release the connection back to the pool
  } catch (err) {
    console.error("❌ Error connecting to the database:", err.message);
    process.exit(1); // Exit the process if unable to connect
  }
})();

// Debugging for SQL queries (optional, enable only in development)
if (process.env.NODE_ENV === "development") {
  pool.on("connection", (connection) => {
    console.log(`🔌 New connection established with ID: ${connection.threadId}`);
  });

  pool.on("enqueue", () => {
    console.warn("⚠️ Waiting for available database connection...");
  });

  pool.on("release", (connection) => {
    console.log(`🔓 Connection released with ID: ${connection.threadId}`);
  });
}

module.exports = { pool };
*/const { MongoClient, ServerApiVersion } = require("mongodb");
const redis = require("redis");
require("dotenv").config();

let mongoClient; // To be exported for later DB access

// MongoDB Connection
const connectMongoDB = async () => {
  try {
    mongoClient = new MongoClient(process.env.MONGO_URI, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });

    await mongoClient.connect();
    await mongoClient.db("admin").command({ ping: 1 });
    console.log("✅ Connected to MongoDB successfully!");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1); // Exit on failure
  }
};

// Redis Client
const redisClient = redis.createClient({
  url: process.env.REDIS_URL || "redis://localhost:6379",
  legacyMode: true,
});

redisClient.connect().catch((err) => {
  console.error("❌ Redis connection error:", err.message);
});

redisClient.on("connect", () => {
  console.log("✅ Connected to Redis");
});

redisClient.on("error", (err) => {
  console.error("❌ Redis error:", err);
});

// Export both clients
module.exports = {
  connectMongoDB,
  redisClient,
  mongoClient,
};
