import express, { Request, Response } from "express";
import fs from "fs-extra";
import { User } from "../type/type";


const useRouter = express.Router();

const uniquiId = Math.random();

useRouter.put("/updateUser", (req: Request, res: Response) => {
  const { name, age }: User = req.body;
  res.send(`updated user ${name} ${age}`);
});

useRouter.delete("/deleteUser", (req: Request, res: Response) => {
  const { userId } = req.body;
  
  
  res.send(`deleted user id ${userId}`);
});

useRouter.post("/createUser", (req: Request, res: Response) => {
  const { name, age, userName, userEmail, phoneNumber, password }: User =
    req.body;

  fs.writeFileSync(
    "./user.json",
    JSON.stringify([
      {
        name,
        age,
        userName,
        userId: uniquiId,
        userEmail,
        phoneNumber,
        password,
      },
    ])
  );

  useRouter.get("/users", (req: Request, res: Response) => {
    const users = fs.readFileSync("./user.json", { encoding: "utf8", flag: "r" });
    res.json(JSON.parse(users));
  });

  res.send("tanii medeelel amjilttai burtgegdlee");
});



export default useRouter;
