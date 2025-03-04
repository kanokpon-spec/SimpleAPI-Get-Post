const db = require("../database");

const addProduct = (name, price, stock, callback) => {
  db.run(
    "INSERT INTO products (name, price, stock) VALUES (?, ?, ?)",
    [name, price, stock],
    function (err) {
      callback(err, this.lastID);
    }
  );
};

const getAllProducts = (callback) => {
  db.all("SELECT * FROM products ORDER BY id ASC", [], (err, rows) => {
    callback(err, rows);
  });
};

module.exports = { addProduct, getAllProducts };
