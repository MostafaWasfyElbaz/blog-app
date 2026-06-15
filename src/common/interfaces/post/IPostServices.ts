import { NextFunction, Request, Response } from "express";

export interface IPostServices {
  getAllPosts(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response>;
  createPost(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response>;
  updatePost(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response>;
  deletePost(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response>;
}
