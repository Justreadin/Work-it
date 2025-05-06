// config/redis.js
const Redis = require('ioredis');

// Create and configure the Redis client
const redis = new Redis({
  host: process.env.REDIS_HOST || 'localhost', // Redis server
  port: process.env.REDIS_PORT || 6379,       // Redis default port
  password: process.env.REDIS_PASSWORD || '', // Optional if Redis is password protected
  db: process.env.REDIS_DB || 0              // Default Redis database
});

redis.on('connect', () => {
  console.log('Connected to Redis');
});

redis.on('error', (err) => {
  console.error('Redis error:', err);
});

module.exports = redis;
