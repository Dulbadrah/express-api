import { Request, Response } from "express";
import getUsers from "./getUsers.controller";

 const selectId= (req: Request, res: Response) => {
  const { userId } = req.params;
  const users = getUsers();
  const user = users.find(
    (use: any) => use.userId == userId
  );
  if (user) {
    res.status(202), res.json(user);
  } else {
    res.status(404  ), res.send("not found");
  }
}
export default selectId