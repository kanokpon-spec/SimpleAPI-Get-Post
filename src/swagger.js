const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const PORT = process.env.PORT || 3000;
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Product API",
      version: "1.0.0",
      description: "API สำหรับจัดการสินค้า (Node.js + Express + SQLite)",
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
        description: "Local Server",
      },
    ],
  },
  apis: ["./src/routes/*.js"], // ให้ Swagger อ่าน docs จากไฟล์ routes
};

const swaggerSpec = swaggerJsdoc(options);

const setupSwagger = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

module.exports = setupSwagger;
