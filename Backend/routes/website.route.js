import express from "express";
import {
  changes,
  deploy,
  generateWebsite,
  getAll,
  getBySlug,
  getWebsiteById,
} from "../controllers/website.controller.js";
import isAuth from "../middlewares/isAuth.js";

const websiteRouter = express.Router();

websiteRouter.post("/generate", isAuth, generateWebsite);
websiteRouter.get("/getwebsite/:id", isAuth, getWebsiteById);
websiteRouter.post("/update/:id", isAuth, changes);
websiteRouter.get("/get-all", isAuth, getAll);
websiteRouter.get("/deploy/:id", isAuth, deploy);
websiteRouter.get("/getslug/:slug", isAuth, getBySlug);

export default websiteRouter;
