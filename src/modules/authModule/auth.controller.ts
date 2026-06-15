import { Router } from "express";
import { IAuthServices } from "../../common";
import { AuthServices } from "./auth.services";
const router = Router();

const authServices: IAuthServices = new AuthServices();

const routes = {
  register: "/register",
  login: "/login",
};

router.post(routes.register, authServices.register);
router.post(routes.login, authServices.login);

export default router;
