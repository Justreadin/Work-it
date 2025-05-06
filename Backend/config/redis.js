const Redis = require('ioredis');
const url = require('url');

// Parse the REDIS_URL from environment variables
const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379'; // Default to localhost if no REDIS_URL is provided

// Use the parsed URL to configure the Redis client
const redis = new Redis(redisUrl);

redis.on('connect', () => {
  console.log('Connected to Redis');
});

redis.on('error', (err) => {
  console.error('Redis error:', err);
});

module.exports = redis;
