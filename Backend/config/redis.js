// Simple in-memory cache implementation
const memoryCache = {
  store: {},
  get(key) {
    return Promise.resolve(this.store[key]);
  },
  set(key, value, expiryMode, ttl) {
    this.store[key] = value;
    if (ttl) {
      setTimeout(() => {
        delete this.store[key];
      }, ttl * 1000);
    }
    return Promise.resolve('OK');
  },
  del(key) {
    delete this.store[key];
    return Promise.resolve(1);
  },
  setEx(key, ttl, value) {
    return this.set(key, value, 'EX', ttl);
  }
};

module.exports = memoryCache;