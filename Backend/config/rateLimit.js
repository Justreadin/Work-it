const rateLimit = require('express-rate-limit');
const { RedisStore } = require('rate-limit-redis');
const { createClient } = require('redis');

// Create a Redis client
const redisClient = createClient({
  url: 'redis://localhost:6379',
  // If you have Redis authentication
  // password: 'your_redis_password',
});

// Connect to Redis
redisClient.connect().catch((err) => {
  console.error('❌ Redis connection error:', err.message);
});

// Configure rate limiting options
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests, please try again later.',
  statusCode: 429, // HTTP status code for rate limiting
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  store: new RedisStore({
    sendCommand: (...args) => redisClient.sendCommand(args),
  }),
});

module.exports = limiter;
