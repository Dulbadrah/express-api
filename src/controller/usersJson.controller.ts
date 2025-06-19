import { User } from "../type/type";
import fs from "fs-extra";

const updateUsersJson = (users: User[]) => {
  const stringifyUsers = JSON.stringify(users);

  try {
    fs.writeFile("./user.json", stringifyUsers);
    return { success: true, data: users };
  } catch (error) {
    return { success: false, data: null };
  }
};
export default updateUsersJson