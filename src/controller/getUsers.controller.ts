import { User } from "../type/type";
import fs from "fs-extra";

const getUsers = () => {
  const usersJson = fs.readFileSync("./user.json", "utf8");

  const users: User[] = JSON.parse(usersJson);

  return users;
};
export default getUsers