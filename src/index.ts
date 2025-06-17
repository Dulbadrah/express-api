import express from "express";

import useRouter from "./user/user";
const app = express();
const port = 6108;
app.use(express.json());

app.use("/",useRouter)

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
