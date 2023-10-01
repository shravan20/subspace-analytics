const { version } = require("../../package.json");


const swaggerConfig = {
    openapi: "3.0.0",
    info: {
        title: "Subspace Analytics API documentation",
        version,
    },
    servers: [
        {
            url: `http://localhost:${process.env.APP_POR || 4000}/v1/api`,
        },
    ],
};

module.exports = swaggerConfig;