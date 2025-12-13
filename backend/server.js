const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

// ============================================
// PHASE 1: SECURITY MIDDLEWARE (Enhanced)
// ============================================

// 1. Helmet.js - Set security HTTP headers
app.use(helmet());
app.use(helmet.contentSecurityPolicy({
    directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        scriptSrc: ["'self'"],
        imgSrc: ["'self'", 'data:', 'https:'],
    },
}));

// 2. Rate Limiting - Prevent brute force attacks
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later.'
});
app.use('/api/', limiter);

// 3. CORS - Restrict cross-origin requests
const corsOptions = {
    origin: process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : ['http://localhost:3000'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
};
app.use(cors(corsOptions));

// 4. Body Parser with limits
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// 5. Data Sanitization - against NoSQL injection
app.use(mongoSanitize({
    replaceWith: '_',
    onSanitize: ({ req, key }) => {
        console.warn(`Potential NoSQL injection detected in ${key}`);
    },
}));

// 6. Data Sanitization - against XSS
app.use(xss());

// 7. HTTP Parameter Pollution prevention
app.use(hpp({
    whitelist: ['sort', 'fields', 'page', 'limit']
}));

// 8. Request logging middleware
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
    next();
});

// ============================================
// JWT & AUTHENTICATION UTILITIES
// ============================================

// JWT Configuration
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
const JWT_EXPIRY = '24h';
const JWT_REFRESH_EXPIRY = '7d';

// Generate JWT Token
const generateToken = (payload) => {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRY });
};

// Verify JWT Token
const verifyToken = (token) => {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch (error) {
        console.error('Token verification failed:', error.message);
        return null;
    }
};

// Middleware to verify JWT
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
        return res.status(401).json({ error: 'Access token required' });
    }

    const decoded = verifyToken(token);
    if (!decoded) {
        return res.status(403).json({ error: 'Invalid or expired token' });
    }

    req.user = decoded;
    next();
};

// Hash password utility
const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
};

// Compare password utility
const comparePassword = async (password, hash) => {
    return bcrypt.compare(password, hash);
};

// ============================================
// ROUTES
// ============================================

// Health check
app.get('/', (req, res) => {
    res.send('SkyUnit Backend is running.');
});

// Dummy user database (replace with real database)
const users = {};

// Login endpoint
app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password required' });
        }

        // For demo, assume user exists
        const user = { id: '1', email };
        const token = generateToken({ id: user.id, email: user.email });
        const refreshToken = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: JWT_REFRESH_EXPIRY });

        res.json({
            success: true,
            token,
            refreshToken,
            user
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Login failed' });
    }
});

// Refresh token endpoint
app.post('/api/refresh-token', (req, res) => {
    try {
        const { refreshToken } = req.body;

        if (!refreshToken) {
            return res.status(400).json({ error: 'Refresh token required' });
        }

        const decoded = jwt.verify(refreshToken, JWT_SECRET);
        const newToken = generateToken({ id: decoded.id });

        res.json({ token: newToken });
    } catch (error) {
        console.error('Token refresh error:', error);
        res.status(403).json({ error: 'Invalid refresh token' });
    }
});

// Protected endpoint example
app.get('/api/profile', authenticateToken, (req, res) => {
    res.json({
        success: true,
        user: req.user
    });
});

app.post('/api/assistant', async (req, res) => {
    try {
        const { prompt } = req.body;

        if (!prompt || typeof prompt !== 'string' || prompt.trim() === '') {
            return res.status(400).json({ error: 'Request body must contain a non-empty "prompt" field.' });
        }

        // Gemini AI connection is disabled. Returning a static message.
        res.json({
            reply: 'عفوًا، المساعد الذكي غير متاح حاليًا. يرجى المحاولة في وقت لاحق.'
        });
    } catch (error) {
        console.error('Assistant error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/api/contact', (req, res) => {
    try {
        const { name, phone, message } = req.body;

        if (!name || !phone) {
            return res.status(400).json({
                success: false,
                error: 'Name and phone are required.'
            });
        }

        // In a real application, you would save this to a database.
        // For this demo, we'll just log it to the console.
        console.log('New contact form submission:');
        console.log(`- Name: ${name}`);
        console.log(`- Phone: ${phone}`);
        console.log(`- Message: ${message}`);

        res.status(200).json({ success: true, message: 'Message received successfully!' });
    } catch (error) {
        console.error('Contact error:', error);
        res.status(500).json({ success: false, error: 'Failed to process contact form' });
    }
});

// Projects API
app.get('/projects', (req, res) => {
    const fs = require('fs');
    const path = require('path');

    const projectsDir = path.join(__dirname, '../public/projects');
    try {
        const files = fs.readdirSync(projectsDir).filter(f => f.endsWith('.json'));
        const projects = files.map(file => {
            const filePath = path.join(projectsDir, file);
            const content = fs.readFileSync(filePath, 'utf8');
            return JSON.parse(content);
        });
        res.json(projects);
    } catch (error) {
        console.error('Error reading projects:', error);
        res.status(500).json({ error: 'Failed to load projects' });
    }
});

app.get('/api/projects', (req, res) => {
    const fs = require('fs');
    const path = require('path');

    const projectsDir = path.join(__dirname, '../public/projects');
    try {
        const files = fs.readdirSync(projectsDir).filter(f => f.endsWith('.json'));
        const projects = files.map(file => {
            const filePath = path.join(projectsDir, file);
            const content = fs.readFileSync(filePath, 'utf8');
            return JSON.parse(content);
        });
        res.json(projects);
    } catch (error) {
        console.error('Error reading projects:', error);
        res.status(500).json({ error: 'Failed to load projects' });
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Server error:', err);
    res.status(500).json({
        success: false,
        error: process.env.NODE_ENV === 'production' ? 'Internal server error' : err.message
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: 'Endpoint not found' });
});

// Start server
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
