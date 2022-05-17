import express from "express";
import auth from "./auth/authrouter";
const moduleRouter = express.Router();
moduleRouter.use("/auth", auth);

export default moduleRouter;
