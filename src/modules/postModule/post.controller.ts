import { Router } from "express";
import { auth, validationMiddleware } from "../../middleware";
import { createPostSchema, deletePostSchema, updatePostSchema } from "./post.validation";
import { IPostServices } from "../../common";
import { PostServices } from "./post.services";

const postServices: IPostServices = new PostServices();
const router = Router();
const routes = {
  createPost: "/",
  allPosts: "/",
  updatePost: "/:id",
  deletePost: "/:id",
};

router.get(routes.allPosts, postServices.getAllPosts);

router.post(
  routes.createPost,
  auth(),
  validationMiddleware(createPostSchema),
  postServices.createPost,
);

router.put(
  routes.updatePost,
  auth(),
  validationMiddleware(updatePostSchema),
  postServices.updatePost,
);

router.delete(
  routes.deletePost,
  auth(),
  validationMiddleware(deletePostSchema),
  postServices.deletePost,
);

export default router;
