const Joi = require('joi');

const createJobSchema = Joi.object({
    title: Joi.string().required().max(100),
    description: Joi.string().required(),
    price: Joi.number().required().min(0),
    tasks: Joi.array().items(Joi.string()).min(1).required(),
    tags: Joi.array().items(Joi.string()),
    duration: Joi.string().valid('1 month', '3 months', '6 months').default('3 months'),
    location: Joi.string().valid('Lagos', 'Abuja', 'Remote').default('Lagos'),
    workersNeeded: Joi.number().integer().min(1).max(20).default(1),
    deadline: Joi.date().required().min('now')
});

const updateJobSchema = Joi.object({
    title: Joi.string().max(100),
    description: Joi.string(),
    price: Joi.number().min(0),
    tasks: Joi.array().items(Joi.string()).min(1),
    tags: Joi.array().items(Joi.string()),
    duration: Joi.string().valid('1 month', '3 months', '6 months'),
    location: Joi.string().valid('Lagos', 'Abuja', 'Remote'),
    workersNeeded: Joi.number().integer().min(1).max(20),
    deadline: Joi.date().min('now'),
    status: Joi.string().valid('draft', 'active', 'completed', 'cancelled')
}).min(1);

exports.create = (req, res, next) => {
    const { error } = createJobSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ 
            success: false,
            error: error.details[0].message 
        });
    }
    next();
};

exports.update = (req, res, next) => {
    const { error } = updateJobSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ 
            success: false,
            error: error.details[0].message 
        });
    }
    next();
};

// validateJob.js
const validate = {
    create: (req, res, next) => {
        const { error } = createJobSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ 
                success: false,
                error: error.details[0].message 
            });
        }
        next();
    },
    update: (req, res, next) => {
        const { error } = updateJobSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ 
                success: false,
                error: error.details[0].message 
            });
        }
        next();
    }
};

module.exports = validate; 