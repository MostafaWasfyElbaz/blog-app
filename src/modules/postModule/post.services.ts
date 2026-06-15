import { IPostServices } from "../../common";
import { NextFunction, Request, Response } from "express";
import { CreatePostDTO, DeletePostDTO, UpdatePostDTO } from "./post.DTO";
import { postRepository } from "../../DB";
import { faildToCreatePost, faildToDeletePost, faildToUpdatePost, successHandler } from "../../utils";

export class PostServices implements IPostServices {
  constructor(private readonly postRepo = new postRepository()) {}

  createPost = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response> => {
    const { title, content }: CreatePostDTO = req.body;

    const post = await this.postRepo.createPost({
      title,
      content,
      author: res.locals.user.id,
    });
    if (!post) {
      throw new faildToCreatePost();
    }
    return successHandler({
      res,
      msg: "Post created successfully",
      status: 201,
    });
  };

  getAllPosts = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response> => {
    const posts = await this.postRepo.getAllPosts();
    return successHandler({
      res,
      msg: "Posts fetched successfully",
      status: 200,
      data: { posts },
    });
  };

  updatePost = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response> => {
    const { title, content }: UpdatePostDTO = req.body;
    const { id }: UpdatePostDTO = req.params as UpdatePostDTO;
    const data: { title?: string; content?: string } = {};
    if (!title && !content) {
      return successHandler({
        res,
        msg: "no updated found",
        status: 200,
      });
    }
    if (title) {
      data.title = title;
    }
    if (content) {
      data.content = content;
    }
    const post = await this.postRepo.updatePost(id, res.locals.user.id, data);

    if (!post) {
      throw new faildToUpdatePost();
    }

    return successHandler({
      res,
      msg: "Post updated successfully",
      status: 200,
      data: { post },
    });
  };

  deletePost = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response> => {
    const { id }: DeletePostDTO = req.params as DeletePostDTO;
    const post = await this.postRepo.deletePost(id, res.locals.user.id);
    if (!post) {
      throw new faildToDeletePost();
    }
    return successHandler({
      res,
      msg: "Post deleted successfully",
      status: 200,
    });
  };
}
