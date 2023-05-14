import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();

// Connect to database
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "etaKsirhC!48#",
  database: "test",
});

// Can't send to express server by default, to prevent we add this
app.use(express.json());
app.use(cors());

// Test
app.get("/", (req, res) => {
  res.json("hello this is the backend");
});

// Show all books
app.get("/books", (req, res) => {
  const q = "SELECT * FROM books";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

// Add books
app.post("/books", (req, res) => {
  const q = "INSERT INTO books (`title`, `desc`, `price`, `cover`) VALUES (?)";
  const values = [
    req.body.title,
    req.body.desc,
    req.body.price,
    req.body.cover,
  ];

  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

// endpoint: delete
app.delete("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const q = `DELETE FROM books WHERE id=?`;

  db.query(q, [bookId], (err, data) => {
    if (err) return res.json(err);
    return res.json("Book has been deleted successfully.");
  });
});

// update element, endpoint: put
app.put("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const q =
    "UPDATE books SET `title` = ?, `desc` = ?, `price` = ?, `cover` = ? WHERE id = ?";

  const values = [
    req.body.title,
    req.body.desc,
    req.body.price,
    req.body.cover,
  ];

  db.query(q, [...values, bookId], (err, data) => {
    if (err) return res.json(err);
    return res.json("Book has been updated successfully.");
  });
});

// Test
app.listen(8800, () => {
  console.log("connected to backend!");
});
