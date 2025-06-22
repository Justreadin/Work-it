const { getDb } = require("../../config/db");
const { ObjectId } = require("mongodb");
const Joi = require('joi');

// Enhanced validation schema matching your Client model
const profileSchema = Joi.object({
    companyName: Joi.string().max(100).required(),
    companySize: Joi.string().valid(
        '1-10', '11-50', '51-200', '201-500', '501-1000', '1000+'
    ).required(),
    industry: Joi.string().max(100).required(),
    website: Joi.string().uri().allow(''),
    companyDescription: Joi.string().max(1000).allow(''),
    hiringPreferences: Joi.array().items(
        Joi.string().valid('Full-time', 'Part-time', 'Contract', 'Freelance')
    ).default([]),
    contactPerson: Joi.object({
        name: Joi.string().max(100).required(),
        position: Joi.string().max(100).required(),
        phone: Joi.string().pattern(/^\+?[0-9]{10,15}$/).required()
    }).required(),
    paymentVerified: Joi.boolean().default(false)
});

// Save client profile with validation
const saveClientProfile = async (req, res) => {
    const { userId } = req.user;
    
    try {
        // Validate with custom error messages
        const { error, value } = profileSchema.validate(req.body, {
            abortEarly: false,
            messages: {
                'string.max': '{#label} should not exceed {#limit} characters',
                'any.required': '{#label} is required',
                'string.pattern.base': 'Please provide a valid phone number'
            }
        });

        if (error) {
            const errors = error.details.map(detail => ({
                field: detail.path.join('.'),
                message: detail.message
            }));
            return res.status(400).json({
                success: false,
                error: "Validation failed",
                details: errors
            });
        }

        // Prepare update data
        const updateData = {
            ...value,
            updatedAt: new Date()
        };

        // Update client profile
        const result = await getDb().collection('clients').updateOne(
            { userId: new ObjectId(userId) },
            { $set: updateData },
            { upsert: true }
        );

        if (!result.acknowledged) {
            throw new Error("Database operation failed");
        }

        res.json({
            success: true,
            message: "Profile updated successfully",
            data: updateData
        });

    } catch (error) {
        console.error("Profile save error:", error);
        res.status(500).json({
            success: false,
            error: "Failed to save profile",
            ...(process.env.NODE_ENV === 'development' && { debug: error.message })
        });
    }
};

// Get client profile (combines User and Client data)
const getClientProfile = async (req, res) => {
    const { userId } = req.user;

    try {
        const [client, user] = await Promise.all([
            getDb().collection('clients').findOne(
                { userId: new ObjectId(userId) },
                { projection: { _id: 0, userId: 0 } }
            ),
            getDb().collection('users').findOne(
                { _id: new ObjectId(userId) },
                { projection: { _id: 0, password: 0, otp: 0, otpCreatedAt: 0 } }
            )
        ]);

        if (!client || !user) {
            return res.status(404).json({
                success: false,
                error: "Profile not found"
            });
        }

        // Combine data with proper fallbacks
        const profileData = {
            company: {
                name: client.companyName,
                size: client.companySize,
                industry: client.industry,
                website: client.website,
                description: client.companyDescription,
                hiringPreferences: client.hiringPreferences || [],
                paymentVerified: client.paymentVerified || false
            },
            contact: {
                ...(client.contactPerson || {}),
                email: user.email, // Always from user collection
                photo: user.photo // Profile picture
            },
            meta: {
                createdAt: client.createdAt || user.createdAt,
                updatedAt: client.updatedAt
            }
        };

        res.json({
            success: true,
            data: profileData
        });

    } catch (error) {
        console.error("Profile fetch error:", error);
        res.status(500).json({
            success: false,
            error: "Failed to fetch profile"
        });
    }
};

// Upload company logo (extends Client model)
const uploadClientLogo = async (req, res) => {
    const { userId } = req.user;

    if (!req.file) {
        return res.status(400).json({
            success: false,
            error: "No file uploaded"
        });
    }

    try {
        const logoPath = `/uploads/clients/${userId}/${Date.now()}-${req.file.originalname}`;

        // Update both User (for profile picture) and Client collections
        await Promise.all([
            getDb().collection('users').updateOne(
                { _id: new ObjectId(userId) },
                { $set: { photo: logoPath } }
            ),
            getDb().collection('clients').updateOne(
                { userId: new ObjectId(userId) },
                { $set: { companyLogo: logoPath } }
            )
        ]);

        res.json({
            success: true,
            data: { logoPath },
            message: "Logo uploaded successfully"
        });

    } catch (error) {
        console.error("Logo upload error:", error);
        res.status(500).json({
            success: false,
            error: "Failed to upload logo"
        });
    }
};

module.exports = {
    saveClientProfile,
    getClientProfile,
    uploadClientLogo
};