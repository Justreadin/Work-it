// config/redis.js
const Redis = require('ioredis');

// Use REDIS_PUBLIC_URL if provided, otherwise fallback to localhost
const redisUrl = process.env.REDIS_PUBLIC_URL || 'redis://localhost:6379';

// Create and configure the Redis client
const redis = new Redis(redisUrl);

redis.on('connect', () => {
  console.log('Connected to Redis');
});

redis.on('error', (err) => {
  console.error('Redis error:', err);
});

module.exports = redis;
