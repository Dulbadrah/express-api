import { Request, Response } from "express";
import { User } from "../type/type";
import getUsers from "./getUsers.controller";
import updateUsersJson from "./usersJson.controller";

const updateUser = (req: Request, res: Response) => {
  const { name, age, userName, userEmail, phoneNumber }: User = req.body;
  const { userId } = req.params;

  console.log(userId);
  const users = getUsers();
  console.log(users);
  const foundedUser = users.find((user) => user.userId === userId);

  console.log(foundedUser);

  if (!foundedUser) {
    res.json({ success: false, message: "user not found" });
    return;
  }

  const updatedUsers = users.map((user: User) => {
    if (user.userId === userId) {
      return { ...user, name, age, userEmail, userName, phoneNumber };
    }

    return user;
  });

  const updatedUsersJson = updateUsersJson(updatedUsers);

  res.json(updatedUsersJson);
};
export default updateUser;
