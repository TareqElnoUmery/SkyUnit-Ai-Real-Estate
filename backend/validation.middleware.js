// ============================================
// PHASE 3: VALIDATION & ERROR HANDLING MIDDLEWARE
// ============================================

const Joi = require('joi');
const SlowBuffer = require('buffer').SlowBuffer;

// ============================================
// VALIDATION SCHEMAS (using Joi)
// ============================================

const schemas = {
    // User Registration Schema
    registerUser: Joi.object({
        email: Joi.string()
            .email()
            .required()
            .messages({
                'string.email': 'Please provide a valid email address',
                'any.required': 'Email is required'
            }),
        password: Joi.string()
            .min(8)
            .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/)
            .required()
            .messages({
                'string.min': 'Password must be at least 8 characters',
                'string.pattern.base': 'Password must contain uppercase, lowercase, number, and special character',
                'any.required': 'Password is required'
            }),
        name: Joi.string()
            .min(2)
            .max(50)
            .required()
            .trim(),
        phone: Joi.string()
            .pattern(/^[+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,9}$/)
            .optional()
    }),

    // Login Schema
    login: Joi.object({
        email: Joi.string()
            .email()
            .required(),
        password: Joi.string()
            .required()
    }),

    // Project Creation Schema
    createProject: Joi.object({
        name: Joi.string()
            .min(3)
            .max(100)
            .required(),
        description: Joi.string()
            .max(1000)
            .required(),
        location: Joi.object({
            lat: Joi.number().required(),
            lng: Joi.number().required()
        }).required(),
        price: Joi.number()
            .min(0)
            .required(),
        status: Joi.string()
            .valid('active', 'inactive', 'pending')
            .default('active')
    }),

    // Contact Form Schema
    contactForm: Joi.object({
        name: Joi.string()
            .min(2)
            .max(50)
            .required(),
        email: Joi.string()
            .email()
            .required(),
        phone: Joi.string()
            .pattern(/^[+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,9}$/)
            .required(),
        message: Joi.string()
            .min(10)
            .max(1000)
            .required()
    }),

    // Update Profile Schema
    updateProfile: Joi.object({
        name: Joi.string()
            .min(2)
            .max(50)
            .optional(),
        phone: Joi.string()
            .pattern(/^[+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,9}$/)
            .optional(),
        bio: Joi.string()
            .max(500)
            .optional()
    })
};

// ============================================
// VALIDATION MIDDLEWARE FACTORY
// ============================================

const validate = (schema, source = 'body') => {
    return (req, res, next) => {
        const { error, value } = schema.validate(req[source], {
            abortEarly: false,
            stripUnknown: true,
            convert: true
        });

        if (error) {
            const errors = error.details.map(detail => ({
                field: detail.path.join('.'),
                message: detail.message
            }));

            return res.status(400).json({
                success: false,
                errors,
                message: 'Validation failed'
            });
        }

        req[source] = value;
        next();
    };
};

// ============================================
// ERROR HANDLING MIDDLEWARE
// ============================================

const errorHandler = (err, req, res, next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || 'Internal server error';

    // Log error details (in production, use a proper logging service)
    console.error(`[ERROR ${status}] ${message}`, {
        url: req.originalUrl,
        method: req.method,
        ip: req.ip,
        timestamp: new Date().toISOString(),
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });

    // Custom error responses
    const response = {
        success: false,
        status,
        message
    };

    // Add detailed errors only in development
    if (process.env.NODE_ENV === 'development') {
        response.error = err;
    }

    res.status(status).json(response);
};

// ============================================
// CUSTOM ERROR CLASSES
// ============================================

class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        Error.captureStackTrace(this, this.constructor);
    }
}

class ValidationError extends AppError {
    constructor(message) {
        super(message, 400);
        this.name = 'ValidationError';
    }
}

class AuthenticationError extends AppError {
    constructor(message = 'Authentication failed') {
        super(message, 401);
        this.name = 'AuthenticationError';
    }
}

class AuthorizationError extends AppError {
    constructor(message = 'Not authorized') {
        super(message, 403);
        this.name = 'AuthorizationError';
    }
}

class NotFoundError extends AppError {
    constructor(message = 'Resource not found') {
        super(message, 404);
        this.name = 'NotFoundError';
    }
}

// ============================================
// RATE LIMITING WITH REDIS (Advanced)
// ============================================

const createRateLimiter = (redisClient, options = {}) => {
    const {
        windowMs = 60 * 1000, // 1 minute
        maxRequests = 30,
        keyGenerator = (req) => req.ip
    } = options;

    return async (req, res, next) => {
        try {
            const key = `ratelimit:${keyGenerator(req)}`;
            const count = await redisClient.incr(key);

            if (count === 1) {
                await redisClient.expire(key, Math.ceil(windowMs / 1000));
            }

            res.setHeader('X-RateLimit-Limit', maxRequests);
            res.setHeader('X-RateLimit-Remaining', Math.max(0, maxRequests - count));

            if (count > maxRequests) {
                return res.status(429).json({
                    success: false,
                    message: 'Too many requests, please try again later.'
                });
            }

            next();
        } catch (error) {
            console.error('Rate limiter error:', error);
            next(); // Continue anyway if Redis fails
        }
    };
};

// ============================================
// REQUEST LOGGING MIDDLEWARE
// ============================================

const requestLogger = (req, res, next) => {
    const startTime = Date.now();

    res.on('finish', () => {
        const duration = Date.now() - startTime;
        console.log(`[${new Date().toISOString()}] ${req.method} ${req.path} - ${res.statusCode} (${duration}ms)`);
    });

    next();
};

module.exports = {
    schemas,
    validate,
    errorHandler,
    AppError,
    ValidationError,
    AuthenticationError,
    AuthorizationError,
    NotFoundError,
    createRateLimiter,
    requestLogger
};
