import { Request, Response } from "express";
import { User } from "../type/type";
import fs from "fs-extra";

const createUser=(req: Request, res: Response) => {
  const { name, age, userName, userEmail, phoneNumber, password }: User =
    req.body;

  const uniqueId = Math.random();

  const filePath = "./user.json";

  let users: User[] = [];

  if (fs.existsSync(filePath)) {
    const existingData = fs.readFileSync(filePath, "utf8");
    if (existingData.trim().length > 0) {
      users = JSON.parse(existingData);
    }
  }

  users.push({
    name,
    age,
    userId: uniqueId,
    userName,
    userEmail,
    phoneNumber,
    password,
  });

  fs.writeFileSync(filePath, JSON.stringify(users, null, 2));

  res.send("Successfully created User");
}
export default createUser