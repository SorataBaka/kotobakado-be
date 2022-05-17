import express from "express";
import v1 from "./v1/modulerouter";
const versionrouter = express.Router();
versionrouter.use("/v1", v1);
export default versionrouter;
