import { NextFunction, Request, Response } from "express";
import { IAuthServices } from "../../common";
import { loginDTO, registerDTO } from "./auth.DTO";
import {
  compareHash,
  createHash,
  failedToCreateUser,
  invalidCredentialsError,
  successHandler,
  generateToken,
} from "../../utils";
import { UserRepository } from "../../DB";

export class AuthServices implements IAuthServices {
  constructor(private userRepo = new UserRepository()) {}

  register = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response> => {
    const { name, email, password }: registerDTO = req.body;
    const user = await this.userRepo.createUser({
      user: {
        name,
        email,
        password: await createHash(password),
      },
    });
    if (!user) {
      throw new failedToCreateUser();
    }
    return successHandler({
      res,
      msg: "User created successfully",
      status: 201,
    });
  };

  login = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response> => {
    try {
      const { email, password }: loginDTO = req.body;
      const user = await this.userRepo.findUserByEmail(email);
      if (!user) {
        throw new invalidCredentialsError();
      }

      const isMatch = await compareHash(password, user.password);
      if (!isMatch) {
        throw new invalidCredentialsError();
      }

      const { accessToken, refreshToken } = generateToken({
        payload: { id: user._id },
      });
      return successHandler({
        res,
        msg: "logged in successfully",
        data: { accessToken, refreshToken },
        status: 200,
      });
    } catch (error) {
      throw error;
    }
  };
}
