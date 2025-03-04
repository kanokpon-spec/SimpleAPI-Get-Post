const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./products.db", (err) => {
  if (err) console.error("Database connection error:", err);
  else {
    console.log("Connected to SQLite database.");
    db.run(
      `CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        price REAL NOT NULL CHECK(price >= 0),
        stock INTEGER NOT NULL CHECK(stock >= 0)
      )`
    );
  }
});

module.exports = db;
