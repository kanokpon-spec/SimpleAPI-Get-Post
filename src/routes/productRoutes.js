const express = require("express");
const router = express.Router();
const { addProduct, getAllProducts } = require("../models/productModel");

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: เพิ่มสินค้าใหม่
 *     description: API สำหรับเพิ่มสินค้า
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Laptop"
 *               price:
 *                 type: number
 *                 example: 35000
 *               stock:
 *                 type: integer
 *                 example: 10
 *     responses:
 *       201:
 *         description: สินค้าถูกเพิ่มเรียบร้อย
 *       400:
 *         description: ข้อมูลไม่ครบถ้วน
 */
router.post("/", (req, res) => {
  let parsedBody;
  try {
    parsedBody = req.body; // ข้อมูลที่ผ่าน body-parser มาแล้ว
    const { name, price, stock } = parsedBody;

    // ตรวจสอบ field ที่จำเป็น
    if (!name || price === undefined || stock === undefined) {
      return res
        .status(400)
        .json({ status: "error", error: "Missing required fields" });
    }

    // ตรวจสอบประเภทข้อมูล
    if (
      typeof price !== "number" ||
      typeof stock !== "number" ||
      isNaN(price) ||
      isNaN(stock)
    ) {
      return res.status(400).json({
        status: "error",
        error: "Price and stock must be valid numbers",
      });
    }

    addProduct(name, price, stock, (err, id) => {
      if (err) {
        return res.status(500).json({
          status: "error",
          error: "Database error",
          details: err.message,
        });
      }
      res.status(201).json({ status: "success", message: "Product added", id });
    });
  } catch (error) {
    // จัดการกรณีที่ req.body เกิด error (เช่น JSON parse ล้มเหลว)
    return res.status(400).json({
      status: "error",
      error: "Invalid JSON format",
      details: error.message,
    });
  }
});

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: ดึงรายการสินค้าทั้งหมด
 *     description: API สำหรับดึงสินค้าทั้งหมดและเรียงตามราคา
 *     responses:
 *       200:
 *         description: รายการสินค้าทั้งหมด
 *       500:
 *         description: มีข้อผิดพลาดจาก Database
 */
router.get("/", (req, res) => {
  getAllProducts((err, products) => {
    if (err)
      return res.status(500).json({ status: "error", error: "Database error" });
    res.json({ products });
  });
});

module.exports = router;
