import express, { Request, Response } from "express";
import fs from "fs-extra";
import { User } from "../type/type";

const userRouter = express.Router();

userRouter.get("/users", (req: Request, res: Response) => {
  const users = fs.readFileSync("./user.json", { encoding: "utf8", flag: "r" });
  res.json(JSON.parse(users));
});

userRouter.post("/createUser", (req: Request, res: Response) => {
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
});

userRouter.post("/deleteUser/:userId", (req: Request, res: Response) => {
  const { userId } = req.body;
  const existingData = fs.readFileSync("./user.json", "utf8");

  const deletedUser = JSON.parse(existingData).filter(
    (user: any) => user.userId !== userId
  );

  fs.writeFileSync("./user.json", JSON.stringify(deletedUser, null, 2));

  res.json({
    userId,
  });
});

//updateUser
userRouter.put("/updateUser/:userId", (req: Request, res: Response) => {
  const { name, age, userName, userEmail, phoneNumber }: User = req.body;
   const { userId } = req.params;

  const users = getUsers();

  const foundedUser = users.find((user) => user.userId === userId);

  if(!foundedUser) {
    res.json({ success: false, message: "user not found"})
    return
  }

  const updatedUsers = users.map((user: User) => {
    if (user.userId === userId) {
      return { ...user, name, age, userEmail, userName, phoneNumber };
    } 
    
    return user
  });

  const updatedUsersJson = updateUsersJson(updatedUsers);

  res.json(updatedUsersJson);
});

//Selectid
userRouter.get("/getUser/:userId", (req: Request, res: Response) => {
  const { userId } = req.params;
  const users = getUsers();
  const user = users.find(
    (use: any) => use.userId == userId
  );
  if (user) {
    res.json(user);
  } else {
    res.send("hooson");
  }
});

export default userRouter;

const getUsers = () => {
  const usersJson = fs.readFileSync("./user.json", "utf8");

  const users: User[] = JSON.parse(usersJson);

  return users;
};

const updateUsersJson = (users: User[]) => {
  const stringifyUsers = JSON.stringify(users);

  try {
    fs.writeFile("./user.json", stringifyUsers);
    return { success: true, data: users };
  } catch (error) {
    return { success: false, data: null };
  }
};
