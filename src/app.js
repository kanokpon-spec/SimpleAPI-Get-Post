const express = require("express");
const cors = require("cors");
const productRoutes = require("./routes/productRoutes");
const setupSwagger = require("./swagger");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

// Middleware
app.use(express.json()); // ให้รองรับ JSON
app.use("/api/products", productRoutes);

app.use(cors());

// Setup Swagger
setupSwagger(app);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`Swagger Docs: http://localhost:${PORT}/api-docs`);
});
