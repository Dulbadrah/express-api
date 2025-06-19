
import { Request, Response } from "express";
import fs from "fs-extra";

const deleteUser = (req: Request, res: Response) => {
    console.log(deleteUser)
  const { userId } = req.params;
  const existingData = fs.readFileSync("./user.json", "utf8");

  const deletedUser = JSON.parse(existingData).filter(
    (user: any) => user.userId !== userId
  );

  fs.writeFileSync("./user.json", JSON.stringify(deletedUser, null, 2));

  res.json({
    userId,
  });
};
export default deleteUser