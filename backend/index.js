import express from "express";
import mysql from "mysql";
import cors from "cors";
import bcrypt from "bcryptjs";

const app = express();

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "test",
});

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json("hello this is the backend");
});

app.post("/register", (req, res) => {

    const x = "SELECT * FROM users WHERE email = ? OR username = ?"

    db.query(x, [req.body.email, req.body.name,], (err,data)=>{
        if (err) return res.json(err);
        if(data.length) return res.status(409).json("user already exists");

        //Hash the password create a user
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const q = "INSERT INTO users(`username`, `email`, `password`) VALUES (?)";
        const values = [req.body.username, req.body.email, hash];
        db.query(q, [values], (err, data) => {
          if (err) return res.json(err);
          return res.status(200).json("user has been created.");
        });
    })


});

app.get("/books", (req, res) => {
  const q = "SELECT * FROM books";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.post("/books", (req, res) => {
  const q =
    "INSERT INTO books (`title`, `description`, `price`, `cover`) VALUES (?)";
  const values = [
    req.body.title,
    req.body.description,
    req.body.price,
    req.body.cover,
  ];

  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json("book has been created");
  });

  // const q = "INSERT INTO users(`username`,`password`) VALUES (?)"
  //     const values = [
  //         "testemail",
  //         "testpass",
  //     ]
  //     db.query(q,[values], (err,data)=>{
  //         if (err) return res.json(err);
  //         return res.status(200).json("user has been created.");
  //     });
});

app.put("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const q =
    "UPDATE books SET `title` = ?, `description` = ?, `price` = ?, `cover` = ? WHERE id = ?";

  const values = [
    req.body.title,
    req.body.description,
    req.body.price,
    req.body.cover,
  ];

  db.query(q, [...values, bookId], (err, data) => {
    if (err) return res.json(err);
    return res.json("Book has been updated successfiully");
  });
});

app.delete("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const q = "DELETE FROM books WHERE id = ?";

  db.query(q, [bookId], (err, data) => {
    if (err) return res.json(err);
    return res.json("Book has been deleted successfiully");
  });
});

app.listen(8800, () => {
  console.log("Connected to backend!");
});
