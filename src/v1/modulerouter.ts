import express from "express";
import auth from "./auth/authrouter";
import kotoba from "./kotoba/kotobarouter";
import user from "./user/userrouter";
const moduleRouter = express.Router();
moduleRouter.use("/auth", auth);
moduleRouter.use("/kotoba", kotoba);
moduleRouter.use("/user", user);
export default moduleRouter;
