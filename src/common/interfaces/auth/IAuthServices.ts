import { NextFunction, Request, Response } from "express";

export interface IAuthServices {
  register(req: Request, res: Response, next: NextFunction): Promise<Response>;
  login(req: Request, res: Response, next: NextFunction): Promise<Response>;
}
