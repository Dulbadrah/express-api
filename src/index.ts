import express, { Request, Response } from "express";

import useRouter from "./user/user";
import { Db, MongoClient } from "mongodb";
import "dotenv/config";
const app = express();
const port = 6108;
app.use(express.json());
export let db: Db;
app.use("/", useRouter);
const connectDb = async () => {
  try {
    const client = new MongoClient(process.env.MONGO_URL!);

    db = client.db("sample_mflix");
    console.log("Database connected");

    return client;
  } catch (error) {
    return error;
  }
};

app.post("/addUsers", async (req: Request, res: Response) => {
  const { name, age, userName, userEmail, phoneNumber, password } = req.body;
  try {
    const response = await db
      .collection("user")
      .insertOne({ name, age, userName, userEmail, phoneNumber, password });

    res.json(response);
    res.status(200);
  } catch (error) {
    console.log(error);
    res.status(400).send("api error");
  }
});

app.get("/getUser", async (req: Request, res: Response) => {
  const response = db.collection("getUser").find();
  res.json(response);
});
app.listen(port, async () => {
  await connectDb();
  console.log(`Example app listening on port http://localhost:${port}`);
});
