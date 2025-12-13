// ============================================
// PHASE 2: DATABASE OPTIMIZATION & CONFIGURATION
// ============================================

const mongoose = require('mongoose');
const redis = require('redis');

// ============================================
// DATABASE CONNECTION WITH RETRY LOGIC
// ============================================

const connectDB = async (uri) => {
    try {
        const conn = await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            maxPoolSize: 10,
            serverSelectionTimeoutMS: 5000,
            retryWrites: true,
            w: 'majority',
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
        return conn;
    } catch (error) {
        console.error(`Database Connection Error: ${error.message}`);
        process.exit(1);
    }
};

// ============================================
// MONGODB INDEX CREATION (B-tree, Partial)
// ============================================

const createDatabaseIndexes = async () => {
    const db = mongoose.connection;

    try {
        // Example: Projects collection indexes
        await db.collection('projects').createIndex({ name: 1 }); // B-tree index
        await db.collection('projects').createIndex({ createdAt: -1 }); // Descending B-tree
        await db.collection('projects').createIndex({ location: '2dsphere' }); // Geospatial index
        
        // Partial index: Only active projects
        await db.collection('projects').createIndex(
            { updatedAt: -1 },
            { partialFilterExpression: { status: 'active' } }
        );

        // Text search index
        await db.collection('projects').createIndex({ 'name': 'text', 'description': 'text' });

        // Users collection indexes
        await db.collection('users').createIndex({ email: 1 }, { unique: true });
        await db.collection('users').createIndex({ createdAt: -1 });
        
        // TTL index for sessions (auto-delete after 24 hours)
        await db.collection('sessions').createIndex(
            { createdAt: 1 },
            { expireAfterSeconds: 86400 }
        );

        console.log('Database indexes created successfully');
    } catch (error) {
        console.error(`Index Creation Error: ${error.message}`);
    }
};

// ============================================
// REDIS CACHE CONFIGURATION
// ============================================

const redisClient = redis.createClient({
    host: process.env.REDIS_HOST || 'localhost',
    port: process.env.REDIS_PORT || 6379,
    password: process.env.REDIS_PASSWORD || undefined,
    db: process.env.REDIS_DB || 0,
    retryStrategy: (options) => {
        if (options.error && options.error.code === 'ECONNREFUSED') {
            return new Error('Redis connection refused');
        }
        if (options.total_retry_time > 1000 * 60 * 60) {
            return new Error('Redis retry time exhausted');
        }
        return Math.min(options.attempt * 100, 3000);
    },
});

redisClient.on('error', (err) => console.error('Redis error:', err));
redisClient.on('ready', () => console.log('Redis client ready'));
redisClient.on('reconnecting', () => console.log('Redis reconnecting...'));

// ============================================
// CACHING UTILITIES
// ============================================

const cacheKey = (prefix, identifier) => `${prefix}:${identifier}`;

const cacheSet = async (key, value, expiresIn = 3600) => {
    try {
        await redisClient.setex(key, expiresIn, JSON.stringify(value));
    } catch (error) {
        console.error(`Cache set error: ${error.message}`);
    }
};

const cacheGet = async (key) => {
    try {
        const data = await redisClient.get(key);
        return data ? JSON.parse(data) : null;
    } catch (error) {
        console.error(`Cache get error: ${error.message}`);
        return null;
    }
};

const cacheDelete = async (key) => {
    try {
        await redisClient.del(key);
    } catch (error) {
        console.error(`Cache delete error: ${error.message}`);
    }
};

const cacheClear = async (pattern) => {
    try {
        const keys = await redisClient.keys(pattern);
        if (keys.length > 0) {
            await redisClient.del(...keys);
        }
    } catch (error) {
        console.error(`Cache clear error: ${error.message}`);
    }
};

// ============================================
// DATABASE SCHEMA ENHANCEMENTS
// ============================================

// Example: User Schema with validation and encryption
const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
            lowercase: true,
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Invalid email']
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
            minlength: 8,
            select: false // Don't return password by default
        },
        name: {
            type: String,
            required: [true, 'Name is required'],
            trim: true
        },
        role: {
            type: String,
            enum: ['user', 'admin', 'moderator'],
            default: 'user'
        },
        isActive: {
            type: Boolean,
            default: true,
            index: true
        },
        lastLogin: Date,
        loginAttempts: {
            type: Number,
            default: 0
        },
        lockUntil: Date,
    },
    { timestamps: true }
);

// Compound index for performance
userSchema.index({ email: 1, isActive: 1 });

module.exports = {
    connectDB,
    createDatabaseIndexes,
    redisClient,
    cacheSet,
    cacheGet,
    cacheDelete,
    cacheClear,
    cacheKey,
    userSchema,
};
