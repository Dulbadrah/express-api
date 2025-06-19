import { Request, Response } from "express";
import fs from "fs-extra";

 const getUserss =  (req: Request, res: Response) => {
  const users = fs.readFileSync("./user.json", { encoding: "utf8", flag: "r" });
  res.json(JSON.parse(users));
};

 export default getUserss