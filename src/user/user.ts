import express, { Request, Response } from "express";
import getUserss from "../controller/getUserss.controller";
import createUser from "../controller/CreateUser.controller";
import deleteUser from "../controller/DeleteUser.controller";
import updateUser from "../controller/updateUser.controller";
import selectId from "../controller/selectUser.controller";

const userRouter = express.Router();


userRouter.get("/users", getUserss)

//create
userRouter.post("/createUser", createUser);

//delete
userRouter.delete("/deleteUser/:userId",deleteUser) 

//updateUser
userRouter.put("/updateUser/:userId", updateUser);

//Selectid
userRouter.get("/getUser/:userId",selectId);



export default userRouter;