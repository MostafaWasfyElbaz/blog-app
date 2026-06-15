import { Router } from "express";
import * as modules from "./modules";

const baseRouter = Router();
const routes = {
  auth: "/auth",
  posts: "/posts",
};

baseRouter.use(routes.auth, modules.authRouter);
baseRouter.use(routes.posts, modules.postRouter);

export default baseRouter;
