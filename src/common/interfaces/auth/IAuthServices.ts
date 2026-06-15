import { NextFunction, Request, Response } from "express";
import { HydratedDocument } from "mongoose";
import { IUser } from "../..";

export interface IAuthServices {
  register(req: Request, res: Response, next: NextFunction): Promise<Response>;
  login(req: Request, res: Response, next: NextFunction): Promise<Response>;
}
