/**
 * Centralised Swagger (OpenAPI 3) setup
 * -------------------------------------
 *  – Runs swagger-jsdoc to *generate* the OpenAPI JSON from comment blocks
 *  – Feeds that JSON to swagger-ui-express so you get /api-docs
 */

const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const path = require("path");

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Work-it API",
            version: "1.0.0",
            description: "Backend service for Work-it (workers & clients)",
        },
        servers: [
            { url: "http://localhost:5600", description: "Local dev server" },
            // add prod URL later
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
        },
    },

    // 👉 add every folder that contains route files or controllers
    apis: [
        path.resolve(__dirname, "..", "routes", "*.js"),
        path.resolve(__dirname, "..", "controllers", "**", "*.js"),
    ],
};

const specs = swaggerJsdoc(options);

module.exports = (app) => {
    // Serve raw JSON at /api-docs.json (handy for Redoc, Insomnia, etc.)
    app.get("/api-docs.json", (req, res) => res.json(specs));

    // Serve interactive Swagger UI at /api-docs
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
};
