import express from "express";
import auth from "./auth/authrouter";
import kotoba from "./kotoba/kotobarouter";
const moduleRouter = express.Router();
moduleRouter.use("/auth", auth);
moduleRouter.use("/kotoba", kotoba);
export default moduleRouter;
