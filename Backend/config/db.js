const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config();

let mongoClient;
let db;

// MongoDB Connection with enhanced role-based structure
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
        db = mongoClient.db(process.env.DB_NAME || "workit");

        // Create collections and indexes with enhanced schema support
        await Promise.all([
            // Users collection (common auth)
            db.collection('users').createIndex({ email: 1 }, { unique: true }),
            db.collection('users').createIndex({ role: 1 }),

            // Workers collection
            db.collection('workers').createIndex({ userId: 1 }, { unique: true }),
            db.collection('workers').createIndex({ skills: 1 }),
            db.collection('workers').createIndex({ "education.degree": 1 }),
            db.collection('workers').createIndex({ "education.institution": 1 }),

            // Clients collection
            db.collection('clients').createIndex({ userId: 1 }, { unique: true }),
            db.collection('clients').createIndex({ companyName: 1 }),

            // Jobs collection
            db.collection('jobs').createIndex({ clientId: 1 }),
            db.collection('jobs').createIndex({ skillsRequired: 1 }),
            db.collection('jobs').createIndex({ status: 1 }),

            // Applications collection
            db.collection('applications').createIndex({ workerId: 1 }),
            db.collection('applications').createIndex({ jobId: 1 }),
            db.collection('applications').createIndex({ status: 1 })
        ]);

        await mongoClient.db("admin").command({ ping: 1 });
        console.log("✅ Connected to MongoDB with enhanced role-based structure!");
    } catch (err) {
        console.error("❌ MongoDB connection error:", err.message);
        process.exit(1);
    }
};

// Enhanced cache system with TTL and role-based namespacing
const memoryCache = {
    store: {},
    get(key, role) {
        const cacheKey = role ? `${role}:${key}` : key;
        const item = this.store[cacheKey];
        if (item && item.expiresAt > Date.now()) {
            return item.value;
        }
        delete this.store[cacheKey]; // Clean up expired items
        return null;
    },
    set(key, value, ttl = 3600, role) { // Default TTL: 1 hour
        const cacheKey = role ? `${role}:${key}` : key;
        this.store[cacheKey] = {
            value,
            expiresAt: Date.now() + (ttl * 1000)
        };
    },
    del(key, role) {
        const cacheKey = role ? `${role}:${key}` : key;
        delete this.store[cacheKey];
    },
    clearRole(role) {
        Object.keys(this.store).forEach(key => {
            if (key.startsWith(`${role}:`)) {
                delete this.store[key];
            }
        });
    },
    flush() {
        this.store = {};
    }
};

// Comprehensive database methods with transactions support
const dbClient = {
    // User management
    async getUserByEmail(email) {
        return db.collection('users').findOne({ email });
    },

    async createUser(userData) {
        const session = mongoClient.startSession();
        try {
            let result;
            await session.withTransaction(async () => {
                result = await db.collection('users').insertOne(userData, { session });

                // Create role-specific profile
                if (userData.role === 'worker') {
                    await db.collection('workers').insertOne({
                        userId: result.insertedId,
                        email: userData.email,
                        createdAt: new Date(),
                        skills: [],
                        education: []
                    }, { session });
                } else if (userData.role === 'client') {
                    await db.collection('clients').insertOne({
                        userId: result.insertedId,
                        email: userData.email,
                        createdAt: new Date(),
                        companyInfo: {}
                    }, { session });
                }
            });
            return { ...userData, _id: result.insertedId };
        } finally {
            await session.endSession();
        }
    },

    // Worker-specific operations
    async getCompleteWorkerProfile(userId) {
        const [worker, user] = await Promise.all([
            db.collection('workers').findOne({ userId }),
            db.collection('users').findOne({ _id: userId })
        ]);
        return { ...user, ...worker };
    },

    async updateWorkerProfile(userId, updateData) {
        return db.collection('workers').updateOne(
            { userId },
            { $set: { ...updateData, updatedAt: new Date() } }
        );
    },

    async addWorkerEducation(userId, education) {
        return db.collection('workers').updateOne(
            { userId },
            { $push: { education } }
        );
    },

    async addWorkerSkill(userId, skill) {
        return db.collection('workers').updateOne(
            { userId },
            { $addToSet: { skills: skill } }
        );
    },

    // Client-specific operations
    async getCompleteClientProfile(userId) {
        const [client, user] = await Promise.all([
            db.collection('clients').findOne({ userId }),
            db.collection('users').findOne({ _id: userId })
        ]);
        return { ...user, ...client };
    },

    async updateClientProfile(userId, updateData) {
        return db.collection('clients').updateOne(
            { userId },
            { $set: { ...updateData, updatedAt: new Date() } }
        );
    },

    // Job operations
    async createJob(jobData) {
        return db.collection('jobs').insertOne({
            ...jobData,
            createdAt: new Date(),
            status: 'open'
        });
    },

    async applyForJob(applicationData) {
        return db.collection('applications').insertOne({
            ...applicationData,
            appliedAt: new Date(),
            status: 'pending'
        });
    },

    // Utility methods
    async getUserRole(userId) {
        const user = await db.collection('users').findOne({ _id: userId });
        return user ? user.role : null;
    }
};

module.exports = {
    connectMongoDB,
    getDb: () => db,
    getMongoClient: () => mongoClient,
    cacheClient: memoryCache,
    dbClient
};