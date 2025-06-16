import express from "express";

const app = express();
const port = 413;

app.use(express.json());

app.get("/", (req, res) => {
  res.send({
    name: "movie-app",
    id: "578438390",
    age: "21",
  });
});

app.post("/user", (req, res) => {
  const { name, age } = req.body;

  res.json({ messege: `user ${name} is ${age} years old.` });
});

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
